import { section, h2, h3, list, page, code, tryit, p, note, tip, steps } from "../builder";

const ext = "liquid";

export const liquidFiltersSection = section("Liquid Filters", [
    page("liquid_filters_intro", "Filters Introduction", [
        h2("What Are Liquid Filters?"),
        p("Filters transform output values using the pipe | operator. They chain left to right — each filter receives the output of the previous one. Filters are the primary way to format money, resize images, escape HTML, and manipulate strings in Shopify themes."),
        code(ext, `{{ product.title | upcase }}\n{{ product.description | strip_html | truncate: 120 }}\n{{ product.price | money_with_currency }}`, "Chained filters on one line"),
        steps([
            "product.title | upcase — converts title to uppercase for display badges",
            "strip_html removes <p> tags from rich text descriptions",
            "truncate: 120 cuts text to 120 characters with …",
            "money_with_currency adds the ISO currency code (USD, EUR)",
        ]),
        p("Filter arguments follow a colon: truncate: 120, image_url: width: 400. Multiple arguments use commas. Some filters (money, image_url) are Shopify-specific; others (upcase, split) come from core Liquid."),
        tryit("html", `<p>FULL-STACK WEB DEVELOPMENT</p><p>$1,899.00 USD</p>`),
        tip("Read filters right-to-left mentally: the leftmost value enters the pipeline first."),
    ]),
    page("liquid_filters_string", "String Filters", [
        h2("Formatting and Cleaning Text"),
        p("String filters prepare merchant-entered content for safe, consistent display. Product descriptions, blog excerpts, and SEO meta text all rely on string filters."),
        list([
            "upcase / downcase / capitalize — change letter casing",
            "strip / lstrip / rstrip — remove whitespace from both ends or one side",
            "split: 'delimiter' — break a string into an array",
            "join: ', ' — combine array items into a string",
            "replace: 'old', 'new' — substitute text (first occurrence per call)",
            "remove: 'text' — delete all occurrences of a substring",
            "truncate: N / truncatewords: N — shorten long text",
            "escape — convert < > & to HTML entities (critical in attributes)",
            "strip_html — remove all HTML tags from rich text",
        ]),
        code(ext, `{{ '  hello world  ' | strip | capitalize }}\n{# Output: Hello world #}\n\n{{ product.tags | join: ' · ' }}\n{# Output: web · programming · sale #}\n\n{{ article.title | truncate: 50 }}\n{# Output: Long article title that gets cut… #}`, "Common string transformations"),
        p("Always use | escape when inserting user or merchant content into HTML attributes: alt=\"{{ product.title | escape }}\". Without escape, a title containing a quote character breaks the attribute and can cause XSS."),
        note("strip_html is destructive — it removes formatting. Use truncatewords on plain text excerpts, not full product descriptions meant to render HTML."),
    ]),
    page("liquid_filters_money", "Money & Number Filters", [
        h2("Displaying Prices Correctly"),
        p("Shopify stores all monetary values as integers in the smallest currency unit. $18.99 is stored as 1899. Never divide manually — money filters handle currency symbols, decimal separators, and multi-currency display."),
        code(ext, `{{ product.price | money }}\n{# $18.99 in a US store #}\n\n{{ cart.total_price | money_with_currency }}\n{# $42.00 USD #}\n\n{% assign savings = product.compare_at_price | minus: product.price %}\n{{ savings | money }} off`, "Sale savings calculation"),
        h3("Math Filters"),
        p("Perform arithmetic in Liquid when building sale badges, progress bars, or installment messaging."),
        code(ext, `{{ 10 | plus: 5 }}\n{{ 20 | minus: 3 }}\n{{ 4 | times: 2 }}\n{{ 10 | divided_by: 2 }}\n{{ 17 | modulo: 5 }}`, "Arithmetic filters"),
        note("divided_by performs integer division. For percentage discounts, use times with decimals: price | times: 0.8 for 20% off."),
    ]),
    page("liquid_filters_image", "Image Filters", [
        h2("Shopify CDN Image Transforms"),
        p("Never output raw product.image URLs at full resolution. Shopify's CDN serves images from cdn.shopify.com with on-the-fly resizing. image_url generates optimized URLs; image_tag builds a complete <img> element."),
        code(ext, `{{ product.featured_image | image_url: width: 800 }}\n\n{{ product.featured_image | image_url: width: 400, height: 400, crop: 'center' | image_tag:\n  loading: 'lazy',\n  alt: product.title,\n  widths: '200, 400, 600',\n  sizes: '(max-width: 768px) 50vw, 25vw'\n}}`, "Responsive image with srcset"),
        steps([
            "width: 800 — requests an 800px-wide version from the CDN",
            "crop: 'center' — square crop from the image center",
            "loading: 'lazy' — defers off-screen image loading (Core Web Vitals)",
            "widths + sizes — generates srcset for responsive delivery",
        ]),
        list([
            "crop options: center, top, bottom, left, right",
            "format: pjpg, webp — control output format",
            "Always set width AND height attributes to prevent layout shift (CLS)",
        ]),
        tip("Use image_url: width: 1 for LQIP blur placeholders, then swap to full width on load in JavaScript."),
    ]),
    page("liquid_filters_array", "Array Filters", [
        h2("Working with Lists"),
        p("Collections, cart items, product images, and linklists are arrays. Array filters let you count, sort, filter, and transform them without JavaScript."),
        code(ext, `{{ collection.products | size }}\n{{ collection.products | first | map: 'title' }}\n{{ collection.products | where: 'available', true | size }}\n{{ collection.products | sort: 'price' | reverse | first | map: 'title' }}`, "Filter and sort products"),
        list([
            "size — count items",
            "first / last — get boundary elements",
            "where: 'property', value — filter objects by property",
            "sort: 'property' — alphabetical or numeric sort",
            "map: 'property' — extract one property from each item into an array",
            "uniq — remove duplicates",
            "join: ', ' — combine into a string",
        ]),
        note("where only supports exact equality. For tag filtering, loop with {% if product.tags contains 'tag' %} instead."),
    ]),
    page("liquid_filters_json", "JSON & Default Filters", [
        h2("default — Fallback Values"),
        p("The default filter returns a fallback when the left value is nil, false, or empty. Essential for metafields and optional section settings."),
        code(ext, `{{ product.metafields.custom.subtitle | default: product.title }}\n{{ section.settings.heading | default: 'Welcome to our store' }}`, "Fallbacks for optional content"),
        h2("json — Passing Data to JavaScript"),
        p("The json filter serializes Liquid objects into valid JSON for embedding in <script> tags. Shopify ensures proper escaping."),
        code(ext, `<script type="application/json" id="ProductJson-{{ product.id }}">\n  {{ product | json }}\n</script>`, "Embed full product object for JS"),
        steps([
            "JavaScript reads the JSON: JSON.parse(document.getElementById('ProductJson-...').textContent)",
            "Use variant data to update price and image on option change",
            "Never use client-side prices for checkout — always server-authoritative",
        ]),
        note("Large | json payloads increase HTML size. Pass only the properties your JavaScript needs: variants, options, media."),
    ]),
]);
