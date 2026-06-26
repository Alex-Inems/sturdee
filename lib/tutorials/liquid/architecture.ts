import { section, h2, h3, list, page, code, tryit, p, note, tip, steps } from "../builder";

const ext = "liquid";

export const liquidArchitectureSection = section("Theme Architecture", [
    page("shopify_theme_structure", "Theme Folder Structure", [
        h2("Online Store 2.0 Theme Anatomy"),
        p("A Shopify theme is a version-controlled folder of Liquid, JSON, CSS, and JavaScript files. Shopify reads this folder structure to know which files handle which page types, which settings merchants can edit, and which assets to serve from the CDN."),
        code("bash", `my-theme/\n├── assets/              # Static files: CSS, JS, images, fonts\n│   ├── theme.css\n│   ├── theme.js\n│   └── logo.svg\n├── config/\n│   ├── settings_schema.json   # Theme setting definitions\n│   └── settings_data.json     # Merchant's saved values\n├── layout/\n│   └── theme.liquid           # HTML shell wrapping every page\n├── locales/\n│   ├── en.default.json        # Translation strings\n│   └── en.default.schema.json # Translated schema labels\n├── sections/                  # Modular, editor-customizable blocks\n│   ├── header.liquid\n│   ├── footer.liquid\n│   └── featured-collection.liquid\n├── snippets/                  # Reusable partial templates\n│   └── product-card.liquid\n└── templates/                 # Page-level composition\n    ├── index.json             # Homepage\n    ├── product.json           # Product pages\n    ├── collection.json        # Collection pages\n    ├── page.json              # Static pages\n    └── cart.json              # Cart page`),
        steps([
            "layout/theme.liquid — single HTML document wrapper; required on every theme",
            "templates/*.json — define which sections appear on each page type",
            "sections/*.liquid — self-contained UI modules with {% schema %} for the editor",
            "snippets/ — shared partials included via {% render %}",
            "config/ — global theme settings merchants change in Admin → Online Store → Themes → Customize",
            "assets/ — served from cdn.shopify.com with cache busting via ?v= hash",
        ]),
        list([
            "JSON templates (OS 2.0) let merchants add/remove/reorder sections without code",
            "Legacy .liquid templates still work but lack section flexibility",
            "blocks/ folder appears in app extensions, not standard themes",
        ]),
        tip("Run shopify theme init to scaffold this structure, or clone Dawn from GitHub as a production-ready starting point."),
    ]),
    page("shopify_theme_liquid", "theme.liquid Layout", [
        h2("The Root HTML Document"),
        p("layout/theme.liquid is the outermost template. Every page renders inside it. {{ content_for_layout }} is where template sections appear; {{ content_for_header }} is mandatory — Shopify injects app scripts, analytics, and dynamic checkout buttons there."),
        code(ext, `<!doctype html>\n<html class="no-js" lang="{{ request.locale.iso_code }}">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <meta name="theme-color" content="{{ settings.color_primary }}">\n\n  <title>\n    {{ page_title }}\n    {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}\n    {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}\n    {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}\n  </title>\n\n  {% if page_description %}\n    <meta name="description" content="{{ page_description | escape }}">\n  {% endif %}\n\n  <link rel="canonical" href="{{ canonical_url }}">\n\n  {{ content_for_header }}\n\n  {{ 'theme.css' | asset_url | stylesheet_tag }}\n  {{ 'theme.js' | asset_url | script_tag: defer: true }}\n\n  <script>document.documentElement.className = document.documentElement.className.replace('no-js', 'js');</script>\n</head>\n<body class="template-{{ template.name }}{% if template.suffix %} template-{{ template.name }}-{{ template.suffix }}{% endif %}">\n  <a class="skip-link" href="#MainContent">Skip to content</a>\n\n  {% sections 'header-group' %}\n\n  <main id="MainContent" role="main" tabindex="-1">\n    {{ content_for_layout }}\n  </main>\n\n  {% sections 'footer-group' %}\n</body>\n</html>`, "Production-ready theme.liquid skeleton"),
        list([
            "request.locale.iso_code — BCP 47 language for <html lang>",
            "template.name — body class hook (product, collection, index)",
            "canonical_url — SEO canonical link Shopify computes per page",
            "page_title / page_description — set in templates or sections",
            "{% sections 'header-group' %} — section groups from settings_data.json",
        ]),
        note("Never remove {{ content_for_header }}. Apps and Shopify features (Shop Pay, analytics) depend on it. Theme Check fails themes without it."),
    ]),
    page("shopify_json_templates", "JSON Templates", [
        h2("Composing Pages from Sections"),
        p("JSON templates replaced monolithic product.liquid files. Each template file maps section instance IDs to section types and settings. Merchants customize section order and settings in the theme editor without touching code."),
        code("json", `{\n  "sections": {\n    "main": {\n      "type": "main-product",\n      "settings": {\n        "enable_sticky_info": true,\n        "gallery_layout": "thumbnail"\n      }\n    },\n    "related": {\n      "type": "related-products",\n      "settings": {\n        "heading": "You may also like",\n        "products_to_show": 4\n      }\n    },\n    "newsletter": {\n      "type": "newsletter",\n      "settings": {\n        "heading": "Get course updates"\n      }\n    }\n  },\n  "order": ["main", "related", "newsletter"]\n}`),
        steps([
            "sections object — keys are unique instance IDs (any string you choose)",
            "type — must match a filename in sections/ (without .liquid)",
            "settings — default values; merchants override in the editor",
            "order array — controls vertical section sequence on the page",
            "Alternate templates: product.alternate.json → suffix 'alternate' in Admin",
        ]),
        p("To create a landing page template, add templates/page.landing.json and assign it to a page in Admin → Pages → Theme template. Each alternate template can have a completely different section stack."),
        tip("Section files must include a presets array in schema to appear in the 'Add section' picker."),
    ]),
    page("shopify_sections", "Sections & Schema", [
        h2("Building Merchant-Editable Sections"),
        p("Every section file ends with a {% schema %} JSON block. Schema defines settings (text, images, collection pickers), blocks (repeatable sub-components), presets (add-to-page defaults), and constraints (max blocks, enabled_on templates)."),
        code(ext, `{%- comment -%} sections/featured-collection.liquid {%- endcomment -%}\n\n{%- liquid\n  assign collection = section.settings.collection\n  assign limit = section.settings.products_to_show\n-%}\n\n<section class="featured-collection color-{{ section.settings.color_scheme }}">\n  {% if section.settings.heading != blank %}\n    <h2>{{ section.settings.heading }}</h2>\n  {% endif %}\n\n  {% if collection != blank %}\n    <div class="grid grid--{{ section.settings.columns }}">\n      {% for product in collection.products limit: limit %}\n        {% render 'product-card', product: product %}\n      {% endfor %}\n    </div>\n    <a href="{{ collection.url }}" class="btn">View all</a>\n  {% else %}\n    <p>Select a collection in the theme editor.</p>\n  {% endif %}\n</section>\n\n{% schema %}\n{\n  "name": "Featured collection",\n  "tag": "section",\n  "class": "section-featured-collection",\n  "settings": [\n    { "type": "text", "id": "heading", "label": "Heading", "default": "Featured courses" },\n    { "type": "collection", "id": "collection", "label": "Collection" },\n    { "type": "range", "id": "products_to_show", "min": 2, "max": 12, "step": 1, "default": 4, "label": "Products to show" },\n    { "type": "select", "id": "columns", "label": "Columns", "options": [\n      { "value": "2", "label": "2" },\n      { "value": "3", "label": "3" },\n      { "value": "4", "label": "4" }\n    ], "default": "4" },\n    { "type": "color_scheme", "id": "color_scheme", "label": "Color scheme", "default": "scheme-1" }\n  ],\n  "presets": [{ "name": "Featured collection" }]\n}\n{% endschema %}`, "Featured collection section with schema"),
        h3("Blocks Inside Sections"),
        p("Blocks let merchants add repeatable content units (slides, testimonials, feature rows) within one section. Loop section.blocks and use block.shopify_attributes for editor drag-and-drop."),
        code(ext, `{% for block in section.blocks %}\n  <div class="slide" {{ block.shopify_attributes }}>\n    {% case block.type %}\n      {% when 'heading' %}\n        <h3>{{ block.settings.text }}</h3>\n      {% when 'text' %}\n        <div class="rte">{{ block.settings.body }}</div>\n      {% when 'button' %}\n        <a href="{{ block.settings.link }}" class="btn">{{ block.settings.label }}</a>\n    {% endcase %}\n  </div>\n{% endfor %}`, "Block type switching"),
        note("Use section.settings for section-level config and block.settings for per-block config. Access via section.id for unique HTML IDs in JavaScript."),
    ]),
    page("shopify_snippets", "Snippets", [
        h2("DRY Templates with Snippets"),
        p("Snippets eliminate copy-paste across sections. A product card appearing on the homepage, collection page, and search results should be one snippets/product-card.liquid file rendered with different parameters."),
        code(ext, `{%- comment -%} snippets/product-card.liquid {%- endcomment -%}\n{%- liquid\n  assign image_width = image_width | default: 500\n  assign show_vendor = show_vendor | default: false\n-%}\n\n<article class="product-card">\n  <a href="{{ product.url }}" class="product-card__link">\n    {% if product.featured_image %}\n      {{ product.featured_image\n        | image_url: width: image_width\n        | image_tag: loading: 'lazy', alt: product.title, widths: '250, 500, 750'\n      }}\n    {% else %}\n      {{ 'product-placeholder.svg' | asset_url | image_tag: alt: '', class: 'placeholder' }}\n    {% endif %}\n\n    <h3 class="product-card__title">{{ product.title }}</h3>\n\n    <div class="product-card__price">\n      {% if product.compare_at_price > product.price %}\n        <s>{{ product.compare_at_price | money }}</s>\n      {% endif %}\n      <span>{{ product.price | money }}</span>\n    </div>\n\n    {% if show_vendor and product.vendor != blank %}\n      <span class="product-card__vendor">{{ product.vendor }}</span>\n    {% endif %}\n  </a>\n</article>`, "Reusable product card snippet"),
        steps([
            "Render with: {% render 'product-card', product: product, show_vendor: true %}",
            "Default parameters with | default: inside the snippet",
            "Placeholder image when product.featured_image is nil",
            "Keep snippets focused — one responsibility per file",
        ]),
        tip("Theme Check reports unused snippets. Delete dead snippets to keep themes maintainable."),
    ]),
    page("shopify_settings", "Theme Settings", [
        h2("Global Design Tokens"),
        p("config/settings_schema.json defines theme-wide settings: brand colors, typography, button styles, social links. Merchants edit these in the theme editor sidebar under 'Theme settings'. Values persist in settings_data.json."),
        code("json", `[\n  {\n    "name": "theme_info",\n    "theme_name": "Sturdee Theme",\n    "theme_version": "1.0.0",\n    "theme_author": "Sturdee",\n    "theme_documentation_url": "https://sturdee.online/docs",\n    "theme_support_url": "https://sturdee.online/support"\n  },\n  {\n    "name": "Colors",\n    "settings": [\n      {\n        "type": "color",\n        "id": "color_primary",\n        "label": "Primary brand color",\n        "default": "#10B981"\n      },\n      {\n        "type": "color",\n        "id": "color_background",\n        "label": "Page background",\n        "default": "#e8ebf0"\n      }\n    ]\n  },\n  {\n    "name": "Typography",\n    "settings": [\n      {\n        "type": "font_picker",\n        "id": "font_heading",\n        "label": "Heading font",\n        "default": "helvetica_n4"\n      },\n      {\n        "type": "range",\n        "id": "heading_scale",\n        "min": 80, "max": 150, "step": 5,\n        "unit": "%", "label": "Heading scale", "default": 100\n      }\n    ]\n  }\n]`),
        code(ext, `{% style %}\n  :root {\n    --color-primary: {{ settings.color_primary }};\n    --color-background: {{ settings.color_background }};\n    --font-heading-family: {{ settings.font_heading.family }};\n    --font-heading-weight: {{ settings.font_heading.weight }};\n  }\n{% endstyle %}\n\n{{ settings.font_heading | font_face: font_display: 'swap' }}`, "CSS variables from settings"),
        p("Expose settings as CSS custom properties in theme.liquid so sections inherit brand tokens without duplicating color pickers in every section schema."),
    ]),
    page("shopify_assets", "Assets & Locales", [
        h2("Serving Static Files"),
        p("The assets/ folder holds CSS, JavaScript, images, and fonts. Shopify serves them from a global CDN with automatic cache invalidation when file content changes."),
        code(ext, `{{ 'theme.css' | asset_url | stylesheet_tag }}\n{{ 'component-product.css' | asset_url | stylesheet_tag: preload: true }}\n\n{{ 'theme.js' | asset_url | script_tag: defer: true }}\n{{ 'product-form.js' | asset_url | script_tag: defer: true }}\n\n<img src="{{ 'logo.svg' | asset_url }}" alt="{{ shop.name | escape }}" width="120" height="40">`, "Asset tags in theme.liquid"),
        list([
            "stylesheet_tag — generates <link rel=\"stylesheet\">",
            "script_tag: defer — non-blocking scripts at end of body",
            "preload: true — hints browser to fetch critical CSS early",
            "asset_url alone — use for images, fonts, JSON in snippets",
        ]),
        h3("Internationalization with locales/"),
        code("json", `{\n  "general": {\n    "accessibility": {\n      "skip_to_content": "Skip to content"\n    }\n  },\n  "products": {\n    "add_to_cart": "Add to cart",\n    "sold_out": "Sold out",\n    "quantity": "Quantity"\n  },\n  "cart": {\n    "title": "Your cart",\n    "checkout": "Checkout",\n    "empty": "Your cart is empty"\n  }\n}`),
        code(ext, `{{ 'general.accessibility.skip_to_content' | t }}\n{{ 'products.add_to_cart' | t }}\n\n{% assign count = cart.item_count %}\n{{ 'cart.item_count' | t: count: count }}`, "Translation filter"),
        note("Add locale files for each market language (fr.json, de.json). Schema translations go in locales/*.schema.json."),
    ]),
]);
