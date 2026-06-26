import { v } from "./helpers";

/** Dave Gray — CSS Full Course (11 hours, chapter timestamps) */
const DAVE_CSS = "n4R2E7O-Ngo";

export const CSS_VIDEOS: Record<string, ReturnType<typeof v>> = {
    "css/css_intro": v(DAVE_CSS, 41, "Dave Gray"),
    "css/css_syntax": v(DAVE_CSS, 41, "Dave Gray"),
    "css/css_selectors": v(DAVE_CSS, 863, "Dave Gray"),
    "css/css_colors": v(DAVE_CSS, 2054, "Dave Gray"),
    "css/css_boxmodel": v(DAVE_CSS, 4289, "Dave Gray"),
    "css/css_flexbox": v(DAVE_CSS, 14246, "Dave Gray"),
    "css/css_grid": v(DAVE_CSS, 15672, "Dave Gray"),
    "css/css_responsive": v(DAVE_CSS, 19952, "Dave Gray"),
};
