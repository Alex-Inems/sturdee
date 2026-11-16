import { v, topicVideos } from "./helpers";

/** Programming with Mosh — JavaScript tutorial */
const MOSH_JS = "W6NZfCO5SIk";

export const JAVASCRIPT_VIDEOS: Record<string, ReturnType<typeof v>> = {
    ...topicVideos("javascript", {
        intro: v(MOSH_JS, 0, "Programming with Mosh"),
        syntax: v(MOSH_JS, 120, "Programming with Mosh"),
        variables: v(MOSH_JS, 480, "Programming with Mosh"),
        datatypes: v(MOSH_JS, 900, "Programming with Mosh"),
        operators: v(MOSH_JS, 1200, "Programming with Mosh"),
        conditions: v(MOSH_JS, 1500, "Programming with Mosh"),
        loops: v(MOSH_JS, 1800, "Programming with Mosh"),
        functions: v(MOSH_JS, 2400, "Programming with Mosh"),
        classes: v(MOSH_JS, 3000, "Programming with Mosh"),
    }),
    "javascript/javascript_arrays": v(MOSH_JS, 2100, "Programming with Mosh"),
    "javascript/javascript_async": v("PoRJizFvM7o", 0, "Traversy Media"),
    "javascript/javascript_dom": v("0ik6f4TqGOE", 0, "Traversy Media"),
    "javascript/javascript_objects": v("W6NZfCO5SIk", 2700, "Programming with Mosh"),
    "javascript/javascript_events": v("0ik6f4TqGOE", 600, "Traversy Media"),
    "javascript/javascript_fetch": v("PoRJizFvM7o", 180, "Traversy Media"),
    "javascript/javascript_interview": v("jS4aFq5-91M", 0, "freeCodeCamp.org"),
};
