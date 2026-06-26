import { v, topicVideos } from "./helpers";

/** Bro Code — dedicated short topic videos + full course timestamps */
const BRO_PYTHON = "ix9cRaBkVe0";

export const PYTHON_VIDEOS: Record<string, ReturnType<typeof v>> = {
    ...topicVideos("python", {
        intro: v("Sg4GMVMdOPo", 0, "Bro Code"),
        syntax: v(BRO_PYTHON, 90, "Bro Code"),
        variables: v("7IoQ5BGkTJo", 0, "Bro Code"),
        datatypes: v(BRO_PYTHON, 700, "Bro Code"),
        operators: v(BRO_PYTHON, 1100, "Bro Code"),
        conditions: v(BRO_PYTHON, 1500, "Bro Code"),
        loops: v("KWgYha0clzw", 0, "Bro Code"),
        functions: v(BRO_PYTHON, 2800, "Bro Code"),
        classes: v("bytvWg4fPB0", 0, "Bro Code"),
    }),
    "python/python_while": v("rRTjPnVooxE", 0, "Bro Code"),
    "python/python_modules": v(BRO_PYTHON, 3200, "Bro Code"),
    "python/python_exceptions": v(BRO_PYTHON, 3400, "Bro Code"),
    "python/python_files": v(BRO_PYTHON, 3600, "Bro Code"),
};
