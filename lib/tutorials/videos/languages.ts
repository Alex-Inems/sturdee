import { broCodeCourse } from "./helpers";

/** Bro Code full-course crash courses — chapter start times per language */
export const LANGUAGE_VIDEOS: Record<string, import("../types").TutorialVideo> = {
    ...broCodeCourse("typescript", "BwuLxPH8ID0"),
    ...broCodeCourse("sql", "HXV3zeQKqGY", {
        intro: 0,
        syntax: 60,
        variables: 0,
        datatypes: 400,
        operators: 800,
        conditions: 1200,
        loops: 1600,
        functions: 2200,
    }),
    ...broCodeCourse("java", "xk4_1vDrzzo"),
    ...broCodeCourse("cpp", "-bo5UURH0qY"),
    ...broCodeCourse("c", "KJgsSYFKq8k", { classes: 0 }),
    ...broCodeCourse("csharp", "wxznTy86RfI"),
    ...broCodeCourse("php", "Dlas4n-oVgY"),
    ...broCodeCourse("ruby", "t_ispmWmdjY"),
    ...broCodeCourse("go", "C8Lgvu2pWw4"),
    ...broCodeCourse("rust", "zF34dLnu_5k"),
    ...broCodeCourse("swift", "COMPSNY6oQo"),
    ...broCodeCourse("kotlin", "EExlCLRrjPE"),
    ...broCodeCourse("r", "_bfVHuaAkkQ", { classes: 0 }),
    ...broCodeCourse("bash", "tK9Oc6WEnkY", { classes: 0 }),
    ...broCodeCourse("nodejs", "fBNz5C1xiX0", { classes: 0 }),
};
