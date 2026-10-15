import type { BlogTopicPatch } from "./types";

export const CORE_TOPIC_PATCHES_FR: Record<string, BlogTopicPatch> = {
    "css-flexbox-complete-guide": {
        title: "Guide complet CSS Flexbox — aligner, justifier et créer des mises en page",
        seoTitle: "CSS Flexbox — guide complet pour développeurs",
        description:
            "Maîtrisez CSS Flexbox : flex-direction, justify-content, align-items, gap et wrap. Créez barres de navigation, cartes et centrage sans hacks.",
        focusKeyword: "CSS Flexbox",
        keywords: ["CSS Flexbox", "tutoriel Flexbox", "apprendre Flexbox", "mise en page Flexbox", "Flexbox CSS français"],
        readTime: "10 min de lecture",
        headings: {
            intro: "CSS Flexbox — mise en page expliquée",
            concepts: "Flexbox — idées clés à connaître",
            steps: "Utiliser Flexbox étape par étape",
            code: "Exemple de code Flexbox",
            practice: "Pratiquer Flexbox avec des leçons gratuites",
            faq: "CSS Flexbox — FAQ",
        },
        intro:
            "Flexbox est un système de mise en page unidimensionnel — idéal pour les barres de navigation, barres d’outils, rangées de cartes et le centrage vertical. Il remplace la plupart des astuces avec float pour l’interface.",
        whyItMatters:
            "Flexbox est l’outil par défaut pour la mise en page des composants en CSS moderne — barres de nav, toolbars et rangées de cartes en dépendent.",
        deepDive:
            "Maîtrisez justify-content et align-items sur le parent, puis flex-grow sur les enfants — cela couvre 90 % des cas réels avec Flexbox.",
        concepts: [
            "display: flex sur le conteneur parent",
            "flex-direction: row | column",
            "justify-content — alignement sur l’axe principal",
            "align-items — alignement sur l’axe transversal",
            "gap remplace les marges bricolées",
            "flex: 1 pour faire grandir les enfants",
        ],
        steps: [
            "Appliquer display:flex sur le conteneur",
            "Choisir row ou column",
            "Aligner et justifier",
            "Utiliser gap pour l’espacement",
            "Laisser les éléments grandir avec flex:1",
        ],
        practice: "Suivez le tutoriel CSS mise en page sur Sturdee et reconstruisez une navbar avec Flexbox.",
        faq: [
            {
                question: "Flexbox ou Grid ?",
                answer:
                    "Flexbox pour les mises en page unidimensionnelles (lignes OU colonnes). Grid pour les grilles de page en deux dimensions.",
            },
        ],
    },
    "css-grid-layout-tutorial": {
        title: "Tutoriel CSS Grid — modèles, gaps et zones",
        seoTitle: "CSS Grid — tutoriel mise en page responsive",
        description:
            "Apprenez CSS Grid : grid-template-columns, unités fr, grid-template-areas et grilles responsive sans media queries compliquées.",
        focusKeyword: "CSS Grid",
        keywords: ["CSS Grid", "tutoriel CSS Grid", "apprendre CSS Grid", "grille responsive CSS", "mise en page Grid"],
        readTime: "11 min de lecture",
        headings: {
            intro: "CSS Grid pour les mises en page de page",
            concepts: "CSS Grid — idées clés",
            steps: "Construire une grille Grid pas à pas",
            code: "Exemple de code CSS Grid",
            practice: "Pratiquer CSS Grid gratuitement",
            faq: "CSS Grid — FAQ",
        },
        intro:
            "CSS Grid gère les mises en page bidimensionnelles — structures de page complètes, tableaux de bord et galeries photo. C’est le remplaçant moderne des layouts float et positionnement complexes.",
        whyItMatters:
            "Grid gère des layouts 2D impossibles avec Flexbox seul — dashboards, galeries et modèles de page full-width vont plus vite avec Grid.",
        deepDive:
            "auto-fit et minmax() créent des colonnes responsive sans une seule media query — un pattern que tout site responsive devrait utiliser.",
        concepts: [
            "grid-template-columns: repeat(3, 1fr)",
            "gap pour l’espacement lignes/colonnes",
            "grid-template-areas pour des layouts nommés",
            "minmax() pour des colonnes adaptatives",
            "grid-column et grid-row pour fusionner des cellules",
        ],
        practice: "Créez une grille de cartes responsive avec le tutoriel CSS sur Sturdee.",
        faq: [
            {
                question: "Puis-je combiner Grid et Flexbox ?",
                answer:
                    "Oui. Grid pour la page ; Flexbox à l’intérieur des cellules pour les détails des composants.",
            },
        ],
    },
    "javascript-closures-explained": {
        title: "Closures JavaScript expliquées — guide simple avec exemples",
        seoTitle: "Closures JavaScript — explication claire",
        description:
            "Comprenez les closures JavaScript : portée lexicale, fonctions internes et cas d’usage en React, callbacks et modules. Guide pratique pour débutants.",
        focusKeyword: "closures JavaScript",
        keywords: ["closures JavaScript", "closure JavaScript", "portée lexicale", "tutoriel closures", "JavaScript pour débutants"],
        readTime: "9 min de lecture",
        headings: {
            intro: "Closures JavaScript — en langage clair",
            concepts: "Closures — idées clés",
            steps: "Pratiquer les closures pas à pas",
            code: "Exemple de code closure",
            practice: "Pratiquer les closures avec Sturdee",
            faq: "Closures JavaScript — FAQ",
        },
        intro:
            "Une closure, c’est quand une fonction interne se souvient des variables de sa portée externe même après la fin de la fonction externe. Les closures alimentent callbacks, gestionnaires d’événements, hooks React et modules.",
        whyItMatters:
            "Les closures apparaissent dans les hooks React, debounce/throttle et les modules — entretiens et code de prod supposent que vous les comprenez.",
        deepDive:
            "Une fonction interne qui référence des variables externes garde cette portée vivante — c’est la closure que les développeurs déboguent chaque jour.",
        concepts: [
            "Portée lexicale — les fonctions voient où elles sont définies",
            "La fonction interne « ferme » sur les variables externes",
            "Utilisées dans debounce, throttle et factories",
            "Question classique en entretien",
            "let/const et la portée de bloc influencent les closures",
        ],
        practice:
            "Étudiez fonctions et portée dans le tutoriel JavaScript Sturdee, puis implémentez un debounce.",
        faq: [
            {
                question: "Les closures sont-elles des fuites mémoire ?",
                answer:
                    "Seulement si vous gardez des références inutiles. Ce sont une fonctionnalité, pas un bug.",
            },
        ],
    },
    "javascript-async-await-guide": {
        title: "JavaScript async/await — guide complet pour débutants",
        seoTitle: "async/await JavaScript — guide débutant",
        description:
            "Maîtrisez async/await, Promises et fetch en JavaScript. Gérez appels API, erreurs et requêtes parallèles avec des patterns clairs et testables.",
        focusKeyword: "JavaScript async await",
        keywords: ["JavaScript async await", "Promises JavaScript", "tutoriel async JavaScript", "fetch JavaScript", "asynchrone JavaScript"],
        readTime: "10 min de lecture",
        headings: {
            intro: "async/await en JavaScript",
            concepts: "Async/await — idées clés",
            steps: "Utiliser async/await étape par étape",
            code: "Exemple async/await",
            practice: "Pratiquer async/await sur Sturdee",
            faq: "Async/await — FAQ",
        },
        intro:
            "JavaScript est mono-thread mais non bloquant. async/await permet d’écrire du code asynchrone qui se lit comme du synchrone — indispensable pour fetch, bases de données et timers.",
        whyItMatters:
            "Chaque appel API, requête base de données et lecture fichier en JavaScript moderne est asynchrone — async/await gère cette complexité.",
        deepDive:
            "await ne fonctionne que dans des fonctions async ; entourez await de try/catch car les Promises rejetées deviennent des erreurs catchables.",
        concepts: [
            "Les Promises représentent des valeurs futures",
            "async function renvoie toujours une Promise",
            "await suspend jusqu’à la résolution",
            "try/catch pour les erreurs async",
            "Promise.all pour des requêtes parallèles",
        ],
        practice: "Terminez les leçons async/await sur Sturdee, puis créez une app météo avec fetch.",
        faq: [
            {
                question: "async/await vs .then() ?",
                answer:
                    "Même Promises sous le capot. async/await est plus lisible pour la logique séquentielle.",
            },
        ],
    },
    "python-list-comprehensions-guide": {
        title: "Compréhensions de listes Python — transformations propres",
        seoTitle: "List comprehensions Python — syntaxe et exemples",
        description:
            "Syntaxe des list comprehensions Python, exemples et quand les préférer aux boucles. Inclut dict et set comprehensions pour scripts de données.",
        focusKeyword: "list comprehensions Python",
        keywords: ["list comprehension Python", "compréhensions Python", "listes Python", "tutoriel Python", "Python débutant"],
        readTime: "7 min de lecture",
        headings: {
            intro: "Syntaxe des list comprehensions Python",
            concepts: "Compréhensions — idées clés",
            steps: "Refactoriser des boucles en compréhensions",
            code: "Exemple de compréhension Python",
            practice: "Pratiquer sur Sturdee",
            faq: "List comprehensions — FAQ",
        },
        intro:
            "Les list comprehensions condensent boucle + append en une ligne lisible. Elles sont idiomatiques en Python et présentes dans tout code professionnel.",
        whyItMatters:
            "Les compréhensions sont idiomatiques en Python — plus rapides à lire et écrire que des boucles manuelles dans les scripts de données.",
        deepDive:
            "[expr for x in iterable if condition] remplace des boucles de trois lignes — pattern constant dans le code proche de pandas.",
        concepts: [
            "[expr for item in iterable]",
            "Ajouter if pour filtrer",
            "Compréhensions imbriquées avec parcimonie",
            "Dict et set comprehensions",
            "Lisibilité avant la malice",
        ],
        practice: "Étudiez listes et boucles sur Sturdee, puis refactorisez des boucles en compréhensions.",
        faq: [
            {
                question: "Les compréhensions sont-elles plus rapides ?",
                answer: "Souvent légèrement plus rapides que les boucles. Le principal gain est la lisibilité.",
            },
        ],
    },
    "shopify-liquid-basics-guide": {
        title: "Bases Shopify Liquid — tags, objets et filtres",
        seoTitle: "Shopify Liquid — guide des bases",
        description:
            "Apprenez le templating Shopify Liquid : tags de sortie, tags logiques, objets product et collection, filtres money et img_url pour thèmes débutants.",
        focusKeyword: "Shopify Liquid",
        keywords: ["Shopify Liquid", "apprendre Liquid Shopify", "langage Liquid", "thème Shopify débutant", "tutoriel Liquid"],
        readTime: "10 min de lecture",
        headings: {
            intro: "Langage de template Shopify Liquid",
            concepts: "Liquid — idées clés",
            steps: "Premières modifications Liquid",
            code: "Exemple Liquid",
            practice: "Tutoriel Liquid gratuit Sturdee",
            faq: "Shopify Liquid — FAQ",
        },
        intro:
            "Liquid est le langage de template Shopify pour les thèmes. Il sépare la logique du HTML pour que les marchands personnalisent la boutique sans exécution de code arbitraire.",
        whyItMatters:
            "Liquid est la porte d’entrée du développement de thèmes Shopify — compétence de niche avec forte demande freelance et moins de concurrence que React.",
        deepDive:
            "Les tags {{ }} affichent des données ; les tags {% %} contrôlent le flux ; les objets product et collection portent les données boutique.",
        concepts: [
            "Tags {{ }} de sortie",
            "Tags {% %} logiques",
            "Objets : product, collection, cart",
            "Filtres : | money, | img_url",
            "Fichier layout theme.liquid",
        ],
        practice: "Terminez le parcours Liquid gratuit sur Sturdee — l’un des plus complets en ligne.",
        faq: [
            {
                question: "Liquid vs Twig ?",
                answer: "Syntaxe proche. Liquid est spécifique Shopify avec des objets commerce.",
            },
        ],
    },
    "what-is-html-semantic-markup-guide": {
        title: "Balisage sémantique HTML — guide complet pour développeurs",
        seoTitle: "HTML sémantique — guide développeur",
        description:
            "Apprenez les éléments sémantiques HTML — header, nav, main, article, section — pour l’accessibilité, le SEO et un code maintenable sur vos sites.",
        focusKeyword: "balisage sémantique HTML",
        keywords: ["HTML sémantique", "balisage sémantique", "éléments HTML5", "accessibilité HTML", "SEO HTML"],
        readTime: "8 min de lecture",
        headings: {
            intro: "Qu’est-ce que le balisage sémantique HTML ?",
            concepts: "Sémantique HTML — idées clés",
            steps: "Structurer une page sémantique",
            code: "Exemple de squelette sémantique",
            mistakes: "Erreurs sémantiques courantes",
            practice: "Pratiquer le HTML sémantique sur Sturdee",
            faq: "HTML sémantique — FAQ",
        },
        intro:
            "Le HTML sémantique utilise des éléments qui décrivent le sens, pas seulement l’apparence. Un <nav> indique « navigation » aux lecteurs d’écran. Un <div class='nav'> non. Moteurs et assistive tech s’appuient sur la sémantique.",
        whyItMatters:
            "Google et les lecteurs d’écran analysent les balises sémantiques pour comprendre la structure — impact direct sur classements et scores d’accessibilité.",
        deepDive:
            "Remplacer la soupe de divs par <article>, <nav> et <main> donne aux crawlers des signaux explicites sur navigation vs contenu éditorial.",
        concepts: [
            "<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>",
            "Un seul <main> par page pour le contenu principal",
            "Hiérarchie de titres : un <h1>, h2–h6 imbriqués",
            "Landmarks améliorent la navigation lecteur d’écran",
            "HTML sémantique soutient les rich snippets Google",
        ],
        mistakes: [
            "Utiliser <div> pour tout",
            "Sauter des niveaux de titres (h1 vers h4)",
            "Plusieurs éléments <main>",
            "Attributs alt vides sur images informatives",
        ],
        practice:
            "Suivez le tutoriel HTML gratuit sur Sturdee — éléments et sémantique, puis une landing sémantique.",
        faq: [
            {
                question: "Le HTML sémantique est-il obligatoire ?",
                answer:
                    "Pas strictement, mais il améliore SEO, accessibilité et lisibilité — facteurs de classement pour les sites éducatifs.",
            },
        ],
        code: { title: "Squelette de page sémantique" },
    },
    "html-seo-meta-tags-guide": {
        title: "Balises meta HTML pour le SEO — title, description et Open Graph",
        seoTitle: "Meta tags HTML SEO — guide développeur",
        description:
            "Balises meta HTML essentielles pour le SEO : title, description, canonical, robots, Open Graph et Twitter Cards expliquées pour les développeurs web.",
        focusKeyword: "balises meta HTML SEO",
        keywords: ["meta tags SEO", "meta description", "Open Graph", "balises HTML SEO", "référencement technique"],
        readTime: "7 min de lecture",
        headings: {
            intro: "Balises meta HTML qui influencent Google",
            concepts: "Meta tags — idées clés",
            steps: "Optimiser le head de chaque page",
            code: "Exemple de balises meta",
            practice: "Auditer les meta sur Sturdee",
            faq: "Meta tags SEO — FAQ",
        },
        intro:
            "Les meta tags vivent dans <head> et indiquent aux moteurs comment indexer et afficher la page. Un title et une description solides affectent le CTR Google — souvent plus qu’un simple gain de position.",
        whyItMatters:
            "Title et description sont votre annonce dans les résultats — +5 % de CTR grâce à de meilleures meta peut battre un saut de ranking.",
        deepDive:
            "Chaque URL a besoin d’un title et d’une description uniques ; des meta dupliquées sont une raison fréquente pour laquelle Google réécrit vos snippets.",
        concepts: [
            "<title> — 50–60 caractères, unique par page",
            "<meta name='description'> — 150–160 caractères",
            "<link rel='canonical'> évite le contenu dupliqué",
            "og:title, og:description, og:image pour le partage social",
            "meta robots pour noindex si nécessaire",
        ],
        practice: "Inspectez les meta sur les pages tutoriels Sturdee, puis ajoutez un head correct à votre projet.",
        faq: [
            {
                question: "Les meta keywords comptent encore ?",
                answer: "Google ignore meta keywords. Concentrez-vous sur title, description et contenu de qualité.",
            },
        ],
    },
    "how-to-become-web-developer-2026": {
        title: "Devenir développeur web en 2026 — parcours étape par étape",
        seoTitle: "Devenir développeur web 2026 — feuille de route",
        description:
            "Parcours réaliste pour devenir développeur web : compétences, portfolio, calendrier et ressources gratuites dont les tutoriels Sturdee pour débutants motivés.",
        focusKeyword: "devenir développeur web 2026",
        keywords: ["devenir développeur web", "développeur web 2026", "reconversion développeur", "apprendre le web", "portfolio développeur"],
        readTime: "12 min de lecture",
        headings: {
            intro: "Votre feuille de route développeur web 2026",
            concepts: "Compétences clés du développeur web",
            steps: "Plan sur 6 mois",
            practice: "Commencer gratuitement sur Sturdee",
            faq: "Devenir développeur web — FAQ",
        },
        intro:
            "Le développement web reste l’une des compétences bien rémunérées les plus accessibles. Pas besoin de diplôme — il faut pratique régulière, projets et preuve que vous livrez.",
        whyItMatters:
            "L’embauche web reste forte — mais les employeurs veulent portfolio et fondamentaux, pas seulement des certificats de tutoriels.",
        deepDive:
            "Six mois HTML → CSS → JavaScript → un framework → projets déployés valent mieux que deux ans de vidéos aléatoires.",
        steps: [
            "Mois 1–2 : HTML, CSS, JavaScript sur Sturdee",
            "Mois 3 : projet React ou Next.js",
            "Mois 4 : backend + base de données",
            "Mois 5 : portfolio + GitHub",
            "Mois 6 : candidatures et entretiens",
        ],
        practice: "Commencez aujourd’hui avec /tutorials/html — gratuit, interactif, sans inscription pour les leçons.",
        faq: [
            {
                question: "Combien de temps pour être embauché ?",
                answer: "6–12 mois d’étude partielle concentrée est typique pour une reconversion.",
            },
        ],
    },
    "seo-for-developers-guide": {
        title: "SEO pour développeurs — checklist SEO technique",
        seoTitle: "SEO technique pour développeurs",
        description:
            "SEO technique que les développeurs maîtrisent : sitemaps, robots.txt, URLs canoniques, données structurées et vitesse de page pour un site bien indexé.",
        focusKeyword: "SEO pour développeurs",
        keywords: ["SEO pour développeurs", "SEO technique", "checklist SEO dev", "sitemap XML", "référencement développeur"],
        readTime: "10 min de lecture",
        headings: {
            intro: "Checklist SEO technique pour devs",
            concepts: "SEO technique — idées clés",
            steps: "Auditer le SEO technique",
            practice: "Ressources SEO Sturdee",
            faq: "SEO développeurs — FAQ",
        },
        intro:
            "Les développeurs posent la fondation technique du SEO — URLs crawlables, pages rapides, metadata valide et données structurées. Le marketing ne répare pas un SEO technique cassé.",
        whyItMatters:
            "Les devs livrent sitemap, canonical et vitesse que le marketing ne peut pas corriger après le lancement.",
        deepDive:
            "URLs uniques, metadata valide par page, données structurées et TTFB rapide — c’est la base du SEO technique.",
        concepts: [
            "Sitemap XML soumis à Search Console",
            "robots.txt autorise le crawl",
            "Title et meta description uniques par page",
            "Données structurées JSON-LD",
            "URLs canoniques évitent les doublons",
        ],
        practice: "Lisez le guide SEO /resources Sturdee et auditez le sitemap.xml de votre site.",
        faq: [
            {
                question: "Les développeurs doivent-ils connaître le SEO ?",
                answer:
                    "Oui pour sites de contenu, blogs et e-commerce. C’est partie intégrante d’un produit de qualité.",
            },
        ],
    },
};
