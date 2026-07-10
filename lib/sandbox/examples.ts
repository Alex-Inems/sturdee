import { DISCOVER_WEEKLY_INLINE, DISCOVER_WEEKLY_PLAYLIST_ID } from "./spotify-data";

/** Real-world tutorial snippets — replace generic cars/fruits examples. */

export const SPOTIFY_ARRAYS_TRYIT = `// Fetch Discover Weekly from the Spotify Web API (sandbox)
const res = await fetch(
  "https://api.spotify.com/v1/playlists/${DISCOVER_WEEKLY_PLAYLIST_ID}/tracks?limit=6"
);
const { items } = await res.json();

// map — track titles for the playlist UI
const titles = items.map((item) => item.track.name);

// filter — songs longer than 3 minutes
const longTracks = items.filter((item) => item.track.duration_ms > 180000);

// reduce — total playlist duration in minutes
const totalMin = items.reduce((sum, item) => sum + item.track.duration_ms, 0) / 60000;

console.log("Titles:", titles.join(", "));
console.log("Long tracks:", longTracks.map((i) => i.track.name).join(", "));
console.log("Total:", totalMin.toFixed(1), "min");`;

export const SPOTIFY_ARRAYS_CODE = `const res = await fetch(
  "https://api.spotify.com/v1/playlists/${DISCOVER_WEEKLY_PLAYLIST_ID}/tracks?limit=5"
);
const { items } = await res.json();
const names = items.map((item) => item.track.name);
console.log(names);`;

export const SPOTIFY_LOOPS_TRYIT = `// Loop through playlist tracks like the Spotify desktop client
const res = await fetch(
  "https://api.spotify.com/v1/playlists/${DISCOVER_WEEKLY_PLAYLIST_ID}/tracks?limit=6"
);
const { items } = await res.json();

for (const item of items) {
  const { name, artists, duration_ms } = item.track;
  const min = Math.floor(duration_ms / 60000);
  const sec = Math.floor((duration_ms % 60000) / 1000);
  console.log(\`\${name} — \${artists[0].name} (\${min}:\${String(sec).padStart(2, "0")})\`);
}`;

export const SPOTIFY_LOOPS_CODE = `for (const item of items) {
  const { name, artists, duration_ms } = item.track;
  console.log(\`\${name} — \${artists[0].name} (\${duration_ms}ms)\`);
}`;

export const WEATHER_ASYNC_TRYIT = `// OpenWeatherMap API — async/await with real response shape
async function fetchWeather(city) {
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&units=metric&appid=demo\`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
  return res.json();
}

// Run twice — the sandbox occasionally returns 503 like a real API
for (const city of ["London", "Tokyo", "London"]) {
  try {
    const data = await fetchWeather(city);
    console.log(\`\${data.name}: \${data.main.temp}°C, \${data.weather[0].description}\`);
  } catch (err) {
    console.error(\`Failed for \${city}:\`, err.message);
  }
}`;

export const WEATHER_FETCH_TRYIT = `async function getWeather(city) {
  const res = await fetch(
    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&units=metric&appid=demo\`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}

const london = await getWeather("London");
console.log(london.name, london.main.temp + "°C", london.weather[0].main);`;

export const WEATHER_ERRORS_TRYIT = `async function loadWeatherWithRetry(city, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&units=metric&appid=demo\`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      return data;
    } catch (err) {
      console.error(\`Attempt \${attempt} failed:\`, err.message);
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, attempt * 300));
    }
  }
}

try {
  const w = await loadWeatherWithRetry("London");
  console.log("Success:", w.name, w.main.temp + "°C");
} catch {
  console.error("All retries exhausted — show cached data in production");
}`;

export const SANDBOX_LABELS = {
    spotify: "Spotify Web API (sandbox)",
    weather: "OpenWeatherMap API (sandbox)",
} as const;
