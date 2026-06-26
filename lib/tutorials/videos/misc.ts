import { v, topicVideos } from "./helpers";

export const MISC_VIDEOS: Record<string, ReturnType<typeof v>> = {
    ...topicVideos("json", {
        intro: v("wN0x9eZLix4", 0, "Programming with Mosh"),
        syntax: v("wN0x9eZLix4", 120, "Programming with Mosh"),
        objects: v("wN0x9eZLix4", 300, "Programming with Mosh"),
        arrays: v("wN0x9eZLix4", 480, "Programming with Mosh"),
    }),
    "json/json_parse": v("wN0x9eZLix4", 600, "Programming with Mosh"),
    ...topicVideos("xml", {
        intro: v("T_docs26obuk", 0, "freeCodeCamp.org"),
        syntax: v("T_docs26obuk", 180, "freeCodeCamp.org"),
        elements: v("T_docs26obuk", 600, "freeCodeCamp.org"),
        attributes: v("T_docs26obuk", 900, "freeCodeCamp.org"),
    }),
};
