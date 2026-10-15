import type { BlogTopicPatch } from "./types";

export const CORE_TOPIC_PATCHES_ES: Record<string, BlogTopicPatch> = {
    "css-flexbox-complete-guide": {
        title: "Guía completa de CSS Flexbox — alinear, justificar y maquetar",
        seoTitle: "CSS Flexbox — guía completa para desarrolladores",
        description:
            "Domina CSS Flexbox: flex-direction, justify-content, align-items, gap y wrap. Crea navbars, tarjetas y layouts centrados sin trucos con float.",
        focusKeyword: "CSS Flexbox",
        keywords: ["CSS Flexbox", "tutorial Flexbox", "aprender Flexbox", "layout Flexbox", "Flexbox en español"],
        readTime: "10 min de lectura",
        headings: {
            intro: "CSS Flexbox — diseño explicado",
            concepts: "Flexbox — ideas clave",
            steps: "Usar Flexbox paso a paso",
            code: "Ejemplo de código Flexbox",
            practice: "Practicar Flexbox con lecciones gratis",
            faq: "CSS Flexbox — FAQ",
        },
        intro:
            "Flexbox es un sistema de diseño unidimensional — perfecto para navbars, barras de herramientas, filas de tarjetas y centrar contenido verticalmente. Sustituye la mayoría de hacks con float en UI.",
        whyItMatters:
            "Flexbox es la herramienta por defecto para layout de componentes en CSS moderno — navbars, toolbars y filas de tarjetas dependen de él.",
        deepDive:
            "Domina justify-content y align-items en el padre, luego flex-grow en hijos — cubre el 90 % de casos reales con Flexbox.",
        concepts: [
            "display: flex en el contenedor padre",
            "flex-direction: row | column",
            "justify-content — alineación en eje principal",
            "align-items — alineación en eje transversal",
            "gap reemplaza márgenes improvisados",
            "flex: 1 para hijos que crecen",
        ],
        steps: [
            "Pon display:flex en el contenedor",
            "Elige row o column",
            "Alinea y justifica",
            "Usa gap para espaciado",
            "Deja crecer items con flex:1",
        ],
        practice: "Sigue el tutorial CSS layout en Sturdee y reconstruye una navbar con Flexbox.",
        faq: [
            {
                question: "¿Flexbox o Grid?",
                answer:
                    "Flexbox para layouts unidimensionales (filas O columnas). Grid para maquetas de página en dos dimensiones.",
            },
        ],
    },
    "css-grid-layout-tutorial": {
        title: "Tutorial CSS Grid — plantillas, gaps y áreas",
        seoTitle: "CSS Grid — tutorial de layout responsive",
        description:
            "Aprende CSS Grid: grid-template-columns, unidades fr, grid-template-areas y grids responsive sin media queries innecesarias.",
        focusKeyword: "CSS Grid",
        keywords: ["CSS Grid", "tutorial CSS Grid", "aprender CSS Grid", "grid responsive", "layout con Grid"],
        readTime: "11 min de lectura",
        headings: {
            intro: "CSS Grid para layouts de página",
            concepts: "CSS Grid — ideas clave",
            steps: "Construir una cuadrícula paso a paso",
            code: "Ejemplo de código Grid",
            practice: "Practicar CSS Grid gratis",
            faq: "CSS Grid — FAQ",
        },
        intro:
            "CSS Grid maneja layouts bidimensionales — estructuras completas, dashboards y galerías. Es el reemplazo moderno de layouts complejos con float y posicionamiento.",
        whyItMatters:
            "Grid resuelve layouts 2D que Flexbox no cubre bien — dashboards, galerías y plantillas full-page son más rápidos con Grid.",
        deepDive:
            "auto-fit y minmax() crean columnas responsive sin una sola media query — patrón que todo sitio responsive debería usar.",
        concepts: [
            "grid-template-columns: repeat(3, 1fr)",
            "gap para espacio filas/columnas",
            "grid-template-areas para layouts con nombres",
            "minmax() para columnas adaptativas",
            "grid-column y grid-row para spanning",
        ],
        practice: "Construye una cuadrícula de tarjetas responsive con el tutorial CSS de Sturdee.",
        faq: [
            {
                question: "¿Puedo usar Grid y Flexbox juntos?",
                answer: "Sí. Grid para la página; Flexbox dentro de celdas para el interior del componente.",
            },
        ],
    },
    "javascript-closures-explained": {
        title: "Closures en JavaScript explicados — guía simple con ejemplos",
        seoTitle: "Closures JavaScript — explicación clara",
        description:
            "Entiende closures en JavaScript: ámbito léxico, funciones internas y casos en React, callbacks y módulos. Guía práctica para principiantes.",
        focusKeyword: "closures JavaScript",
        keywords: ["closures JavaScript", "closure JavaScript", "ámbito léxico", "tutorial closures", "JavaScript principiantes"],
        readTime: "9 min de lectura",
        headings: {
            intro: "Closures en JavaScript — en lenguaje claro",
            concepts: "Closures — ideas clave",
            steps: "Practicar closures paso a paso",
            code: "Ejemplo de closure",
            practice: "Practicar closures en Sturdee",
            faq: "Closures JavaScript — FAQ",
        },
        intro:
            "Un closure ocurre cuando una función interna recuerda variables de su ámbito externo aunque la función externa ya terminó. Los closures impulsan callbacks, eventos, hooks de React y módulos.",
        whyItMatters:
            "Los closures aparecen en hooks de React, debounce/throttle y módulos — entrevistas y producción asumen que los entiendes.",
        deepDive:
            "Una función interna que referencia variables externas mantiene vivo ese ámbito — es el closure que depuras a diario.",
        concepts: [
            "Ámbito léxico — las funciones ven dónde se definieron",
            "La función interna «cierra» sobre variables externas",
            "Usados en debounce, throttle y factories",
            "Pregunta clásica en entrevistas",
            "let/const y ámbito de bloque afectan closures",
        ],
        practice: "Estudia funciones y ámbito en el tutorial JavaScript de Sturdee e implementa un debounce.",
        faq: [
            {
                question: "¿Los closures son fugas de memoria?",
                answer: "Solo si mantienes referencias innecesarias. Son una característica, no un bug.",
            },
        ],
    },
    "javascript-async-await-guide": {
        title: "JavaScript async/await — guía completa para principiantes",
        seoTitle: "async/await JavaScript — guía para principiantes",
        description:
            "Domina async/await, Promises y fetch en JavaScript. Maneja APIs, errores y peticiones paralelas con patrones claros y fáciles de probar.",
        focusKeyword: "JavaScript async await",
        keywords: ["JavaScript async await", "Promises JavaScript", "tutorial async JavaScript", "fetch JavaScript", "asíncrono JavaScript"],
        readTime: "10 min de lectura",
        headings: {
            intro: "async/await en JavaScript",
            concepts: "Async/await — ideas clave",
            steps: "Usar async/await paso a paso",
            code: "Ejemplo async/await",
            practice: "Practicar async/await en Sturdee",
            faq: "Async/await — FAQ",
        },
        intro:
            "JavaScript es single-thread pero no bloqueante. async/await permite escribir código asíncrono que se lee como síncrono — esencial para fetch, bases de datos y timers.",
        whyItMatters:
            "Cada llamada API, consulta a BD y lectura de archivos en JS moderno es asíncrona — async/await gestiona esa complejidad.",
        deepDive:
            "await solo funciona dentro de funciones async; envuelve await en try/catch porque Promises rechazadas son errores capturables.",
        concepts: [
            "Las Promises representan valores futuros",
            "async function siempre devuelve una Promise",
            "await pausa hasta que la Promise se resuelve",
            "try/catch para errores async",
            "Promise.all para peticiones paralelas",
        ],
        practice: "Completa lecciones async/await en Sturdee y crea una app del clima con fetch.",
        faq: [
            {
                question: "¿async/await vs .then()?",
                answer: "Mismas Promises debajo. async/await es más claro para lógica secuencial.",
            },
        ],
    },
    "python-list-comprehensions-guide": {
        title: "List comprehensions en Python — transformación limpia de datos",
        seoTitle: "List comprehensions Python — sintaxis y ejemplos",
        description:
            "Sintaxis de list comprehensions en Python, ejemplos y cuándo usarlas vs bucles. Incluye dict y set comprehensions para scripts de datos.",
        focusKeyword: "list comprehensions Python",
        keywords: ["list comprehension Python", "comprensiones Python", "listas Python", "tutorial Python", "Python principiantes"],
        readTime: "7 min de lectura",
        headings: {
            intro: "Sintaxis de list comprehensions en Python",
            concepts: "Comprensiones — ideas clave",
            steps: "Refactorizar bucles a comprehensions",
            code: "Ejemplo de comprehension",
            practice: "Practicar en Sturdee",
            faq: "List comprehensions — FAQ",
        },
        intro:
            "Las list comprehensions comprimen bucle + append en una línea legible. Son idiomáticas en Python y aparecen en todo código profesional.",
        whyItMatters:
            "Las comprehensions son idiomáticas en Python — más rápidas de leer y escribir que bucles manuales en scripts de datos.",
        deepDive:
            "[expr for x in iterable if condition] reemplaza bucles de tres líneas — patrón constante cerca de pandas.",
        concepts: [
            "[expr for item in iterable]",
            "Añadir if para filtrar",
            "Comprehensions anidadas con moderación",
            "Dict y set comprehensions",
            "Legibilidad sobre ingenio",
        ],
        practice: "Estudia listas y bucles en Sturdee y refactoriza bucles a comprehensions.",
        faq: [
            {
                question: "¿Las comprehensions son más rápidas?",
                answer: "A menudo ligeramente más rápidas que bucles. El beneficio principal es legibilidad.",
            },
        ],
    },
    "shopify-liquid-basics-guide": {
        title: "Bases de Shopify Liquid — tags, objetos y filtros",
        seoTitle: "Shopify Liquid — guía de fundamentos",
        description:
            "Aprende templating Shopify Liquid: tags de salida, tags lógicos, objetos product y collection, filtros money e img_url para temas principiantes.",
        focusKeyword: "Shopify Liquid",
        keywords: ["Shopify Liquid", "aprender Liquid Shopify", "lenguaje Liquid", "tema Shopify principiantes", "tutorial Liquid"],
        readTime: "10 min de lectura",
        headings: {
            intro: "Lenguaje de plantillas Shopify Liquid",
            concepts: "Liquid — ideas clave",
            steps: "Primeros cambios en Liquid",
            code: "Ejemplo Liquid",
            practice: "Tutorial Liquid gratis Sturdee",
            faq: "Shopify Liquid — FAQ",
        },
        intro:
            "Liquid es el lenguaje de plantillas de Shopify para temas. Separa lógica de HTML para que comerciantes personalicen tiendas sin ejecutar código arbitrario.",
        whyItMatters:
            "Liquid es la puerta al desarrollo de temas Shopify — habilidad de nicho con demanda freelance y menos competencia que React.",
        deepDive:
            "Tags {{ }} muestran datos; tags {% %} controlan flujo; objetos product y collection cargan datos de la tienda.",
        concepts: [
            "Tags {{ }} de salida",
            "Tags {% %} lógicos",
            "Objetos: product, collection, cart",
            "Filtros: | money, | img_url",
            "Archivo layout theme.liquid",
        ],
        practice: "Completa el track Liquid gratis en Sturdee — uno de los más completos en línea.",
        faq: [
            {
                question: "¿Liquid vs Twig?",
                answer: "Sintaxis similar. Liquid es específico de Shopify con objetos de comercio.",
            },
        ],
    },
    "what-is-html-semantic-markup-guide": {
        title: "Marcado semántico HTML — guía completa para desarrolladores",
        seoTitle: "HTML semántico — guía para desarrolladores",
        description:
            "Aprende elementos semánticos HTML — header, nav, main, article, section — para accesibilidad, SEO y código mantenible en tus sitios web.",
        focusKeyword: "marcado semántico HTML",
        keywords: ["HTML semántico", "marcado semántico", "elementos HTML5", "accesibilidad HTML", "SEO HTML"],
        readTime: "8 min de lectura",
        headings: {
            intro: "¿Qué es el marcado semántico HTML?",
            concepts: "HTML semántico — ideas clave",
            steps: "Estructurar una página semántica",
            code: "Ejemplo de esqueleto semántico",
            mistakes: "Errores semánticos comunes",
            practice: "Practicar HTML semántico en Sturdee",
            faq: "HTML semántico — FAQ",
        },
        intro:
            "El HTML semántico usa elementos que describen significado, no solo apariencia. Un <nav> dice a lectores de pantalla «esto es navegación». Un <div class='nav'> no. Motores y tecnología asistiva dependen de la semántica.",
        whyItMatters:
            "Google y lectores de pantalla parsean etiquetas semánticas para entender estructura — afecta rankings y puntuaciones de accesibilidad.",
        deepDive:
            "Reemplazar sopa de divs por <article>, <nav> y <main> da a crawlers señales explícitas sobre navegación vs contenido editorial.",
        concepts: [
            "<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>",
            "Un solo <main> por página para contenido principal",
            "Jerarquía de encabezados: un <h1>, h2–h6 anidados",
            "Landmarks mejoran navegación con lector de pantalla",
            "HTML semántico apoya rich snippets en Google",
        ],
        mistakes: [
            "Usar <div> para todo",
            "Saltar niveles de encabezados (h1 a h4)",
            "Varios elementos <main>",
            "Atributos alt vacíos en imágenes informativas",
        ],
        practice: "Trabaja el tutorial HTML gratis en Sturdee — elementos y semántica, luego una landing semántica.",
        faq: [
            {
                question: "¿Es obligatorio el HTML semántico?",
                answer:
                    "No estrictamente, pero mejora SEO, accesibilidad y legibilidad — factores de ranking en sitios educativos.",
            },
        ],
        code: { title: "Esqueleto de página semántica" },
    },
    "html-seo-meta-tags-guide": {
        title: "Meta tags HTML para SEO — title, description y Open Graph",
        seoTitle: "Meta tags HTML SEO — guía desarrollador",
        description:
            "Meta tags HTML esenciales para SEO: title, description, canonical, robots, Open Graph y Twitter Cards explicados para desarrolladores web.",
        focusKeyword: "meta tags HTML SEO",
        keywords: ["meta tags SEO", "meta description", "Open Graph", "meta tags HTML", "SEO técnico"],
        readTime: "7 min de lectura",
        headings: {
            intro: "Meta tags HTML que afectan rankings en Google",
            concepts: "Meta tags — ideas clave",
            steps: "Optimizar el head de cada página",
            code: "Ejemplo de meta tags",
            practice: "Auditar meta en Sturdee",
            faq: "Meta tags SEO — FAQ",
        },
        intro:
            "Los meta tags viven en <head> e indican a buscadores cómo indexar y mostrar la página. Un title y description fuertes afectan el CTR en Google — a menudo más que solo subir posiciones.",
        whyItMatters:
            "Title y description son tu anuncio en resultados — un +5 % de CTR con mejores meta puede superar un salto de ranking.",
        deepDive:
            "Cada URL necesita title y description únicos; meta duplicadas son razón común por la que Google reescribe tus snippets.",
        concepts: [
            "<title> — 50–60 caracteres, único por página",
            "<meta name='description'> — 150–160 caracteres",
            "<link rel='canonical'> evita contenido duplicado",
            "og:title, og:description, og:image para redes",
            "meta robots para noindex cuando haga falta",
        ],
        practice: "Inspecciona meta en páginas tutorial de Sturdee y añade un head correcto a tu proyecto.",
        faq: [
            {
                question: "¿Siguen importando meta keywords?",
                answer: "Google ignora meta keywords. Enfócate en title, description y contenido de calidad.",
            },
        ],
    },
    "how-to-become-web-developer-2026": {
        title: "Cómo ser desarrollador web en 2026 — paso a paso",
        seoTitle: "Ser desarrollador web 2026 — hoja de ruta",
        description:
            "Ruta realista para ser desarrollador web: habilidades, portfolio, calendario y recursos gratis incluyendo tutoriales Sturdee para principiantes motivados.",
        focusKeyword: "ser desarrollador web 2026",
        keywords: ["ser desarrollador web", "desarrollador web 2026", "cambio de carrera dev", "aprender desarrollo web", "portfolio desarrollador"],
        readTime: "12 min de lectura",
        headings: {
            intro: "Tu hoja de ruta desarrollador web 2026",
            concepts: "Habilidades clave del desarrollador web",
            steps: "Plan de 6 meses",
            practice: "Empezar gratis en Sturdee",
            faq: "Ser desarrollador web — FAQ",
        },
        intro:
            "El desarrollo web sigue siendo una habilidad bien pagada y accesible. No necesitas título — necesitas práctica constante, proyectos y prueba de que entregas.",
        whyItMatters:
            "La contratación web sigue fuerte — pero empleadores esperan portfolio y fundamentos, no solo certificados de tutoriales.",
        deepDive:
            "Seis meses HTML → CSS → JavaScript → un framework → proyectos desplegados valen más que dos años de videos aleatorios.",
        steps: [
            "Meses 1–2: HTML, CSS, JavaScript en Sturdee",
            "Mes 3: proyecto React o Next.js",
            "Mes 4: backend + base de datos",
            "Mes 5: portfolio + GitHub",
            "Mes 6: aplicar y entrevistas",
        ],
        practice: "Empieza hoy con /tutorials/html — gratis, interactivo, sin registro para lecciones.",
        faq: [
            {
                question: "¿Cuánto hasta conseguir empleo?",
                answer: "6–12 meses de estudio parcial concentrado es típico para cambio de carrera.",
            },
        ],
    },
    "seo-for-developers-guide": {
        title: "SEO para desarrolladores — checklist SEO técnico",
        seoTitle: "SEO técnico para desarrolladores",
        description:
            "SEO técnico que los desarrolladores controlan: sitemaps, robots.txt, URLs canónicas, datos estructurados y velocidad de página para un sitio bien indexado.",
        focusKeyword: "SEO para desarrolladores",
        keywords: ["SEO para desarrolladores", "SEO técnico", "checklist SEO dev", "sitemap XML", "SEO desarrollador web"],
        readTime: "10 min de lectura",
        headings: {
            intro: "Checklist SEO técnico para devs",
            concepts: "SEO técnico — ideas clave",
            steps: "Auditar SEO técnico",
            practice: "Recursos SEO Sturdee",
            faq: "SEO desarrolladores — FAQ",
        },
        intro:
            "Los desarrolladores implementan la base técnica del SEO — URLs rastreables, páginas rápidas, metadata válida y datos estructurados. Marketing no arregla SEO técnico roto.",
        whyItMatters:
            "Los devs entregan sitemap, canonical y velocidad que marketing no puede corregir tras el lanzamiento.",
        deepDive:
            "URLs únicas, metadata válida por página, datos estructurados y TTFB rápido — esa es la base del SEO técnico.",
        concepts: [
            "Sitemap XML enviado a Search Console",
            "robots.txt permite rastreo",
            "Title y meta description únicos por página",
            "Datos estructurados JSON-LD",
            "URLs canónicas evitan duplicados",
        ],
        practice: "Lee la guía SEO /resources de Sturdee y audita el sitemap.xml de tu sitio.",
        faq: [
            {
                question: "¿Los desarrolladores deben saber SEO?",
                answer: "Sí para sitios de contenido, blogs y e-commerce. Es parte de un producto de calidad.",
            },
        ],
    },
};
