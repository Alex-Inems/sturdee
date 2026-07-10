import type { SpotifyPlaylistTracksResponse } from "./types";

/** Discover Weekly — mirrors Spotify Web API playlist track architecture. */
export const DISCOVER_WEEKLY_PLAYLIST_ID = "37i9dQZEVXbMDoHDONVNfs";

export const DISCOVER_WEEKLY_TRACKS: SpotifyPlaylistTracksResponse = {
    href: `https://api.spotify.com/v1/playlists/${DISCOVER_WEEKLY_PLAYLIST_ID}/tracks`,
    limit: 10,
    total: 30,
    items: [
        {
            added_at: "2026-06-01T08:00:00Z",
            track: {
                id: "0VjIjW4GlUZAMYd2vXMi3b",
                name: "Blinding Lights",
                duration_ms: 200040,
                popularity: 89,
                artists: [{ id: "1Xyo4u8uXC1ZmMpatF05PJ", name: "The Weeknd" }],
                album: { id: "4yP0hdKOZMnxi8RVD8ei8j", name: "After Hours", release_date: "2020-03-20" },
            },
        },
        {
            added_at: "2026-06-01T08:00:00Z",
            track: {
                id: "3n3Ppam7vgaVa1iaRUc9Lp",
                name: "Mr. Brightside",
                duration_ms: 222973,
                popularity: 85,
                artists: [{ id: "7LvYbQ2wmz3j8mPrpiw1QY", name: "The Killers" }],
                album: { id: "6FBDLX7WOgMNtmgBYi2Q8s", name: "Hot Fuss", release_date: "2004-06-07" },
            },
        },
        {
            added_at: "2026-06-02T08:00:00Z",
            track: {
                id: "6habFhsOp2NvshLv26InqO",
                name: "Undo",
                duration_ms: 251293,
                popularity: 72,
                artists: [{ id: "6sFIWsDpZY0fL9WNzYXxXQ", name: "Björk" }],
                album: { id: "5W2fBKhoVLpF4oUX6u6KT6", name: "Vespertine", release_date: "2001-08-27" },
            },
        },
        {
            added_at: "2026-06-03T08:00:00Z",
            track: {
                id: "2takcwOaAZWiXQijPHIx7B",
                name: "Pieces",
                duration_ms: 176000,
                popularity: 68,
                artists: [{ id: "4LEiUm1SRbVfLtAIxmVrV0", name: "Vampire Weekend" }],
                album: { id: "5b9mN8pJzVlzKqrH1Yl42b", name: "Only God Was Above Us", release_date: "2024-04-05" },
            },
        },
        {
            added_at: "2026-06-04T08:00:00Z",
            track: {
                id: "7qiZfU4dY1lWllzX7mPBI",
                name: "Shape of You",
                duration_ms: 233712,
                popularity: 91,
                artists: [{ id: "6eUKZXaKkcviH0Ku9w2n3V", name: "Ed Sheeran" }],
                album: { id: "3T4tUhGY0RH5xXEplJLxf4", name: "÷ (Deluxe)", release_date: "2017-03-03" },
            },
        },
        {
            added_at: "2026-06-05T08:00:00Z",
            track: {
                id: "1mea3bSkSGXuirvogz6W4m",
                name: "BIRDS OF A FEATHER",
                duration_ms: 210373,
                popularity: 94,
                artists: [{ id: "6qqNVTkY8uBg9cP3Jde7k", name: "Billie Eilish" }],
                album: { id: "5aAwn04tBH4DPhm4jsGhnL", name: "HIT ME HARD AND SOFT", release_date: "2024-05-17" },
            },
        },
    ],
};

export function getPlaylistTracks(limit = 10): SpotifyPlaylistTracksResponse {
    return {
        ...DISCOVER_WEEKLY_TRACKS,
        limit,
        items: DISCOVER_WEEKLY_TRACKS.items.slice(0, limit),
    };
}

/** Inline playlist object for sync tutorials (no fetch). */
export const DISCOVER_WEEKLY_INLINE = {
    id: DISCOVER_WEEKLY_PLAYLIST_ID,
    name: "Discover Weekly",
    description: "Your weekly mixtape of fresh music. Updated every Monday.",
    owner: { display_name: "Spotify", id: "spotify" },
    tracks: DISCOVER_WEEKLY_TRACKS.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        duration_ms: item.track.duration_ms,
        album: item.track.album.name,
    })),
};
