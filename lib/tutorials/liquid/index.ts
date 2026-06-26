import type { TutorialTrack } from "../types";
import { liquidBasicsSection } from "./basics";
import { liquidTagsSection } from "./tags";
import { liquidFiltersSection } from "./filters";
import { liquidObjectsSection } from "./objects";
import { liquidArchitectureSection } from "./architecture";
import { liquidCliSection } from "./cli";
import { liquidAdvancedSection } from "./advanced";

const LANG = {
    id: "liquid",
    name: "Liquid",
    tagline: "Shopify's templating language for custom theme development",
    color: "bg-[#95BF47]/20 text-[#5E8E3E]",
    icon: "🛍️",
};

export const liquidTrack: TutorialTrack = {
    language: LANG,
    sections: [
        liquidBasicsSection,
        liquidTagsSection,
        liquidFiltersSection,
        liquidObjectsSection,
        liquidArchitectureSection,
        liquidCliSection,
        liquidAdvancedSection,
    ],
};
