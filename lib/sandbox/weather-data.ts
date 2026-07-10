import type { OpenWeatherError, OpenWeatherResponse } from "./types";

const WEATHER_BY_CITY: Record<string, OpenWeatherResponse> = {
    london: {
        coord: { lon: -0.13, lat: 51.51 },
        weather: [{ id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" }],
        base: "stations",
        main: { temp: 14.2, feels_like: 13.1, humidity: 72, pressure: 1018 },
        visibility: 10000,
        wind: { speed: 4.12, deg: 240 },
        clouds: { all: 90 },
        name: "London",
        cod: 200,
    },
    "new york": {
        coord: { lon: -74.01, lat: 40.71 },
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
        base: "stations",
        main: { temp: 22.8, feels_like: 22.3, humidity: 55, pressure: 1015 },
        visibility: 10000,
        wind: { speed: 3.6, deg: 180 },
        clouds: { all: 5 },
        name: "New York",
        cod: 200,
    },
    tokyo: {
        coord: { lon: 139.69, lat: 35.69 },
        weather: [{ id: 502, main: "Rain", description: "heavy intensity rain", icon: "10n" }],
        base: "stations",
        main: { temp: 18.5, feels_like: 19.2, humidity: 88, pressure: 1008 },
        visibility: 6000,
        wind: { speed: 6.1, deg: 150 },
        clouds: { all: 100 },
        name: "Tokyo",
        cod: 200,
    },
    austin: {
        coord: { lon: -97.74, lat: 30.27 },
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
        base: "stations",
        main: { temp: 31.4, feels_like: 33.8, humidity: 42, pressure: 1012 },
        visibility: 10000,
        wind: { speed: 2.1, deg: 140 },
        clouds: { all: 0 },
        name: "Austin",
        cod: 200,
    },
};

let weatherRequestCount = 0;

export function resetWeatherFailureCounter() {
    weatherRequestCount = 0;
}

function normalizeCity(query: string): string {
    return decodeURIComponent(query).trim().toLowerCase();
}

/** ~35% failure rate after first request — simulates real API instability. */
function shouldSimulateFailure(city: string): boolean {
    weatherRequestCount += 1;
    if (city === "failville") return true;
    if (weatherRequestCount === 1) return false;
    return weatherRequestCount % 3 === 0;
}

export function resolveWeatherRequest(url: string): {
    ok: boolean;
    status: number;
    statusText: string;
    body: OpenWeatherResponse | OpenWeatherError;
    delayMs?: number;
} {
    const parsed = new URL(url, "https://api.openweathermap.org");
    const city = normalizeCity(parsed.searchParams.get("q") ?? "london");

    if (shouldSimulateFailure(city)) {
        return {
            ok: false,
            status: 503,
            statusText: "Service Unavailable",
            body: { cod: 503, message: "Weather upstream timeout — retry with exponential backoff" },
            delayMs: 800,
        };
    }

    const data = WEATHER_BY_CITY[city];
    if (!data) {
        return {
            ok: false,
            status: 404,
            statusText: "Not Found",
            body: { cod: "404", message: `city not found: ${city}` },
        };
    }

    return {
        ok: true,
        status: 200,
        statusText: "OK",
        body: data,
        delayMs: 120 + Math.floor(Math.random() * 200),
    };
}
