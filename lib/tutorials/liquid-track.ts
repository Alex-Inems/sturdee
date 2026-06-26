import { section, h2, h3, list, page, code, tryit, p, note } from "./builder";
import type { TutorialTrack } from "./types";

const LANG = {
    id: "liquid",
    name: "Liquid",
    tagline: "Shopify's templating language for custom theme development",
    color: "bg-[#95BF47]/20 text-[#5E8E3E]",
    icon: "🛍️",
};

const ext = "liquid";

export const liquidTrack: TutorialTrack = {
    language: LANG,
    sections: [
        section("Liquid Basics", [
            page("liquid_intro", "Liquid Introduction", [
                h2("What is Liquid?"),
                p("Liquid is an open-source templating language created by Shopify. It is the foundation of every Shopify theme — you use it to load dynamic store data (products, collections, cart, customers) into HTML templates."),
                h2("Liquid + Shopify Themes"),
                p("A Shopify Online Store 2.0 theme is a folder of Liquid templates, JSON templates, sections, snippets, assets, and configuration files. Liquid runs on Shopify's servers; the browser receives plain HTML."),
                list([
                    "Safe by design — no arbitrary server-side code execution",
                    "Separates logic ({% tags %}) from output ({{ variables }})",
                    "Powers all merchant-facing storefront pages",
                    "Extended with Shopify-specific objects, tags, and filters",
                ]),
                code(ext, `{% comment %} Welcome message {% endcomment %}\n<h1>Welcome to {{ shop.name }}</h1>\n<p>{{ shop.description }}</p>`),
                tryit("html", `<h1>Welcome to Sturdee Store</h1>\n<p>Premium courses and tutorials for developers.</p>`),
            ]),
            page("liquid_syntax", "Liquid Syntax", [
                h2("Three Delimiter Types"),
                list([
                    "{{ }} — Output: prints a value to the page",
                    "{% %} — Logic tags: if, for, assign, render, etc.",
                    "{% comment %} {% endcomment %} — Comments (not rendered)",
                ]),
                h3("Output"),
                code(ext, `{{ product.title }}\n{{ product.price | money }}`),
                h3("Tags"),
                code(ext, `{% if product.available %}\n  <button type="submit">Add to cart</button>\n{% else %}\n  <p>Sold out</p>\n{% endif %}`),
                tryit("html", `<button type="submit">Add to cart</button>`),
                note("Liquid is whitespace-sensitive inside tags but forgiving with HTML around it. Use {{- -}} or {%- -%} to strip whitespace when needed."),
            ]),
            page("liquid_variables", "Liquid Variables", [
                h2("assign"),
                p("Create variables with assign. Only strings, numbers, booleans, nil, arrays, and objects are allowed."),
                code(ext, `{% assign greeting = "Hello" %}\n{% assign total = 0 %}\n\n<p>{{ greeting }}, {{ customer.first_name }}!</p>`),
                h3("capture"),
                p("Capture blocks store rendered HTML into a variable."),
                code(ext, `{% capture product_card %}\n  <div class="card">\n    <h2>{{ product.title }}</h2>\n  </div>\n{% endcapture %}\n\n{{ product_card }}`),
                h3("increment / decrement"),
                code(ext, `{% increment counter %}\n{% increment counter %}\n{# outputs 0 then 1 #}`),
            ]),
            page("liquid_data_types", "Liquid Data Types", [
                h2("Types in Liquid"),
                list([
                    "String — \"Hello\"",
                    "Number — 42, 3.14",
                    "Boolean — true, false",
                    "Nil — empty / undefined value",
                    "Array — [1, 2, 3]",
                    "Object — product, collection, shop (Shopify drops)",
                ]),
                code(ext, `{% if product == nil %}\n  <p>Product not found</p>\n{% endif %}\n\n{% if collection.products.size > 0 %}\n  <p>{{ collection.products.size }} products</p>\n{% endif %}`),
            ]),
            page("liquid_operators", "Liquid Operators", [
                h2("Comparison & Logic"),
                list([
                    "==  !=  <  >  <=  >=",
                    "and  or  contains",
                    "Operators work in {% if %} and {% unless %} tags",
                ]),
                code(ext, `{% if product.price < 5000 and product.available %}\n  <span class="badge">Budget pick</span>\n{% endif %}\n\n{% if product.tags contains 'sale' %}\n  <span class="badge">On sale</span>\n{% endif %}`),
            ]),
        ]),
        section("Liquid Tags", [
            page("liquid_if", "Liquid If / Unless", [
                h2("Conditional Tags"),
                code(ext, `{% if cart.item_count > 0 %}\n  <a href="{{ routes.cart_url }}">Cart ({{ cart.item_count }})</a>\n{% else %}\n  <a href="{{ routes.cart_url }}">Cart</a>\n{% endif %}`),
                h3("elsif and else"),
                code(ext, `{% if product.compare_at_price > product.price %}\n  <span class="sale">On sale</span>\n{% elsif product.available == false %}\n  <span class="sold-out">Sold out</span>\n{% else %}\n  <span class="regular">In stock</span>\n{% endif %}`),
                h3("unless"),
                code(ext, `{% unless product.available %}\n  <p>This product is currently unavailable.</p>\n{% endunless %}`),
                tryit("html", `<a href="/cart">Cart (2)</a>`),
            ]),
            page("liquid_case", "Liquid Case", [
                h2("case / when"),
                code(ext, `{% case product.type %}\n  {% when 'Course' %}\n    <span>Digital course</span>\n  {% when 'Bundle' %}\n    <span>Course bundle</span>\n  {% else %}\n    <span>Physical product</span>\n{% endcase %}`),
            ]),
            page("liquid_for", "Liquid For Loops", [
                h2("for loop"),
                code(ext, `{% for product in collection.products limit: 8 %}\n  <article class="product-card">\n    <a href="{{ product.url }}">\n      <img src="{{ product.featured_image | image_url: width: 400 }}" alt="{{ product.title | escape }}">\n      <h3>{{ product.title }}</h3>\n      <p>{{ product.price | money }}</p>\n    </a>\n  </article>\n{% endfor %}`),
                h3("forloop object"),
                code(ext, `{% for item in cart.items %}\n  <tr class="{% if forloop.first %}first{% endif %} {% if forloop.last %}last{% endif %}">\n    <td>{{ forloop.index }}</td>\n    <td>{{ item.product.title }}</td>\n  </tr>\n{% endfor %}`),
                list([
                    "forloop.index — 1-based position",
                    "forloop.index0 — 0-based position",
                    "forloop.first / forloop.last — boolean",
                    "forloop.length — total items",
                ]),
                tryit("html", `<article class="product-card"><a href="#"><h3>Full-Stack Web Development</h3><p>$1,899.00</p></a></article>`),
            ]),
            page("liquid_tablerow", "Liquid tablerow", [
                h2("tablerow"),
                p("Renders rows of a fixed number of columns — useful for product grids."),
                code(ext, `{% tablerow product in collection.products cols: 4 %}\n  <div class="grid-cell">\n    {{ product.title }}\n  </div>\n{% endtablerow %}`),
            ]),
            page("liquid_render", "render & include", [
                h2("render (recommended)"),
                p("Include snippets with isolated scope. Pass variables explicitly."),
                code(ext, `{%- render 'product-card',\n    product: product,\n    show_vendor: true\n-%}`),
                h3("include (legacy)"),
                p("Older syntax with shared parent scope. Prefer render in new themes."),
                code(ext, `{% include 'icon-cart' %}`),
                note("Online Store 2.0 themes should use {% render %} exclusively for snippets."),
            ]),
            page("liquid_paginate", "Liquid Paginate", [
                h2("paginate tag"),
                p("Split large collections across pages."),
                code(ext, `{% paginate collection.products by 12 %}\n  {% for product in collection.products %}\n    {% render 'product-card', product: product %}\n  {% endfor %}\n\n  {{ paginate | default_pagination }}\n{% endpaginate %}`),
            ]),
            page("liquid_forms", "Liquid Forms", [
                h2("Shopify Forms"),
                p("Use the form tag for cart, customer, and contact forms with CSRF protection."),
                code(ext, `{% form 'product', product %}\n  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">\n  <button type="submit" name="add">Add to cart</button>\n{% endform %}`),
                h3("Cart form"),
                code(ext, `{% form 'cart', cart %}\n  {% for item in cart.items %}\n    <input type="number" name="updates[{{ item.key }}]" value="{{ item.quantity }}">\n  {% endfor %}\n  <button type="submit" name="update">Update cart</button>\n{% endform %}`),
            ]),
        ]),
        section("Liquid Filters", [
            page("liquid_filters_intro", "Filters Introduction", [
                h2("What are Filters?"),
                p("Filters modify output with the pipe | operator. They chain left to right."),
                code(ext, `{{ product.title | upcase }}\n{{ product.description | strip_html | truncate: 120 }}\n{{ product.price | money_with_currency }}`),
                tryit("html", `<p>FULL-STACK WEB DEVELOPMENT</p><p>$1,899.00 USD</p>`),
            ]),
            page("liquid_filters_string", "String Filters", [
                h2("Common String Filters"),
                list([
                    "upcase / downcase / capitalize",
                    "strip / lstrip / rstrip",
                    "split / join / replace / remove",
                    "truncate / truncatewords",
                    "escape / strip_html",
                ]),
                code(ext, `{{ '  hello world  ' | strip | capitalize }}\n{{ product.tags | join: ', ' }}\n{{ article.title | truncate: 50 }}`),
            ]),
            page("liquid_filters_money", "Money & Number Filters", [
                h2("Money Filters"),
                code(ext, `{{ product.price | money }}\n{{ cart.total_price | money_with_currency }}\n{{ product.compare_at_price | minus: product.price | money }}`),
                h3("Math filters"),
                code(ext, `{{ 10 | plus: 5 }}\n{{ 20 | minus: 3 }}\n{{ 4 | times: 2 }}\n{{ 10 | divided_by: 2 }}`),
            ]),
            page("liquid_filters_image", "Image Filters", [
                h2("image_url & image_tag"),
                p("Shopify CDN image transforms — always use these instead of raw asset URLs for product images."),
                code(ext, `{{ product.featured_image | image_url: width: 800 }}\n\n{{ product.featured_image | image_url: width: 400, height: 400, crop: 'center' | image_tag: loading: 'lazy', alt: product.title }}`),
                list([
                    "width / height — resize dimensions",
                    "crop — center, top, bottom, left, right",
                    "format — jpg, png, webp (auto on modern themes)",
                    "loading: 'lazy' — performance best practice",
                ]),
            ]),
            page("liquid_filters_array", "Array Filters", [
                h2("Array Filters"),
                code(ext, `{{ collection.products | size }}\n{{ collection.products | first }}\n{{ collection.products | where: 'available', true | size }}\n{{ collection.products | sort: 'price' | reverse }}`),
                list(["size", "first", "last", "join", "sort", "reverse", "uniq", "map", "where"]),
            ]),
            page("liquid_filters_json", "JSON & Default Filters", [
                h2("default & json"),
                code(ext, `{{ product.metafields.custom.subtitle | default: product.title }}\n\n<script type="application/json" id="ProductJson-{{ product.id }}">\n  {{ product | json }}\n</script>`),
                note("Use | json when passing Shopify objects to JavaScript. Never trust client-side price data for checkout."),
            ]),
        ]),
        section("Shopify Objects", [
            page("liquid_object_shop", "shop Object", [
                h2("Global shop object"),
                code(ext, `{{ shop.name }}\n{{ shop.email }}\n{{ shop.currency }}\n{{ shop.domain }}\n{{ shop.permanent_domain }}`),
                p("Available on every page. Use for branding, currency, and domain references."),
            ]),
            page("liquid_object_product", "product Object", [
                h2("product"),
                list([
                    "product.title, product.description, product.handle",
                    "product.price, product.compare_at_price",
                    "product.available, product.variants",
                    "product.featured_image, product.images",
                    "product.tags, product.type, product.vendor",
                    "product.metafields — custom data",
                ]),
                code(ext, `<h1>{{ product.title }}</h1>\n<p>{{ product.description }}</p>\n\n{% for variant in product.variants %}\n  <option value="{{ variant.id }}" {% if variant == product.selected_or_first_available_variant %}selected{% endif %}>\n    {{ variant.title }} — {{ variant.price | money }}\n  </option>\n{% endfor %}`),
            ]),
            page("liquid_object_collection", "collection Object", [
                h2("collection"),
                code(ext, `<h1>{{ collection.title }}</h1>\n<p>{{ collection.description }}</p>\n<p>{{ collection.products_count }} products</p>\n\n{% for product in collection.products %}\n  {% render 'product-card', product: product %}\n{% endfor %}`),
            ]),
            page("liquid_object_cart", "cart Object", [
                h2("cart"),
                code(ext, `{% if cart.item_count > 0 %}\n  <p>{{ cart.item_count }} items — {{ cart.total_price | money }}</p>\n  {% for item in cart.items %}\n    <div>{{ item.product.title }} × {{ item.quantity }}</div>\n  {% endfor %}\n{% endif %}`),
            ]),
            page("liquid_object_customer", "customer Object", [
                h2("customer"),
                code(ext, `{% if customer %}\n  <p>Welcome back, {{ customer.first_name }}!</p>\n  <a href="{{ routes.account_url }}">My account</a>\n{% else %}\n  <a href="{{ routes.account_login_url }}">Log in</a>\n{% endif %}`),
            ]),
            page("liquid_object_routes", "routes Object", [
                h2("routes — canonical URLs"),
                list([
                    "routes.root_url",
                    "routes.cart_url",
                    "routes.account_url",
                    "routes.collections_url",
                    "routes.all_products_collection_url",
                    "routes.search_url",
                ]),
                code(ext, `<a href="{{ routes.cart_url }}">Cart</a>\n<a href="{{ routes.account_login_url }}">Login</a>`),
                note("Always use routes instead of hardcoding /cart or /account URLs for multi-market stores."),
            ]),
            page("liquid_metafields", "Metafields in Liquid", [
                h2("Accessing Metafields"),
                p("Metafields store custom data on products, collections, shops, and more."),
                code(ext, `{{ product.metafields.custom.duration }}\n{{ product.metafields.descriptors.subtitle }}\n\n{% if product.metafields.custom.featured_video %}\n  <video src="{{ product.metafields.custom.featured_video | file_url }}"></video>\n{% endif %}`),
                note("Namespace and key must match definitions in Shopify Admin or your app's metafield definitions."),
            ]),
        ]),
        section("Theme Architecture", [
            page("shopify_theme_structure", "Theme Folder Structure", [
                h2("Online Store 2.0 Layout"),
                code("bash", `my-theme/\n├── assets/          # CSS, JS, images\n├── config/\n│   ├── settings_schema.json\n│   └── settings_data.json\n├── layout/\n│   └── theme.liquid\n├── locales/         # translations\n├── sections/        # reusable sections + schema\n├── snippets/        # partial templates\n└── templates/\n    ├── index.json\n    ├── product.json\n    └── collection.json`),
                list([
                    "layout/ — wrapper HTML (theme.liquid)",
                    "templates/ — page-level JSON or Liquid templates",
                    "sections/ — modular, merchant-customizable blocks",
                    "snippets/ — reusable Liquid partials",
                    "config/ — theme settings merchants edit in the editor",
                ]),
            ]),
            page("shopify_theme_liquid", "theme.liquid Layout", [
                h2("Root Layout"),
                code(ext, `<!DOCTYPE html>\n<html lang="{{ request.locale.iso_code }}">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>{{ page_title }}{% if current_tags %} &ndash; {{ current_tags | join: ', ' }}{% endif %}</title>\n  {{ content_for_header }}\n  {{ 'theme.css' | asset_url | stylesheet_tag }}\n</head>\n<body class="template-{{ template.name }}">\n  {% sections 'header-group' %}\n  <main id="MainContent">{{ content_for_layout }}</main>\n  {% sections 'footer-group' %}\n  {{ 'theme.js' | asset_url | script_tag }}\n</body>\n</html>`),
                note("{{ content_for_header }} is required — Shopify injects analytics, apps, and scripts here."),
            ]),
            page("shopify_json_templates", "JSON Templates", [
                h2("Template JSON files"),
                p("JSON templates define which sections appear on a page and their order. Merchants can add, remove, and reorder sections in the theme editor."),
                code("json", `{\n  "sections": {\n    "hero": {\n      "type": "hero-banner",\n      "settings": {\n        "heading": "Learn to Code",\n        "button_label": "Browse courses"\n      }\n    },\n    "featured": {\n      "type": "featured-collection",\n      "settings": {\n        "collection": "programming",\n        "products_to_show": 4\n      }\n    }\n  },\n  "order": ["hero", "featured"]\n}`),
            ]),
            page("shopify_sections", "Sections & Schema", [
                h2("Section file with schema"),
                code(ext, `{%- comment -%} sections/hero-banner.liquid {%- endcomment -%}\n\n<section class="hero" style="--hero-bg: {{ section.settings.bg_color }}">\n  <h1>{{ section.settings.heading }}</h1>\n  {% if section.settings.button_label != blank %}\n    <a href="{{ section.settings.button_link }}" class="btn">\n      {{ section.settings.button_label }}\n    </a>\n  {% endif %}\n</section>\n\n{% schema %}\n{\n  "name": "Hero banner",\n  "tag": "section",\n  "class": "hero-section",\n  "settings": [\n    {\n      "type": "text",\n      "id": "heading",\n      "label": "Heading",\n      "default": "Welcome"\n    },\n    {\n      "type": "color",\n      "id": "bg_color",\n      "label": "Background color",\n      "default": "#e8ebf0"\n    },\n    {\n      "type": "url",\n      "id": "button_link",\n      "label": "Button link"\n    },\n    {\n      "type": "text",\n      "id": "button_label",\n      "label": "Button label"\n    }\n  ],\n  "presets": [{ "name": "Hero banner" }]\n}\n{% endschema %}`),
                h3("Blocks inside sections"),
                code(ext, `{% for block in section.blocks %}\n  <div {{ block.shopify_attributes }}>\n    {% case block.type %}\n      {% when 'heading' %}\n        <h2>{{ block.settings.text }}</h2>\n      {% when 'text' %}\n        <p>{{ block.settings.body }}</p>\n    {% endcase %}\n  </div>\n{% endfor %}`),
            ]),
            page("shopify_snippets", "Snippets", [
                h2("Reusable Snippets"),
                p("Snippets live in snippets/ and are included with render."),
                code(ext, `{%- comment -%} snippets/product-card.liquid {%- endcomment -%}\n\n<article class="product-card">\n  <a href="{{ product.url }}">\n    {% if product.featured_image %}\n      {{ product.featured_image | image_url: width: 500 | image_tag: loading: 'lazy', alt: product.title }}\n    {% endif %}\n    <h3>{{ product.title }}</h3>\n    <p class="price">{{ product.price | money }}</p>\n    {% if show_vendor %}\n      <span class="vendor">{{ product.vendor }}</span>\n    {% endif %}\n  </a>\n</article>`),
            ]),
            page("shopify_settings", "Theme Settings", [
                h2("settings_schema.json"),
                p("Define global theme settings merchants configure in the admin theme editor."),
                code("json", `[\n  {\n    "name": "Colors",\n    "settings": [\n      {\n        "type": "color",\n        "id": "color_primary",\n        "label": "Primary color",\n        "default": "#10B981"\n      },\n      {\n        "type": "color",\n        "id": "color_background",\n        "label": "Page background",\n        "default": "#e8ebf0"\n      }\n    ]\n  },\n  {\n    "name": "Typography",\n    "settings": [\n      {\n        "type": "font_picker",\n        "id": "font_heading",\n        "label": "Heading font",\n        "default": "helvetica_n4"\n      }\n    ]\n  }\n]`),
                code(ext, `{{ settings.color_primary }}\n{{ settings.font_heading | font_face }}`),
            ]),
            page("shopify_assets", "Assets & Locales", [
                h2("Asset tags"),
                code(ext, `{{ 'theme.css' | asset_url | stylesheet_tag }}\n{{ 'theme.js' | asset_url | script_tag: defer: true }}\n<img src="{{ 'logo.svg' | asset_url }}" alt="{{ shop.name }}">`),
                h3("Translations (locales/)"),
                code("json", `{\n  "products": {\n    "add_to_cart": "Add to cart",\n    "sold_out": "Sold out"\n  }\n}`),
                code(ext, `{{ 'products.add_to_cart' | t }}\n{{ 'products.sold_out' | t }}`),
            ]),
        ]),
        section("Shopify CLI", [
            page("shopify_cli_intro", "Shopify CLI Introduction", [
                h2("What is Shopify CLI?"),
                p("Shopify CLI is the official command-line tool for building, testing, and deploying themes and apps. It replaces the deprecated Theme Kit for modern theme development."),
                list([
                    "Scaffold new themes and apps",
                    "Run a local dev server with hot reload",
                    "Push and pull theme files to/from a store",
                    "Run Theme Check linting",
                    "Manage app extensions and deployment",
                ]),
                note("Install Node.js 18+ before installing Shopify CLI."),
            ]),
            page("shopify_cli_install", "Install Shopify CLI", [
                h2("Installation"),
                code("bash", `# Install globally via npm\nnpm install -g @shopify/cli @shopify/theme\n\n# Verify installation\nshopify version`),
                h3("Alternative: Homebrew (macOS)"),
                code("bash", `brew tap shopify/shopify\nbrew install shopify-cli`),
                h3("Requirements"),
                list([
                    "Node.js 18 or higher",
                    "A Shopify Partner account or store staff access",
                    "Git (recommended for version control)",
                ]),
            ]),
            page("shopify_cli_auth", "CLI Authentication", [
                h2("Log in to your store"),
                code("bash", `# Opens browser OAuth flow\nshopify auth login\n\n# Log in to a specific store\nshopify auth login --store your-store.myshopify.com`),
                p("After login, CLI stores credentials locally. Use shopify auth logout to clear them."),
                note("Partner developers should create a development store in the Partner Dashboard for theme work."),
            ]),
            page("shopify_cli_theme_init", "theme init — Start a New Theme", [
                h2("Create a theme from scratch"),
                code("bash", `# Clone Shopify's Skeleton reference theme\nshopify theme init my-custom-theme\n\n# Or start from Dawn (Shopify's default OS 2.0 theme)\nshopify theme init my-theme --clone-url https://github.com/Shopify/dawn.git\ncd my-theme`),
                p("theme init creates the full folder structure: assets, config, layout, locales, sections, snippets, and templates."),
            ]),
            page("shopify_cli_theme_dev", "theme dev — Local Development", [
                h2("Development server"),
                code("bash", `# Start dev server with live reload\ncd my-theme\nshopify theme dev --store your-store.myshopify.com`),
                p("CLI uploads your theme as a development theme and gives you a preview URL. File saves trigger automatic sync and browser refresh."),
                list([
                    "--store — target store URL",
                    "--theme — existing theme ID to overwrite",
                    "--only / --ignore — filter synced files",
                    "--host — custom tunnel host (default: Cloudflare)",
                ]),
                code("bash", `# Sync only sections and snippets\nshopify theme dev --only sections --only snippets`),
            ]),
            page("shopify_cli_theme_push", "theme push & pull", [
                h2("Deploy to a store"),
                code("bash", `# Push local files to the live theme (use with caution)\nshopify theme push --store your-store.myshopify.com\n\n# Push to an unpublished theme (safe for staging)\nshopify theme push --unpublished --theme \"Staging\"\n\n# Pull remote theme files to local\nshopify theme pull --store your-store.myshopify.com\n\n# Pull a specific theme by ID\nshopify theme pull --theme 123456789012`),
                h3("List themes on a store"),
                code("bash", `shopify theme list --store your-store.myshopify.com`),
                note("Never push directly to the live theme without testing. Use --unpublished or a development theme first."),
            ]),
            page("shopify_cli_theme_check", "theme check — Linting", [
                h2("Theme Check"),
                p("Static analysis for Liquid, JSON, and theme best practices."),
                code("bash", `# Run all checks\nshopify theme check\n\n# Auto-fix safe issues\nshopify theme check --auto-correct\n\n# Run a specific check\nshopify theme check --list`),
                list([
                    "Missing {{ content_for_header }} in layout",
                    "Deprecated {% include %} tags",
                    "Parser-blocking scripts in <head>",
                    "Missing width/height on images",
                    "Unused snippets and locales",
                ]),
            ]),
            page("shopify_cli_theme_package", "theme package & share", [
                h2("Package for Theme Store submission"),
                code("bash", `# Create a zip for Theme Store review\nshopify theme package\n\n# Share a preview link\nshopify theme share --store your-store.myshopify.com`),
            ]),
            page("shopify_cli_github", "CLI + Git Workflow", [
                h2("Recommended workflow"),
                code("bash", `git init\ngit add .\ngit commit -m "Initial theme setup"\n\n# Daily development\nshopify theme dev\n# ... edit files, preview changes ...\n\ngit add sections/hero-banner.liquid\ngit commit -m "Add hero banner section"\n\n# Deploy to staging\nshopify theme push --unpublished --theme "Staging"`),
                p("Use Git branches for features. Pair feature branches with unpublished Shopify themes for QA before merging to main and pushing live."),
            ]),
        ]),
        section("Advanced Theme Development", [
            page("liquid_product_template", "Product Page Template", [
                h2("Full product section example"),
                code(ext, `{%- liquid\n  assign current_variant = product.selected_or_first_available_variant\n  assign featured_media = current_variant.featured_media | default: product.featured_media\n-%}\n\n<div class="product" data-product-id="{{ product.id }}">\n  <div class="product__media">\n    {{ featured_media | image_url: width: 1000 | image_tag: loading: 'eager', alt: product.title }}\n  </div>\n  <div class="product__info">\n    <h1>{{ product.title }}</h1>\n    <p class="price">{{ current_variant.price | money }}</p>\n    {% form 'product', product, id: 'product-form' %}\n      <select name="id">\n        {% for variant in product.variants %}\n          <option value="{{ variant.id }}" {% unless variant.available %}disabled{% endunless %}>\n            {{ variant.title }} — {{ variant.price | money }}\n          </option>\n        {% endfor %}\n      </select>\n      <button type="submit" name="add" {% unless current_variant.available %}disabled{% endunless %}>\n        {% if current_variant.available %}{{ 'products.add_to_cart' | t }}{% else %}{{ 'products.sold_out' | t }}{% endif %}\n      </button>\n    {% endform %}\n    <div class="rte">{{ product.description }}</div>\n  </div>\n</div>`),
            ]),
            page("liquid_js_integration", "Liquid + JavaScript", [
                h2("Passing data to JS"),
                p("Expose product or cart data safely with JSON filters. Never use Liquid for checkout logic."),
                code(ext, `<script>\n  window.productData = {{ product | json }};\n</script>\n\n<script src="{{ 'product-form.js' | asset_url }}" defer></script>`),
                code("javascript", `// assets/product-form.js\nconst product = window.productData;\nconst form = document.querySelector('#product-form');\nform?.addEventListener('change', (e) => {\n  if (e.target.name === 'id') {\n    const variant = product.variants.find(v => v.id === Number(e.target.value));\n    document.querySelector('.price').textContent = formatMoney(variant.price);\n  }\n});`),
            ]),
            page("liquid_performance", "Theme Performance", [
                h2("Performance Best Practices"),
                list([
                    "Use image_url with explicit width — never serve full-resolution images",
                    "Add loading: 'lazy' to below-fold images",
                    "Defer non-critical JavaScript with script_tag: defer",
                    "Minimize Liquid loops inside loops (collection × variants)",
                    "Use {% liquid %} tag to reduce whitespace output",
                    "Run shopify theme check before every deploy",
                ]),
                code(ext, `{%- liquid\n  assign card_width = 400\n  assign image = product.featured_image | image_url: width: card_width\n-%}\n<img src="{{ image }}" width="{{ card_width }}" height="{{ card_width }}" loading="lazy" alt="{{ product.title | escape }}">`),
            ]),
            page("liquid_app_blocks", "App Blocks & Embeds", [
                h2("App blocks in sections"),
                p("Apps can inject blocks into your theme via the theme editor. Support them in section schemas."),
                code(ext, `{% schema %}\n{\n  "name": "Page content",\n  "blocks": [\n    { "type": "@app" },\n    {\n      "type": "text",\n      "name": "Text block",\n      "settings": [{ "type": "richtext", "id": "body", "label": "Body" }]\n    }\n  ]\n}\n{% endschema %}`),
            ]),
            page("liquid_best_practices", "Theme Development Best Practices", [
                h2("Production Checklist"),
                list([
                    "Use Online Store 2.0 JSON templates and sections everywhere",
                    "Prefer {% render %} over {% include %}",
                    "Use routes object for all internal links",
                    "Escape user content with | escape in attributes",
                    "Store design tokens in settings_schema.json",
                    "Translate all merchant-facing strings via locales/",
                    "Test with shopify theme dev on a development store",
                    "Lint with shopify theme check before theme push",
                    "Use Git + unpublished themes for staging",
                    "Document section settings for merchants in schema labels",
                ]),
                note("Review Shopify's Theme Store requirements if you plan to distribute your theme publicly."),
            ]),
        ]),
    ],
};
