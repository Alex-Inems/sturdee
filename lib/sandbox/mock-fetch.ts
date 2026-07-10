import { getPlaylistTracks } from "./spotify-data";
import { resetWeatherFailureCounter, resolveWeatherRequest } from "./weather-data";
import type { NetworkTrace, SandboxId, SandboxRunResult } from "./types";

let traceCounter = 0;

function mockResponse(body: unknown, status: number, statusText: string): Response {
    const ok = status >= 200 && status < 300;
    return {
        ok,
        status,
        statusText,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => body,
        text: async () => JSON.stringify(body),
        clone: () => mockResponse(body, status, statusText),
    } as Response;
}

function isSpotifyPlaylistUrl(url: string): boolean {
    return /api\.spotify\.com\/v1\/playlists\/[^/]+\/tracks/i.test(url) || url.includes("/sandbox/spotify/");
}

function isWeatherUrl(url: string): boolean {
    return /api\.openweathermap\.org\/data\/2\.5\/weather/i.test(url) || url.includes("/sandbox/weather/");
}

async function handleSpotify(url: string, method: string): Promise<{ response: Response; trace: Omit<NetworkTrace, "id"> }> {
    const start = performance.now();
    const parsed = new URL(url, "https://api.spotify.com");
    const limit = Number(parsed.searchParams.get("limit") ?? 10);
    const body = getPlaylistTracks(limit);
    const durationMs = Math.round(performance.now() - start) + 95;

    return {
        response: mockResponse(body, 200, "OK"),
        trace: {
            url,
            method,
            status: 200,
            statusText: "OK",
            durationMs,
            responseBody: body,
        },
    };
}

async function handleWeather(url: string, method: string): Promise<{ response: Response; trace: Omit<NetworkTrace, "id"> }> {
    const start = performance.now();
    const result = resolveWeatherRequest(url);

    if (result.delayMs) {
        await new Promise((r) => setTimeout(r, result.delayMs));
    }

    const durationMs = Math.round(performance.now() - start);

    return {
        response: mockResponse(result.body, result.status, result.statusText),
        trace: {
            url,
            method,
            status: result.status,
            statusText: result.statusText,
            durationMs,
            responseBody: result.body,
            ...(result.ok ? {} : { error: (result.body as { message?: string }).message }),
        },
    };
}

export function createSandboxFetch(
    sandbox: SandboxId,
    traces: NetworkTrace[]
): typeof fetch {
    return async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        const method = (init?.method ?? "GET").toUpperCase();

        if (sandbox === "spotify" && isSpotifyPlaylistUrl(url)) {
            const { response, trace } = await handleSpotify(url, method);
            traces.push({ ...trace, id: `trace-${++traceCounter}` });
            return response;
        }

        if (sandbox === "weather" && isWeatherUrl(url)) {
            const { response, trace } = await handleWeather(url, method);
            traces.push({ ...trace, id: `trace-${++traceCounter}` });
            return response;
        }

        const err = `Sandbox fetch blocked: ${url} — use the documented ${sandbox === "spotify" ? "Spotify Web API" : "OpenWeatherMap"} endpoint.`;
        traces.push({
            id: `trace-${++traceCounter}`,
            url,
            method,
            status: 0,
            statusText: "Blocked",
            durationMs: 0,
            responseBody: null,
            error: err,
        });
        throw new Error(err);
    };
}

export async function runSandboxCode(code: string, sandbox: SandboxId): Promise<SandboxRunResult> {
    resetWeatherFailureCounter();
    traceCounter = 0;
    const traces: NetworkTrace[] = [];
    const logs: string[] = [];
    const errors: string[] = [];
    const sandboxFetch = createSandboxFetch(sandbox, traces);

    const console = {
        log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
        error: (...args: unknown[]) => errors.push(args.map(String).join(" ")),
        warn: (...args: unknown[]) => logs.push("[warn] " + args.map(String).join(" ")),
    };

    try {
        const runner = new Function(
            "fetch",
            "console",
            `return (async () => {\n${code}\n})();`
        ) as (fetchFn: typeof fetch, con: typeof console) => Promise<void>;
        await runner(sandboxFetch, console);
    } catch (e) {
        errors.push(e instanceof Error ? e.message : String(e));
    }

    return { logs, errors, traces };
}
