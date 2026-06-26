import { v } from "./helpers";

/** W3Schools — Learn HTML for Beginners (chapters match lesson topics) */
const W3S_HTML = "BzYMFd-lQL4";

export const HTML_VIDEOS: Record<string, ReturnType<typeof v>> = {
    "html/html_intro": v(W3S_HTML, 0, "W3Schools"),
    "html/html_syntax": v(W3S_HTML, 166, "W3Schools"),
    "html/html_elements": v(W3S_HTML, 278, "W3Schools"),
    "html/html_attributes": v(W3S_HTML, 413, "W3Schools"),
    "html/html_headings": v(W3S_HTML, 547, "W3Schools"),
    "html/html_paragraphs": v(W3S_HTML, 646, "W3Schools"),
    "html/html_links": v(W3S_HTML, 1292, "W3Schools"),
    "html/html_images": v(W3S_HTML, 1499, "W3Schools"),
    "html/html_tables": v(W3S_HTML, 1720, "W3Schools"),
    "html/html_forms": v(W3S_HTML, 2589, "W3Schools"),
    "html/html_ref_tags": v(W3S_HTML, 1889, "W3Schools"),
};
