export type SandboxId = "spotify" | "weather";

export interface NetworkTrace {
    id: string;
    url: string;
    method: string;
    status: number;
    statusText: string;
    durationMs: number;
    requestBody?: string;
    responseBody: unknown;
    error?: string;
}

export interface SandboxRunResult {
    logs: string[];
    errors: string[];
    traces: NetworkTrace[];
}

/** Spotify Web API — playlist tracks response shape (simplified). */
export interface SpotifyPlaylistTracksResponse {
    href: string;
    items: Array<{
        added_at: string;
        track: {
            id: string;
            name: string;
            duration_ms: number;
            popularity: number;
            artists: Array<{ id: string; name: string }>;
            album: { id: string; name: string; release_date: string };
        };
    }>;
    limit: number;
    total: number;
}

/** OpenWeatherMap current weather response shape (simplified). */
export interface OpenWeatherResponse {
    coord: { lon: number; lat: number };
    weather: Array<{ id: number; main: string; description: string; icon: string }>;
    base: string;
    main: { temp: number; feels_like: number; humidity: number; pressure: number };
    visibility: number;
    wind: { speed: number; deg: number };
    clouds: { all: number };
    name: string;
    cod: number;
}

export interface OpenWeatherError {
    cod: string | number;
    message: string;
}
