import type { BlogTopicPatch } from "./types";

export const CORE_TOPIC_PATCHES_ZH: Record<string, BlogTopicPatch> = {
    "css-flexbox-complete-guide": {
        title: "CSS Flexbox 完整指南 — 对齐、分布与布局",
        seoTitle: "CSS Flexbox 完整教程 — 开发者指南",
        description:
            "掌握 CSS Flexbox：flex-direction、justify-content、align-items、gap 与换行。无需 float 技巧即可搭建导航栏、卡片行与居中布局。",
        focusKeyword: "CSS Flexbox",
        keywords: ["CSS Flexbox", "Flexbox 教程", "学习 Flexbox", "弹性布局", "CSS 布局教程"],
        readTime: "10 分钟阅读",
        headings: {
            intro: "CSS Flexbox 布局详解",
            concepts: "Flexbox 核心概念",
            steps: "分步使用 Flexbox",
            code: "Flexbox 代码示例",
            practice: "用免费课程练习 Flexbox",
            faq: "CSS Flexbox — 常见问题",
        },
        intro:
            "Flexbox 是一维布局系统 — 适合导航栏、工具栏、卡片行和垂直居中。它已取代大多数 UI 场景中的 float 技巧。",
        whyItMatters: "Flexbox 是现代 CSS 组件级布局的默认工具 — 导航栏、工具栏和卡片行都依赖它。",
        deepDive: "先掌握父级的 justify-content 与 align-items，再用子项的 flex-grow — 这覆盖约 90% 的实际 Flexbox 用法。",
        concepts: [
            "在父容器设置 display: flex",
            "flex-direction: row | column",
            "justify-content — 主轴对齐",
            "align-items — 交叉轴对齐",
            "gap 替代 margin  hack",
            "flex: 1 让子项伸展",
        ],
        steps: [
            "在容器上设置 display:flex",
            "选择 row 或 column",
            "对齐与分布",
            "用 gap 控制间距",
            "用 flex:1 让元素增长",
        ],
        practice: "跟随 Sturdee 的 CSS 布局教程，用 Flexbox 重做导航栏。",
        faq: [
            {
                question: "Flexbox 还是 Grid？",
                answer: "一维布局（行或列）用 Flexbox；二维页面布局用 Grid。",
            },
        ],
    },
    "css-grid-layout-tutorial": {
        title: "CSS Grid 布局教程 — 模板、间距与区域",
        seoTitle: "CSS Grid 教程 — 响应式页面布局",
        description:
            "学习 CSS Grid：grid-template-columns、fr 单位、grid-template-areas，以及无需复杂媒体查询的响应式网格布局。",
        focusKeyword: "CSS Grid",
        keywords: ["CSS Grid", "Grid 布局教程", "学习 CSS Grid", "响应式网格", "二维布局"],
        readTime: "11 分钟阅读",
        headings: {
            intro: "用 CSS Grid 做页面布局",
            concepts: "CSS Grid 核心概念",
            steps: "分步构建 Grid",
            code: "Grid 代码示例",
            practice: "免费练习 CSS Grid",
            faq: "CSS Grid — 常见问题",
        },
        intro:
            "CSS Grid 处理二维布局 — 整页结构、仪表盘和图库。它是复杂 float 与定位布局的现代替代方案。",
        whyItMatters: "Grid 处理 Flexbox 难以胜任的二维布局 — 仪表盘、画廊和全页模板用 Grid 更快。",
        deepDive: "auto-fit 与 minmax() 可在不加媒体查询的情况下创建响应式列 — 每个响应式站点都该用的模式。",
        concepts: [
            "grid-template-columns: repeat(3, 1fr)",
            "gap 控制行列间距",
            "grid-template-areas 命名布局",
            "minmax() 自适应列宽",
            "grid-column / grid-row 跨格",
        ],
        practice: "用 Sturdee CSS 教程搭建响应式卡片网格。",
        faq: [
            {
                question: "可以同时用 Grid 和 Flexbox 吗？",
                answer: "可以。页面用 Grid，网格单元内部用 Flexbox 排组件细节。",
            },
        ],
    },
    "javascript-closures-explained": {
        title: "JavaScript 闭包详解 — 简明指南与示例",
        seoTitle: "JavaScript 闭包 — 清晰解释",
        description:
            "理解 JavaScript 闭包：词法作用域、内部函数，以及在 React、回调与模块中的实际用法。面向初学者的实战指南。",
        focusKeyword: "JavaScript 闭包",
        keywords: ["JavaScript 闭包", "闭包解释", "词法作用域", "闭包教程", "JavaScript 入门"],
        readTime: "9 分钟阅读",
        headings: {
            intro: "JavaScript 闭包 — 通俗解释",
            concepts: "闭包核心概念",
            steps: "分步练习闭包",
            code: "闭包代码示例",
            practice: "在 Sturdee 练习闭包",
            faq: "JavaScript 闭包 — 常见问题",
        },
        intro:
            "闭包指内部函数在外部函数执行完毕后仍能记住外部作用域的变量。闭包驱动回调、事件处理、React Hooks 与模块模式。",
        whyItMatters: "闭包出现在 React Hooks、防抖/节流与模块中 — 面试与生产代码都默认你理解它。",
        deepDive: "引用外部变量的内部函数会保持该外部作用域存活 — 这是开发者每天都在调试的闭包。",
        concepts: [
            "词法作用域 — 函数能看到定义处的作用域",
            "内部函数「关闭」外部变量",
            "用于 debounce、throttle 与工厂函数",
            "常见面试题",
            "let/const 块级作用域影响闭包",
        ],
        practice: "在 Sturdee JavaScript 教程学习函数与作用域，然后实现 debounce 工具。",
        faq: [
            {
                question: "闭包会造成内存泄漏吗？",
                answer: "只有在你不必要地持有引用时才会。闭包是特性，不是 bug。",
            },
        ],
    },
    "javascript-async-await-guide": {
        title: "JavaScript async/await — 初学者完整指南",
        seoTitle: "JavaScript async/await 入门指南",
        description:
            "掌握 JavaScript 的 async/await、Promise 与 fetch。用清晰可测的模式处理 API 调用、错误与并行请求。",
        focusKeyword: "JavaScript async await",
        keywords: ["JavaScript async await", "Promise 教程", "异步 JavaScript", "fetch 教程", "async 入门"],
        readTime: "10 分钟阅读",
        headings: {
            intro: "JavaScript 中的 async/await",
            concepts: "async/await 核心概念",
            steps: "分步使用 async/await",
            code: "async/await 示例",
            practice: "在 Sturdee 练习 async/await",
            faq: "async/await — 常见问题",
        },
        intro:
            "JavaScript 单线程但非阻塞。async/await 让你写出读起来像同步的异步代码 — 对 fetch、数据库与定时器必不可少。",
        whyItMatters: "现代 JavaScript 中每次 API、数据库与文件读取都是异步 — async/await 管理这种复杂度。",
        deepDive: "await 只能在 async 函数内使用；用 try/catch 包裹 await，因为被拒绝的 Promise 会变成可捕获错误。",
        concepts: [
            "Promise 表示未来的值",
            "async 函数始终返回 Promise",
            "await 暂停直到 Promise 完成",
            "try/catch 处理异步错误",
            "Promise.all 并行请求",
        ],
        practice: "完成 Sturdee 的 async/await 课程，用 fetch 做天气小应用。",
        faq: [
            {
                question: "async/await 和 .then() 哪个好？",
                answer: "底层都是 Promise。顺序逻辑用 async/await 更清晰。",
            },
        ],
    },
    "python-list-comprehensions-guide": {
        title: "Python 列表推导式 — 简洁的数据变换",
        seoTitle: "Python 列表推导式 — 语法与示例",
        description:
            "Python 列表推导式语法、示例，以及何时优于循环。含 dict 与 set 推导式，适合数据处理脚本入门。",
        focusKeyword: "Python 列表推导式",
        keywords: ["Python 列表推导式", "Python 推导式", "Python 列表", "Python 教程", "Python 入门"],
        readTime: "7 分钟阅读",
        headings: {
            intro: "Python 列表推导式语法",
            concepts: "推导式核心概念",
            steps: "把循环重构为推导式",
            code: "推导式代码示例",
            practice: "在 Sturdee 练习",
            faq: "列表推导式 — 常见问题",
        },
        intro: "列表推导式把「循环 + append」压缩成一行可读代码。它是 Python 惯用法，专业代码库中随处可见。",
        whyItMatters: "推导式是 Python 惯用法 — 在数据处理脚本中比手写循环更易读写。",
        deepDive: "[expr for x in iterable if condition] 替代三行循环 — pandas 邻近代码中常见的模式。",
        concepts: [
            "[expr for item in iterable]",
            "加 if 过滤",
            "嵌套推导式要克制",
            "dict 与 set 推导式",
            "可读性优先于炫技",
        ],
        practice: "在 Sturdee 学习列表与循环，然后把循环重构为推导式。",
        faq: [
            {
                question: "推导式更快吗？",
                answer: "通常比循环略快。主要收益是可读性。",
            },
        ],
    },
    "shopify-liquid-basics-guide": {
        title: "Shopify Liquid 基础 — 标签、对象与过滤器",
        seoTitle: "Shopify Liquid — 基础指南",
        description:
            "学习 Shopify Liquid 模板：输出标签、逻辑标签、product 与 collection 对象，以及 money、img_url 等过滤器，适合主题入门。",
        focusKeyword: "Shopify Liquid",
        keywords: ["Shopify Liquid", "学习 Liquid", "Liquid 模板", "Shopify 主题开发", "Liquid 教程"],
        readTime: "10 分钟阅读",
        headings: {
            intro: "Shopify Liquid 模板语言",
            concepts: "Liquid 核心概念",
            steps: "第一次修改 Liquid",
            code: "Liquid 示例",
            practice: "Sturdee 免费 Liquid 教程",
            faq: "Shopify Liquid — 常见问题",
        },
        intro:
            "Liquid 是 Shopify 主题模板语言。它将逻辑与 HTML 分离，让商家安全定制店铺而无需任意代码执行。",
        whyItMatters: "Liquid 是 Shopify 主题开发的入口 — 细分技能，自由职业需求强，竞争小于 React。",
        deepDive: "{{ }} 输出数据；{% %} 控制流程；product、collection 等对象承载店铺数据。",
        concepts: [
            "{{ }} 输出标签",
            "{% %} 逻辑标签",
            "对象：product、collection、cart",
            "过滤器：| money、| img_url",
            "布局文件 theme.liquid",
        ],
        practice: "完成 Sturdee 免费 Liquid 教程 — 线上最全面的免费路线之一。",
        faq: [
            {
                question: "Liquid 和 Twig 一样吗？",
                answer: "语法相近。Liquid 为 Shopify 定制，含电商对象。",
            },
        ],
    },
    "what-is-html-semantic-markup-guide": {
        title: "什么是 HTML 语义化标记 — 开发者完整指南",
        seoTitle: "HTML 语义化 — 开发者指南",
        description:
            "学习 HTML 语义元素 — header、nav、main、article、section — 提升无障碍、SEO 与可维护性，构建更专业的页面结构。",
        focusKeyword: "HTML 语义化",
        keywords: ["HTML 语义化", "语义化标记", "HTML5 元素", "无障碍 HTML", "HTML SEO"],
        readTime: "8 分钟阅读",
        headings: {
            intro: "什么是 HTML 语义化标记？",
            concepts: "语义化 HTML 核心概念",
            steps: "搭建语义化页面",
            code: "语义化页面骨架",
            mistakes: "常见语义错误",
            practice: "在 Sturdee 练习语义 HTML",
            faq: "HTML 语义化 — 常见问题",
        },
        intro:
            "语义化 HTML 使用描述含义而非仅外观的元素。<nav> 告诉浏览器与读屏软件「这是导航」。<div class='nav'> 不能。搜索引擎与辅助技术依赖语义理解页面结构。",
        whyItMatters: "Google 与读屏软件解析语义标签以理解结构 — 直接影响排名与无障碍分数。",
        deepDive: "用 <article>、<nav>、<main> 替代 div 汤，给爬虫明确信号区分导航与正文。",
        concepts: [
            "<header>、<nav>、<main>、<article>、<section>、<aside>、<footer>",
            "每页一个 <main> 承载主内容",
            "标题层级：单个 <h1>，嵌套 h2–h6",
            "地标角色改善读屏导航",
            "语义 HTML 支持 Google 富摘要",
        ],
        mistakes: [
            "什么都用 <div>",
            "跳级标题（h1 直接到 h4）",
            "多个 <main>",
            "信息图 alt 为空",
        ],
        practice: "完成 Sturdee 免费 HTML 教程 — 从元素与语义开始，再做一个语义化落地页。",
        faq: [
            {
                question: "语义 HTML 必须吗？",
                answer: "不强制，但可提升 SEO、无障碍与可读性 — 教育类站点的重要排名因素。",
            },
        ],
        code: { title: "语义化页面骨架" },
    },
    "html-seo-meta-tags-guide": {
        title: "SEO 用 HTML Meta 标签 — Title、Description 与 Open Graph",
        seoTitle: "HTML Meta 标签 SEO — 开发者指南",
        description:
            "开发者必备的 HTML meta 标签：title、description、canonical、robots、Open Graph 与 Twitter Cards，帮助页面正确索引与分享。",
        focusKeyword: "HTML meta 标签 SEO",
        keywords: ["meta 标签 SEO", "meta description", "Open Graph", "HTML SEO", "技术 SEO"],
        readTime: "7 分钟阅读",
        headings: {
            intro: "影响 Google 排名的 HTML Meta 标签",
            concepts: "Meta 标签核心概念",
            steps: "优化每页 head",
            code: "Meta 标签示例",
            practice: "在 Sturdee 审计 meta",
            faq: "Meta 标签 SEO — 常见问题",
        },
        intro:
            "Meta 标签位于 <head>，告诉搜索引擎如何索引与展示页面。有力的 title 与 description 直接影响 Google 点击率 — 往往比单纯升排名更重要。",
        whyItMatters: "Title 与 description 是搜索结果里的广告文案 — meta 优化带来 5% CTR 提升可能胜过排名跳跃。",
        deepDive: "每个 URL 需要唯一 title 与 description；重复 meta 是 Google 重写摘要的常见原因。",
        concepts: [
            "<title> — 50–60 字符，每页唯一",
            "<meta name='description'> — 150–160 字符",
            "<link rel='canonical'> 防重复内容",
            "og:title、og:description、og:image 社交分享",
            "需要时用 robots meta noindex",
        ],
        practice: "查看 Sturdee 教程页的 meta，再为自己的项目添加正确 head。",
        faq: [
            {
                question: "meta keywords 还有用吗？",
                answer: "Google 已忽略 meta keywords。专注 title、description 与优质内容。",
            },
        ],
    },
    "how-to-become-web-developer-2026": {
        title: "2026 如何成为 Web 开发者 — 分步路线",
        seoTitle: "2026 成为 Web 开发者 — 学习路线图",
        description:
            "成为 Web 开发者的现实路径：技能、作品集、时间线与免费资源（含 Sturdee 教程），适合认真入门的自学者与转行者。",
        focusKeyword: "成为 Web 开发者 2026",
        keywords: ["成为 Web 开发者", "Web 开发 2026", "转行程序员", "学 Web 开发", "开发者作品集"],
        readTime: "12 分钟阅读",
        headings: {
            intro: "2026 Web 开发者路线图",
            concepts: "Web 开发者核心技能",
            steps: "六个月计划",
            practice: "在 Sturdee 免费开始",
            faq: "成为 Web 开发者 — 常见问题",
        },
        intro:
            "Web 开发仍是门槛较低、收入可观的高价值技能。不必学位 — 需要持续练习、项目与能交付的证明。",
        whyItMatters: "Web 招聘依然强劲 — 但雇主要看作品集与基础，而非只看教程证书。",
        deepDive: "六个月 HTML → CSS → JavaScript → 一个框架 → 上线项目，胜过两年随机刷视频。",
        steps: [
            "第 1–2 月：在 Sturdee 学 HTML、CSS、JavaScript",
            "第 3 月：React 或 Next.js 项目",
            "第 4 月：后端 + 数据库",
            "第 5 月：作品集 + GitHub",
            "第 6 月：投递与面试",
        ],
        practice: "今天从 /tutorials/html 开始 — 免费、互动，课程无需注册。",
        faq: [
            {
                question: "多久能找到工作？",
                answer: "转行者在专注的业余学习下，通常 6–12 个月。",
            },
        ],
    },
    "seo-for-developers-guide": {
        title: "开发者 SEO 指南 — 技术 SEO 清单",
        seoTitle: "开发者技术 SEO 清单",
        description:
            "开发者可控的技术 SEO：站点地图、robots.txt、规范 URL、结构化数据与页面速度，让网站被正确抓取与索引。",
        focusKeyword: "开发者 SEO",
        keywords: ["开发者 SEO", "技术 SEO", "SEO 清单", "sitemap XML", "网站 SEO 开发"],
        readTime: "10 分钟阅读",
        headings: {
            intro: "开发者技术 SEO 清单",
            concepts: "技术 SEO 核心概念",
            steps: "审计技术 SEO",
            practice: "Sturdee SEO 资源",
            faq: "开发者 SEO — 常见问题",
        },
        intro:
            "开发者搭建 SEO 依赖的技术基础 — 可抓取 URL、快速页面、有效元数据与结构化数据。营销无法修复坏掉的技术 SEO。",
        whyItMatters: "开发者交付站点地图、canonical 与速度 — 上线后营销无法补救。",
        deepDive: "唯一 URL、每页有效 metadata、结构化数据与快速 TTFB — 这就是技术 SEO 基础。",
        concepts: [
            "提交 Search Console 的 XML 站点地图",
            "robots.txt 允许抓取",
            "每页唯一 title 与 meta description",
            "JSON-LD 结构化数据",
            "canonical URL 避免重复",
        ],
        practice: "阅读 Sturdee /resources SEO 指南并审计你站的 sitemap.xml。",
        faq: [
            {
                question: "开发者需要懂 SEO 吗？",
                answer: "内容站、博客与电商都需要。这是交付质量产品的一部分。",
            },
        ],
    },
};
