import { v } from "./helpers";

/**
 * Topic-matched Shopify Liquid & theme development videos.
 * Primary course: Coding with Robby — Getting started with Shopify Liquid (QTtXmARDG-Y)
 * CLI: ShopifyDevs — How to use the Shopify CLI (0EUSvAqxFEA)
 * Theme dev: Coding with Robby — Getting started with Shopify theme development (zCDo-l5DJSo)
 */
const LIQUID_COURSE = "QTtXmARDG-Y";
const THEME_DEV = "zCDo-l5DJSo";
const SHOPIFY_CLI = "0EUSvAqxFEA";
const LIQUID_CRASH = "-fEcwEouBDc";

export const LIQUID_VIDEOS: Record<string, ReturnType<typeof v>> = {
    // Liquid Basics
    "liquid/liquid_intro": v(LIQUID_CRASH, 0, "Shopify AI + Dev"),
    "liquid/liquid_syntax": v(LIQUID_COURSE, 0, "Coding with Robby"),
    "liquid/liquid_variables": v(LIQUID_COURSE, 30, "Coding with Robby"),
    "liquid/liquid_data_types": v(LIQUID_COURSE, 120, "Coding with Robby"),
    "liquid/liquid_operators": v(LIQUID_COURSE, 300, "Coding with Robby"),

    // Liquid Tags
    "liquid/liquid_if": v(LIQUID_COURSE, 300, "Coding with Robby"),
    "liquid/liquid_case": v(LIQUID_COURSE, 480, "Coding with Robby"),
    "liquid/liquid_for": v(LIQUID_COURSE, 600, "Coding with Robby"),
    "liquid/liquid_tablerow": v(LIQUID_COURSE, 600, "Coding with Robby"),
    "liquid/liquid_render": v(LIQUID_COURSE, 1140, "Coding with Robby"),
    "liquid/liquid_paginate": v(THEME_DEV, 600, "Coding with Robby"),
    "liquid/liquid_forms": v(THEME_DEV, 900, "Coding with Robby"),

    // Liquid Filters
    "liquid/liquid_filters_intro": v(LIQUID_COURSE, 900, "Coding with Robby"),
    "liquid/liquid_filters_string": v(LIQUID_COURSE, 900, "Coding with Robby"),
    "liquid/liquid_filters_money": v(LIQUID_COURSE, 1020, "Coding with Robby"),
    "liquid/liquid_filters_image": v(LIQUID_COURSE, 1080, "Coding with Robby"),
    "liquid/liquid_filters_array": v(LIQUID_COURSE, 600, "Coding with Robby"),
    "liquid/liquid_filters_json": v(LIQUID_COURSE, 900, "Coding with Robby"),

    // Shopify Objects
    "liquid/liquid_object_shop": v(LIQUID_COURSE, 1200, "Coding with Robby"),
    "liquid/liquid_object_product": v(LIQUID_COURSE, 1380, "Coding with Robby"),
    "liquid/liquid_object_collection": v(LIQUID_COURSE, 1200, "Coding with Robby"),
    "liquid/liquid_object_cart": v(THEME_DEV, 1200, "Coding with Robby"),
    "liquid/liquid_object_customer": v(THEME_DEV, 1500, "Coding with Robby"),
    "liquid/liquid_object_routes": v(THEME_DEV, 300, "Coding with Robby"),
    "liquid/liquid_metafields": v(THEME_DEV, 1800, "Coding with Robby"),

    // Theme Architecture
    "liquid/shopify_theme_structure": v(THEME_DEV, 0, "Coding with Robby"),
    "liquid/shopify_theme_liquid": v(THEME_DEV, 120, "Coding with Robby"),
    "liquid/shopify_json_templates": v(THEME_DEV, 600, "Coding with Robby"),
    "liquid/shopify_sections": v(THEME_DEV, 480, "Coding with Robby"),
    "liquid/shopify_snippets": v(LIQUID_COURSE, 1140, "Coding with Robby"),
    "liquid/shopify_settings": v(THEME_DEV, 720, "Coding with Robby"),
    "liquid/shopify_assets": v(LIQUID_COURSE, 1080, "Coding with Robby"),

    // Shopify CLI
    "liquid/shopify_cli_intro": v(SHOPIFY_CLI, 0, "ShopifyDevs"),
    "liquid/shopify_cli_install": v(SHOPIFY_CLI, 60, "ShopifyDevs"),
    "liquid/shopify_cli_auth": v(SHOPIFY_CLI, 180, "ShopifyDevs"),
    "liquid/shopify_cli_theme_init": v(SHOPIFY_CLI, 300, "ShopifyDevs"),
    "liquid/shopify_cli_theme_dev": v(SHOPIFY_CLI, 420, "ShopifyDevs"),
    "liquid/shopify_cli_theme_push": v(SHOPIFY_CLI, 540, "ShopifyDevs"),
    "liquid/shopify_cli_theme_check": v(SHOPIFY_CLI, 660, "ShopifyDevs"),
    "liquid/shopify_cli_theme_package": v(SHOPIFY_CLI, 720, "ShopifyDevs"),
    "liquid/shopify_cli_github": v(SHOPIFY_CLI, 0, "ShopifyDevs"),

    // Advanced
    "liquid/liquid_product_template": v(THEME_DEV, 900, "Coding with Robby"),
    "liquid/liquid_js_integration": v("3WuI5_T3S-A", 0, "Stacking Context"),
    "liquid/liquid_performance": v("qVw1-k7kPEg", 0, "Stacking Context"),
    "liquid/liquid_app_blocks": v(THEME_DEV, 600, "Coding with Robby"),
    "liquid/liquid_best_practices": v(LIQUID_CRASH, 0, "Shopify AI + Dev"),
};
