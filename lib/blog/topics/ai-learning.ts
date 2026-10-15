import type { BlogTopic } from "../types";

const D1 = "2026-09-01";
const D2 = "2026-09-08";
const D3 = "2026-09-15";
const D4 = "2026-09-22";
const D5 = "2026-09-29";
const D6 = "2026-10-01";
const D7 = "2026-10-05";
const D8 = "2026-10-08";
const D9 = "2026-10-10";
const D10 = "2026-10-12";
const D11 = "2026-10-13";
const D12 = "2026-10-14";
const D13 = "2026-10-15";

/**
 * SEO-focused AI learning articles targeting winnable long-tails:
 * learn AI free, prompt engineering, generative AI courses, learn to code with AI.
 */
export const AI_TOPICS: BlogTopic[] = [
    {
        slug: "learn-artificial-intelligence-free-beginners-guide",
        title: "Learn Artificial Intelligence Free — Beginner's Guide (2026)",
        seoTitle: "Learn Artificial Intelligence Free — Complete Beginner Guide",
        description:
            "Learn artificial intelligence free with a clear path: concepts, prompts, free courses, and practice. Start AI without a degree or paid bootcamp.",
        focusKeyword: "learn artificial intelligence free",
        keywords: [
            "learn artificial intelligence free",
            "learn AI free",
            "artificial intelligence for beginners",
            "free AI courses",
            "how to learn AI",
        ],
        category: "AI",
        readTime: "14 min read",
        publishedAt: D1,
        tutorialPath: "/learn/ai",
        headings: {
            intro: "Can You Learn Artificial Intelligence Free?",
            concepts: "What Beginners Should Learn First",
            steps: "A Free AI Learning Path (Week by Week)",
            practice: "Practice AI Skills on Sturdee",
            faq: "Learn AI Free — FAQ",
        },
        intro: "Yes — you can learn artificial intelligence free in 2026. You do not need a computer science degree to start. Begin with how models respond to instructions, then practice prompting, automation, and simple coding tutorials. Paid certificates and Pro AI tutors help later; free content gets you fluent first.",
        whyItMatters:
            "“Learn artificial intelligence” is a high-intent search. Most beginners bounce when courses dump math first. A free, practical path — prompts, tools, then light code — converts curiosity into real skill and ranks for long-tail queries like learn AI free and AI for beginners.",
        deepDive:
            "Treat AI learning like language learning: daily short practice beats weekend binge lectures. Use free tutorials for HTML/Python when you need tooling literacy, then apply AI to those tasks. Sturdee’s free AI skill paths and tutorials cover that loop; Sturdee Pro adds AI Tutor when you want guided practice.",
        concepts: [
            "Models predict tokens — clear instructions beat vague questions",
            "Prompt engineering is the fastest free skill to practice daily",
            "Automation & agents come after you can specify tasks reliably",
            "Light coding (Python/JS) unlocks APIs and evaluation",
            "Live cohorts add accountability once self-study stalls",
        ],
        steps: [
            "Week 1: Learn what LLMs can/can’t do; write 20 prompts with constraints",
            "Week 2: Study prompt patterns (roles, few-shot, structured output)",
            "Week 3: Pick one workflow (email, research, code review) and automate it",
            "Week 4: Follow a free coding tutorial track (Python or JavaScript)",
            "Week 5+: Join a live AI cohort or use AI Tutor for feedback loops",
        ],
        mistakes: [
            "Starting with heavy linear algebra before using tools",
            "Treating ChatGPT answers as facts without verification",
            "Skipping evaluation — never measuring prompt quality",
            "Buying expensive courses before exhausting free practice",
        ],
        practice:
            "Start at /learn/ai, browse free AI skill paths, and practice prompts daily. Pair with free coding tutorials when you need to read or run code.",
        faq: [
            {
                question: "Is learning AI free realistic in 2026?",
                answer:
                    "Yes. Free tutorials, open courses, and practice tools cover foundations. Certificates and 1:1 tutoring are optional upgrades.",
            },
            {
                question: "Do I need to know how to code first?",
                answer:
                    "No for prompting and AI literacy. Yes eventually if you want agents, APIs, or evaluation pipelines — start coding in parallel.",
            },
            {
                question: "How long until I’m job-ready?",
                answer:
                    "AI literacy can take weeks; applied AI roles usually need months of projects. Focus on a portfolio of workflows, not certificates alone.",
            },
        ],
    },
    {
        slug: "prompt-engineering-course-free-complete-tutorial",
        title: "Prompt Engineering Course Free — Complete Tutorial",
        seoTitle: "Prompt Engineering Course Free — Full Tutorial 2026",
        description:
            "Free prompt engineering course: roles, constraints, few-shot examples, chain-of-thought, and structured outputs. Practice with real prompts.",
        focusKeyword: "prompt engineering course free",
        keywords: [
            "prompt engineering course free",
            "prompt engineering tutorial",
            "learn prompt engineering",
            "prompt engineering for beginners",
            "ChatGPT prompt engineering",
        ],
        category: "AI",
        readTime: "16 min read",
        publishedAt: D2,
        tutorialPath: "/learn/prompt-engineering",
        headings: {
            intro: "What Is Prompt Engineering?",
            concepts: "Core Prompt Patterns",
            steps: "How to Practice Prompt Engineering Free",
            code: "Structured Prompt Template",
            practice: "Continue on Sturdee’s Prompt Path",
            faq: "Prompt Engineering Course — FAQ",
        },
        intro: "Prompt engineering is the craft of writing instructions that get reliable results from large language models. A free prompt engineering course should teach patterns you can reuse — not magic words. Master roles, constraints, examples, and output formats, then evaluate results.",
        whyItMatters:
            "Coursera and DeepLearning.AI own branded course searches; long-tails like prompt engineering course free and prompt engineering tutorial still reward practical guides with examples and FAQs.",
        deepDive:
            "Good prompts specify audience, goal, constraints, and format. Bad prompts ask “write something about X.” Treat every prompt like a mini product spec. Then measure: did the model follow format? Was the answer accurate? Iterate.",
        concepts: [
            "Role + task + constraints + format",
            "Few-shot examples beat abstract instructions",
            "Chain-of-thought for reasoning tasks (when helpful)",
            "Structured outputs (JSON, tables, checklists) for tools",
            "Evaluation: rubrics, spot checks, and regression prompts",
        ],
        steps: [
            "Write a baseline prompt for a real task you do weekly",
            "Add a role and success criteria",
            "Add 2–3 few-shot examples of good outputs",
            "Force a structured format (bullets or JSON)",
            "Save a regression set of 10 prompts and retest after changes",
        ],
        code: {
            lang: "text",
            title: "Reusable prompt skeleton",
            body: `You are a {role}.\nTask: {goal}\nAudience: {who}\nConstraints: {limits}\nFormat: {structure}\n\nExamples:\nInput: ...\nOutput: ...\n\nNow complete the task for:\n{user_input}`,
        },
        mistakes: [
            "One giant vague prompt with no format",
            "No examples when the task is stylistic",
            "Accepting the first answer without checks",
            "Overusing chain-of-thought for simple lookups",
        ],
        practice:
            "Open the Prompt Engineering skill path and /learn/prompt-engineering. Use Practice Coach on Pro when you want graded drills.",
        faq: [
            {
                question: "Is this prompt engineering course really free?",
                answer:
                    "The Sturdee skill path and this tutorial are free to read. AI-powered practice drills require Sturdee Pro.",
            },
            {
                question: "Does prompt engineering still matter with better models?",
                answer:
                    "Yes. Clearer instructions still reduce errors, control tone, and produce structured outputs for workflows.",
            },
            {
                question: "How is this different from ChatGPT tips lists?",
                answer:
                    "Tips are one-offs. A course teaches reusable patterns, evaluation, and iteration — skills that transfer across models.",
            },
        ],
    },
    {
        slug: "free-generative-ai-courses-with-certificates-2026",
        title: "Free Generative AI Courses (With Certificate Options) 2026",
        seoTitle: "Free Generative AI Courses 2026 — Certificates Compared",
        description:
            "Compare free generative AI courses in 2026: fully free, free to audit, and paid certificates. Build a practical GenAI learning path.",
        focusKeyword: "free generative AI courses",
        keywords: [
            "free generative AI courses",
            "free AI courses with certificates",
            "generative AI course free",
            "best free AI courses 2026",
            "GenAI for beginners",
        ],
        category: "AI",
        readTime: "12 min read",
        publishedAt: D3,
        tutorialPath: "/learn/ai",
        headings: {
            intro: "What “Free” Means for Generative AI Courses",
            concepts: "Types of Free GenAI Learning",
            steps: "How to Choose a Free Generative AI Path",
            practice: "Learn GenAI Free on Sturdee",
            faq: "Free Generative AI Courses — FAQ",
        },
        intro: "Searchers looking for free generative AI courses often get paywalled certificates. In 2026, “free” usually means one of three things: fully free learning + cert, free to audit (pay for cert), or free trial only. Know which you need before you enroll.",
        whyItMatters:
            "This query has strong commercial intent. Ranking requires honest comparisons and a clear free path readers can start today — then optional Pro tutoring.",
        deepDive:
            "If you need a shareable certificate, prioritize providers that include free completion badges. If you need skills, prioritize practice volume: prompts, projects, and feedback. Sturdee focuses on skills first with free tutorials and AI paths.",
        concepts: [
            "Fully free learning + free certificate",
            "Free audit / paid certificate (common on Coursera)",
            "Vendor badges (Google, Microsoft, AWS) for credibility",
            "Project portfolios beat certs for many hiring managers",
            "Pair GenAI theory with daily prompt practice",
        ],
        steps: [
            "Decide: skills-only vs certificate required",
            "Start a free GenAI intro (concepts + prompting)",
            "Complete one applied project (research assistant, code helper, content workflow)",
            "Document prompts and results in a public write-up",
            "Optionally add a free/paid certificate after the project",
        ],
        practice:
            "Use /learn/ai and free tutorials to build GenAI literacy, then register for a live cohort if you want accountability.",
        faq: [
            {
                question: "Are free generative AI courses worth it?",
                answer:
                    "Yes for foundations. Pair them with projects so you can show applied skill, not just course completion.",
            },
            {
                question: "Do employers care about AI certificates?",
                answer:
                    "Sometimes. Many care more about demos: automated workflows, evaluated prompts, and shipped tools.",
            },
        ],
    },
    {
        slug: "learn-to-code-with-ai-beginners-guide",
        title: "Learn to Code with AI — Beginner’s Guide",
        seoTitle: "Learn to Code with AI — Free Beginner Guide 2026",
        description:
            "Learn to code with AI without outsourcing thinking. Use AI tutors for explanations while you practice HTML, JavaScript, and Python for free.",
        focusKeyword: "learn to code with AI",
        keywords: [
            "learn to code with AI",
            "AI coding tutor",
            "learn programming with ChatGPT",
            "AI pair programming beginners",
            "code with AI free",
        ],
        category: "AI",
        readTime: "13 min read",
        publishedAt: D4,
        tutorialPath: "/learn/coding-free",
        headings: {
            intro: "Should Beginners Learn to Code with AI?",
            concepts: "Healthy AI + Coding Habits",
            steps: "A Free Learn-to-Code-with-AI Routine",
            mistakes: "AI Coding Mistakes That Stall Progress",
            practice: "Free Coding Tutorials + AI Tutor",
            faq: "Learn to Code with AI — FAQ",
        },
        intro: "Learning to code with AI works when AI explains and reviews — not when it writes everything for you. Use free interactive tutorials for deliberate practice, then ask an AI tutor why something failed. That combination beats either pure AI dumping or staring at docs alone.",
        whyItMatters:
            "“Learn to code with AI” sits between coding education and AI tools. Articles that teach process (read error → hypothesize → ask AI → re-implement) outperform generic ChatGPT tip lists.",
        deepDive:
            "Rule of thumb: if you cannot explain the code line-by-line after AI helps, rewrite it yourself. Keep a “bugs journal” of errors you fixed. Sturdee’s free tutorials plus optional AI Tutor are built for that loop.",
        concepts: [
            "AI for explanation and rubber-ducking",
            "You still type and run the code",
            "Ask for hints before full solutions",
            "Verify AI code against docs and tests",
            "Build small projects weekly without AI first drafts",
        ],
        steps: [
            "Pick one free track (HTML/CSS or Python)",
            "Complete a lesson without AI first",
            "Use AI only when stuck for 15+ minutes",
            "Ask AI to quiz you on what you learned",
            "Ship a tiny project (page, script, or API call)",
        ],
        mistakes: [
            "Copy-pasting AI code you don’t understand",
            "Skipping fundamentals (variables, control flow, DOM)",
            "Never reading error messages",
            "Asking for full apps before learning syntax",
        ],
        practice:
            "Start free tutorials at /tutorials, then use /ai (Pro) when you want an AI coding tutor on demand.",
        faq: [
            {
                question: "Will AI replace learning to code?",
                answer:
                    "No. AI accelerates people who can specify, debug, and evaluate. Those skills still require practice.",
            },
            {
                question: "What’s the best language to learn with AI first?",
                answer:
                    "JavaScript or Python. Both have huge free tutorial coverage and pair well with AI explanations.",
            },
        ],
    },
    {
        slug: "how-to-write-better-chatgpt-prompts-examples",
        title: "How to Write Better ChatGPT Prompts (With Examples)",
        seoTitle: "Better ChatGPT Prompts — Examples & Templates",
        description:
            "Write better ChatGPT prompts with examples: roles, constraints, formats, and iteration. Copy templates for coding, writing, and study.",
        focusKeyword: "better ChatGPT prompts",
        keywords: [
            "better ChatGPT prompts",
            "ChatGPT prompt examples",
            "how to write ChatGPT prompts",
            "ChatGPT prompts for beginners",
            "prompt templates",
        ],
        category: "AI",
        readTime: "11 min read",
        publishedAt: D5,
        tutorialPath: "/skills/prompt-engineering",
        headings: {
            intro: "Why Most ChatGPT Prompts Fail",
            concepts: "Elements of a Strong Prompt",
            code: "Prompt Examples You Can Copy",
            steps: "Iterate Prompts Like a Pro",
            practice: "Practice Prompting on Sturdee",
            faq: "ChatGPT Prompts — FAQ",
        },
        intro: "Better ChatGPT prompts are specific. They name the role, audience, constraints, and output format. Vague prompts produce vague answers — then people blame the model.",
        whyItMatters:
            "High search volume sits on ChatGPT how-tos. Fresh examples and templates earn clicks and support prompt-engineering hub pages.",
        deepDive:
            "Iterate in public: keep version 1, version 2, and the final prompt. Note what changed. That habit transfers to every model — Claude, Gemini, local LLMs — not just ChatGPT.",
        concepts: [
            "Specificity beats clever wording",
            "Constraints reduce hallucinations",
            "Examples lock style and structure",
            "Ask for assumptions when data is missing",
            "Request citations or sources when factual",
        ],
        code: {
            lang: "text",
            title: "Study & coding prompt examples",
            body: `Study:\n"Explain closures in JavaScript to a beginner. Use one analogy, one code sample, then 3 quiz questions with answers."\n\nCoding:\n"You are a senior reviewer. Find bugs in this function. List severity, why it fails, and a minimal fix. Code:\n{paste}"`,
        },
        steps: [
            "State the goal in one sentence",
            "Add audience + constraints",
            "Show one good example output",
            "Run, critique, tighten the prompt",
            "Save the winner in a prompt library",
        ],
        practice:
            "Practice on the Prompt Engineering skill page. Upgrade to Pro for AI Tutor critique of your prompts.",
        faq: [
            {
                question: "How long should a ChatGPT prompt be?",
                answer:
                    "Long enough to specify success. Many great prompts are 80–200 words with clear structure — not novels.",
            },
            {
                question: "Should I use custom GPTs or just prompts?",
                answer:
                    "Start with reusable prompts. Custom GPTs help when you repeat the same system instructions often.",
            },
        ],
    },
    {
        slug: "ai-agents-explained-for-beginners-practical-guide",
        title: "AI Agents Explained for Beginners — Practical Guide",
        seoTitle: "AI Agents Explained for Beginners — Practical Guide",
        description:
            "AI agents explained simply: tools, planning, memory, and loops. Learn when agents help — and when a single prompt is enough.",
        focusKeyword: "AI agents explained",
        keywords: [
            "AI agents explained",
            "what are AI agents",
            "AI agents for beginners",
            "autonomous AI agents",
            "learn AI agents",
        ],
        category: "AI",
        readTime: "12 min read",
        publishedAt: D6,
        tutorialPath: "/skills",
        headings: {
            intro: "What Are AI Agents?",
            concepts: "Building Blocks of an Agent",
            steps: "Build a Tiny Agent Workflow",
            mistakes: "Agent Pitfalls for Beginners",
            practice: "Learn Agents on Sturdee",
            faq: "AI Agents — FAQ",
        },
        intro: "AI agents are systems that use a model to plan steps, call tools, and loop until a goal is met. Unlike a single ChatGPT reply, an agent can search, write files, or call APIs between thoughts.",
        whyItMatters:
            "Agent hype outpaces understanding. Beginner guides that define tools, planning, and failure modes rank for AI agents explained and support Sturdee’s agents skill path.",
        deepDive:
            "Start with a single-tool agent (web search or calculator) before multi-agent swarms. Most business value is a reliable loop with logging — not maximum autonomy.",
        concepts: [
            "Goal → plan → tool call → observe → repeat",
            "Tools are functions the model can invoke",
            "Memory stores intermediate results",
            "Guards: max steps, allowlists, human approval",
            "Evaluation: task success rate, not vibes",
        ],
        steps: [
            "Pick a narrow goal (e.g., summarize 3 URLs)",
            "Give the model one tool",
            "Cap steps at 5",
            "Log every tool call",
            "Add human approval before side effects",
        ],
        mistakes: [
            "Unlimited autonomy on production data",
            "No logging or replay",
            "Too many tools → confused planning",
            "Skipping a plain prompt that already works",
        ],
        practice:
            "Explore AI skill paths on Sturdee, then practice specifying agent goals with clear constraints in AI Tutor.",
        faq: [
            {
                question: "Are AI agents the same as chatbots?",
                answer:
                    "No. Chatbots reply once (or turn-by-turn). Agents plan and use tools to complete multi-step goals.",
            },
            {
                question: "Do I need to code to use agents?",
                answer:
                    "No-code agent builders exist, but light coding helps you understand tools, auth, and evaluation.",
            },
        ],
    },
    {
        slug: "ai-automation-for-beginners-workflows-guide",
        title: "AI Automation for Beginners — Practical Workflows",
        seoTitle: "AI Automation for Beginners — Workflows Guide",
        description:
            "Learn AI automation for beginners: pick a repetitive task, design prompts, connect tools, and measure time saved with simple workflows.",
        focusKeyword: "AI automation for beginners",
        keywords: [
            "AI automation for beginners",
            "AI automation workflows",
            "automate work with AI",
            "AI productivity workflows",
            "learn AI automation",
        ],
        category: "AI",
        readTime: "11 min read",
        publishedAt: D7,
        tutorialPath: "/skills",
        headings: {
            intro: "What Is AI Automation?",
            concepts: "Workflow Building Blocks",
            steps: "Automate Your First Task This Week",
            practice: "AI Automation Practice Path",
            faq: "AI Automation — FAQ",
        },
        intro: "AI automation means using models inside repeatable workflows — not one-off chats. Beginners should automate annoying, frequent tasks: summaries, first drafts, triage, and research packs.",
        whyItMatters:
            "Automation keywords convert learners into skill-path users and cohorts. Practical weekly workflows outperform abstract “future of work” essays.",
        deepDive:
            "Map a task as Input → Transform → Output → Review. AI handles Transform; you own Review until quality is proven. Then increase automation carefully.",
        concepts: [
            "Triggers (schedule, form, inbox)",
            "Prompt templates with variables",
            "Human review checkpoints",
            "Metrics: time saved, error rate",
            "Security: never paste secrets into public models",
        ],
        steps: [
            "List 5 tasks you repeat weekly",
            "Pick the most template-like task",
            "Write a prompt with clear output format",
            "Run it 10 times; note failure modes",
            "Add a checklist review before sending anywhere",
        ],
        practice:
            "Browse AI Automation skill topics on Sturdee and practice prompt templates with AI Tutor on Pro.",
        faq: [
            {
                question: "What tools do beginners need for AI automation?",
                answer:
                    "Start with ChatGPT/Claude plus spreadsheets. Add Zapier/Make or scripts only after the prompt is reliable.",
            },
            {
                question: "Is AI automation safe for work data?",
                answer:
                    "Follow your company policy. Prefer enterprise plans and redact personal data when using consumer tools.",
            },
        ],
    },
    {
        slug: "best-free-ai-tutorials-for-beginners-2026",
        title: "Best Free AI Tutorials for Beginners (2026)",
        seoTitle: "Best Free AI Tutorials for Beginners — 2026 Guide",
        description:
            "Best free AI tutorials for beginners in 2026: prompting, GenAI basics, coding with AI, and where to practice without paying first.",
        focusKeyword: "free AI tutorials for beginners",
        keywords: [
            "free AI tutorials for beginners",
            "best free AI tutorials",
            "AI tutorials free",
            "beginner AI lessons",
            "learn AI online free",
        ],
        category: "AI",
        readTime: "10 min read",
        publishedAt: D8,
        tutorialPath: "/learn/ai",
        headings: {
            intro: "How We Picked Free AI Tutorials",
            concepts: "What Beginners Should Study",
            steps: "Your Free AI Tutorial Stack",
            practice: "Start Free on Sturdee",
            faq: "Free AI Tutorials — FAQ",
        },
        intro: "The best free AI tutorials for beginners teach by doing: short lessons, examples, and practice — not 40-hour theory dumps. Prioritize prompting, GenAI literacy, then light coding.",
        whyItMatters:
            "Listicles rank for “best free” queries. Earn trust with criteria and a clear Sturdee starting path instead of empty affiliate spam.",
        deepDive:
            "Criteria: free to start, updated for 2026 models, practice exercises, and no dark-pattern “free trials.” Sturdee tutorials and /learn hubs meet those bars.",
        concepts: [
            "Prompt engineering tutorials",
            "GenAI concept explainers",
            "Coding tracks paired with AI help",
            "Agent/automation intros after basics",
            "Community or cohort for accountability",
        ],
        steps: [
            "Finish one prompt engineering tutorial",
            "Complete a free GenAI overview",
            "Do 5 coding lessons with AI as a coach",
            "Ship one tiny automated workflow",
            "Optionally join a live AI cohort",
        ],
        practice:
            "Start at /learn/ai, then /tutorials for coding foundations. Use /blog for deeper guides like this one.",
        faq: [
            {
                question: "Are YouTube AI tutorials enough?",
                answer:
                    "They’re great for overview. Pair them with hands-on practice so you retain skills.",
            },
            {
                question: "Should I pay for AI courses as a beginner?",
                answer:
                    "Not first. Exhaust free tutorials and build projects; pay later for structure, certificates, or tutoring.",
            },
        ],
    },
    {
        slug: "what-is-an-ai-tutor-and-how-it-helps-learning",
        title: "What Is an AI Tutor? How It Helps You Learn Faster",
        seoTitle: "What Is an AI Tutor? Benefits & How to Use One",
        description:
            "What is an AI tutor? Learn how AI tutoring works, when it beats videos, and how to combine AI tutors with free tutorials and human cohorts.",
        focusKeyword: "what is an AI tutor",
        keywords: [
            "what is an AI tutor",
            "AI tutor",
            "AI tutoring for students",
            "learn with AI tutor",
            "AI learning tutor",
        ],
        category: "AI",
        readTime: "9 min read",
        publishedAt: D9,
        tutorialPath: "/ai",
        headings: {
            intro: "What Is an AI Tutor?",
            concepts: "What AI Tutors Do Well",
            steps: "How to Study with an AI Tutor",
            practice: "Try Sturdee AI Tutor",
            faq: "AI Tutor — FAQ",
        },
        intro: "An AI tutor is a chat-based teaching assistant that explains concepts, quizzes you, and adapts to your questions 24/7. It won’t replace great human teachers — but it fills the gap between videos and live classes.",
        whyItMatters:
            "Supports /ai and Pro conversion while ranking for AI tutor informational queries.",
        deepDive:
            "Effective use: ask for explanations at your level, request quizzes, and demand step-by-step reasoning. Ineffective use: “do my homework” with no engagement.",
        concepts: [
            "Socratic hints vs full answers",
            "Spaced practice quizzes",
            "Context from your current lesson",
            "Limits: hallucinations and outdated facts",
            "Human tutors for accountability and nuance",
        ],
        steps: [
            "Study a free lesson first",
            "Ask the AI tutor to explain weak spots",
            "Request a 5-question quiz",
            "Retry missed questions next day",
            "Join a live cohort for projects",
        ],
        practice:
            "Open /ai for Sturdee AI Tutor (Pro). Free users can still learn via tutorials and skill paths.",
        faq: [
            {
                question: "Is an AI tutor accurate enough?",
                answer:
                    "For many coding and prompting topics, yes — but verify critical facts. Use it for practice and explanation, not sole authority.",
            },
            {
                question: "AI tutor vs human tutor?",
                answer:
                    "AI is always-on and cheap at scale. Humans excel at motivation, career advice, and complex project feedback.",
            },
        ],
    },
    {
        slug: "python-for-ai-beginners-free-learning-path",
        title: "Python for AI Beginners — Free Learning Path",
        seoTitle: "Python for AI Beginners — Free Path 2026",
        description:
            "Python for AI beginners: a free path from basics to prompts and simple scripts. Learn only the Python you need for AI work.",
        focusKeyword: "Python for AI beginners",
        keywords: [
            "Python for AI beginners",
            "learn Python for AI free",
            "Python AI tutorial beginners",
            "Python for machine learning start",
            "AI Python basics",
        ],
        category: "AI",
        readTime: "12 min read",
        publishedAt: D10,
        tutorialPath: "/tutorials/python",
        headings: {
            intro: "How Much Python Do You Need for AI?",
            concepts: "Python Basics That Matter for AI",
            steps: "Free Python → AI Path",
            code: "Tiny Python Script for Prompt Practice",
            practice: "Free Python Tutorials on Sturdee",
            faq: "Python for AI — FAQ",
        },
        intro: "You don’t need all of Python to start AI. Focus on variables, functions, lists/dicts, files, and HTTP requests. That covers prompting scripts, simple evaluations, and API calls.",
        whyItMatters:
            "Bridges coding tutorials and AI hubs — strong internal-link glue for Python + AI keywords.",
        deepDive:
            "Skip deep OOP and algorithms at first. Add NumPy/pandas only when a project requires them. Many GenAI roles are prompt + API + light Python.",
        concepts: [
            "Functions and arguments",
            "JSON dicts for structured data",
            "Reading env vars for API keys",
            "Simple loops for evaluation sets",
            "Virtual environments for dependencies",
        ],
        steps: [
            "Complete beginner Python tutorials (syntax)",
            "Write a script that formats a prompt template",
            "Call a model API with one request",
            "Loop 10 test inputs and save outputs",
            "Score outputs with a simple rubric",
        ],
        code: {
            lang: "python",
            title: "Prompt template filler",
            body: `def fill_prompt(role: str, task: str, user_input: str) -> str:\n    return (\n        f"You are {role}.\\n"\n        f"Task: {task}\\n"\n        f"User input:\\n{user_input}\\n"\n    )\n\nprint(fill_prompt("a patient tutor", "Explain recursion simply", "What is recursion?"))`,
        },
        practice:
            "Follow /tutorials/python, then apply skills in AI paths. Use AI Tutor when debugging scripts (Pro).",
        faq: [
            {
                question: "Python or JavaScript for AI beginners?",
                answer:
                    "Python is the default for AI/ML. JavaScript is fine if you already build for the web — many AI apps are full-stack JS.",
            },
            {
                question: "Do I need machine learning math first?",
                answer:
                    "Not for GenAI app building. Learn math later if you train models or research.",
            },
        ],
    },
    {
        slug: "web-development-with-ai-free-guide",
        title: "Web Development with AI — Free Guide for Beginners",
        seoTitle: "Web Development with AI — Free Beginner Guide",
        description:
            "Learn web development with AI: HTML, CSS, and JavaScript fundamentals plus AI-assisted debugging, without skipping the basics.",
        focusKeyword: "web development with AI",
        keywords: [
            "web development with AI",
            "learn web development free",
            "AI for web developers",
            "build websites with AI",
            "HTML CSS JavaScript AI",
        ],
        category: "AI",
        readTime: "11 min read",
        publishedAt: D11,
        tutorialPath: "/learn/web-development",
        headings: {
            intro: "Learning Web Dev in the AI Era",
            concepts: "What Still Matters in Web Development",
            steps: "Free Web Dev + AI Study Plan",
            practice: "Web Dev Paths on Sturdee",
            faq: "Web Development with AI — FAQ",
        },
        intro: "Web development with AI means shipping faster — not skipping HTML, CSS, and JavaScript. AI helps generate boilerplate and explain bugs; you still need to read the DOM, understand layout, and verify accessibility.",
        whyItMatters:
            "Connects /learn/web-development and coding free hubs to AI content for topical authority.",
        deepDive:
            "Use AI to review accessibility, suggest semantic HTML, and explain CSS bugs. Always test in the browser. Keyboard and screen-reader checks still need humans.",
        concepts: [
            "Semantic HTML first",
            "CSS layout (Flexbox/Grid) literacy",
            "JavaScript events and fetch",
            "AI for refactors and tests",
            "Performance and a11y as non-negotiables",
        ],
        steps: [
            "Finish HTML + CSS free tutorials",
            "Build a static landing page by hand",
            "Ask AI to review semantics and a11y",
            "Add JavaScript interactivity",
            "Use AI to write tests, not the whole app",
        ],
        practice:
            "Use /learn/web-development, /tutorials/html, and the Web Dev with AI skill path.",
        faq: [
            {
                question: "Can AI build my whole website?",
                answer:
                    "It can draft one. Maintaining, securing, and making it accessible still requires web fundamentals.",
            },
            {
                question: "Should beginners use AI website builders?",
                answer:
                    "Fine for prototypes. If you want a web career, learn HTML/CSS/JS alongside any builder.",
            },
        ],
    },
    {
        slug: "rag-explained-for-beginners-simple-guide",
        title: "RAG Explained for Beginners — Simple Guide",
        seoTitle: "RAG Explained for Beginners — Retrieval Augmented Generation",
        description:
            "RAG explained simply: retrieval-augmented generation lets AI answer with your docs. Learn the pipeline, use cases, and beginner pitfalls.",
        focusKeyword: "RAG explained for beginners",
        keywords: [
            "RAG explained for beginners",
            "what is RAG AI",
            "retrieval augmented generation",
            "RAG tutorial beginners",
            "AI with your documents",
        ],
        category: "AI",
        readTime: "10 min read",
        publishedAt: D12,
        tutorialPath: "/learn/ai",
        headings: {
            intro: "What Is RAG?",
            concepts: "RAG Pipeline in Plain English",
            steps: "When to Use RAG vs a Bigger Prompt",
            mistakes: "Common RAG Mistakes",
            practice: "Learn Applied AI Next",
            faq: "RAG — FAQ",
        },
        intro: "RAG (retrieval-augmented generation) means: search your documents first, then ask the model to answer using those snippets. It reduces hallucinations for company knowledge, docs, and policies.",
        whyItMatters:
            "RAG is a mid-funnel AI keyword. Clear beginner explainers build topical depth for the AI cluster.",
        deepDive:
            "Beginners overbuild vector databases. Often a good search + top-k snippets + strict “cite sources” prompt is enough to learn the pattern.",
        concepts: [
            "Chunk documents into passages",
            "Embed or keyword-search for relevance",
            "Stuff top chunks into the prompt",
            "Require citations to chunk IDs",
            "Evaluate with question sets from real users",
        ],
        steps: [
            "Collect 10 FAQs you want answered",
            "Split your docs into small sections",
            "Retrieve the top 3 sections per question",
            "Prompt: answer only from sections; say if missing",
            "Measure accuracy before adding fancy infra",
        ],
        mistakes: [
            "Chunks too large or too small",
            "No citation requirement",
            "Trusting retrieval without testing queries",
            "Building agents before RAG quality is good",
        ],
        practice:
            "After this guide, study prompt engineering and AI automation paths — RAG is prompts + retrieval discipline.",
        faq: [
            {
                question: "Is RAG the same as fine-tuning?",
                answer:
                    "No. Fine-tuning changes model weights. RAG keeps the model fixed and feeds relevant documents at ask-time.",
            },
            {
                question: "Do I need a vector database to learn RAG?",
                answer:
                    "Not at first. Keyword search teaching the habit of retrieve-then-generate is enough to understand RAG.",
            },
        ],
    },
    {
        slug: "how-to-learn-ai-without-a-computer-science-degree",
        title: "How to Learn AI Without a Computer Science Degree",
        seoTitle: "Learn AI Without a CS Degree — Practical Roadmap",
        description:
            "Learn AI without a computer science degree: a practical roadmap of free resources, projects, prompts, and light coding for career changers.",
        focusKeyword: "learn AI without a degree",
        keywords: [
            "learn AI without a degree",
            "AI career change",
            "learn AI no experience",
            "AI for non-technical beginners",
            "self taught AI",
        ],
        category: "AI",
        readTime: "13 min read",
        publishedAt: D13,
        tutorialPath: "/learn/ai",
        headings: {
            intro: "You Don’t Need a CS Degree to Start AI",
            concepts: "Skills That Replace Credential Theater",
            steps: "12-Week Self-Taught AI Roadmap",
            practice: "Free Sturdee Paths for Career Changers",
            faq: "Learn AI Without a Degree — FAQ",
        },
        intro: "Plenty of AI practitioners are self-taught. Employers increasingly ask for demos: automated workflows, evaluated prompts, small apps. A degree helps for research roles; it is not required to start learning AI or shipping GenAI tools.",
        whyItMatters:
            "Career-intent long-tails convert well and support authority across the AI blog cluster.",
        deepDive:
            "Position yourself as “AI-enabled specialist” in a domain you know (marketing, ops, support, education) while you build technical depth. Domain + AI often beats junior-generalist AI résumés.",
        concepts: [
            "Portfolio > pedigree for many applied roles",
            "Domain expertise + AI leverage",
            "Public write-ups of workflows",
            "Light Python/JS literacy",
            "Networking via shipping in public",
        ],
        steps: [
            "Weeks 1–2: AI literacy + prompt engineering daily",
            "Weeks 3–4: Free coding tutorials (Python or JS)",
            "Weeks 5–6: Automate one workflow at work/home",
            "Weeks 7–8: Build a tiny RAG or research assistant",
            "Weeks 9–12: Publish case studies; join a live cohort",
        ],
        practice:
            "Follow /learn/ai, free tutorials, and skill registration. Add Pro AI Tutor when you want faster feedback.",
        faq: [
            {
                question: "Can I get an AI job without a degree?",
                answer:
                    "Yes for many applied roles — especially if you show projects. Research/MLE roles more often expect formal depth.",
            },
            {
                question: "What should I put in an AI portfolio?",
                answer:
                    "Before/after workflows, prompt libraries, evaluation notes, and a small app with a clear README.",
            },
            {
                question: "Where do I start today?",
                answer:
                    "Read Sturdee’s learn AI hub, complete one prompt tutorial, and schedule 45 minutes of daily practice.",
            },
        ],
    },
    {
        slug: "shopify-liquid-tutorial-for-beginners-free-guide",
        title: "Shopify Liquid Tutorial for Beginners — Free Guide",
        seoTitle: "Shopify Liquid Tutorial for Beginners — Free Guide",
        description:
            "Shopify Liquid tutorial for beginners: tags, objects, and filters with free practice. Learn theme basics without drowning in jargon.",
        focusKeyword: "Shopify Liquid tutorial for beginners",
        keywords: [
            "Shopify Liquid tutorial for beginners",
            "learn Shopify Liquid free",
            "Liquid template tutorial",
            "Shopify theme development beginners",
            "Shopify Liquid guide",
        ],
        category: "Shopify",
        readTime: "12 min read",
        publishedAt: D8,
        tutorialPath: "/tutorials/liquid",
        headings: {
            intro: "What Is Shopify Liquid?",
            concepts: "Liquid Building Blocks",
            steps: "Your First Liquid Edits",
            practice: "Free Liquid Tutorials on Sturdee",
            faq: "Shopify Liquid — FAQ",
        },
        intro: "Shopify Liquid is the templating language themes use to show products, carts, and collections. A beginner Liquid tutorial should start with objects, tags, and filters — then small, safe theme edits.",
        whyItMatters:
            "Shopify Liquid is a Sturdee strength keyword with lower competition than generic web dev head terms.",
        deepDive:
            "Practice in a development theme. Never edit production first. Learn to read {{ product.title }} before writing complex snippets.",
        concepts: [
            "Objects: product, collection, cart",
            "Tags: if, for, case",
            "Filters: money, escape, date",
            "Sections and snippets",
            "JSON templates in modern themes",
        ],
        steps: [
            "Duplicate your theme",
            "Find a product template",
            "Print a safe object property",
            "Add a simple if tag",
            "Use a filter and preview",
        ],
        practice:
            "Complete the free Shopify Liquid tutorial track on Sturdee, then read related Shopify blog posts.",
        faq: [
            {
                question: "Is Liquid hard for beginners?",
                answer:
                    "The basics are approachable if you already know HTML. Logic tags feel like simplified programming.",
            },
            {
                question: "Do I need Ruby or JavaScript first?",
                answer:
                    "HTML/CSS first. JavaScript helps for theme interactivity; Ruby is not required for Liquid theme work.",
            },
        ],
    },
    {
        slug: "javascript-tutorial-for-beginners-free-interactive",
        title: "JavaScript Tutorial for Beginners — Free & Interactive",
        seoTitle: "JavaScript Tutorial for Beginners — Free Interactive Path",
        description:
            "JavaScript tutorial for beginners: free interactive lessons covering variables, functions, DOM, and practice habits that actually stick.",
        focusKeyword: "JavaScript tutorial for beginners",
        keywords: [
            "JavaScript tutorial for beginners",
            "learn JavaScript free",
            "JavaScript for beginners free",
            "interactive JavaScript tutorial",
            "JS basics tutorial",
        ],
        category: "JavaScript",
        readTime: "12 min read",
        publishedAt: D9,
        tutorialPath: "/tutorials/javascript",
        headings: {
            intro: "The Best Way to Learn JavaScript as a Beginner",
            concepts: "Core JavaScript Ideas",
            steps: "Free Interactive JS Study Plan",
            practice: "Start the Free JS Tutorial",
            faq: "JavaScript for Beginners — FAQ",
        },
        intro: "A JavaScript tutorial for beginners should be interactive: read a concept, run code, break it, fix it. Passive videos alone rarely stick. Pair free Sturdee lessons with small daily challenges.",
        whyItMatters:
            "Classic high-volume coding keyword. Fresh 2026 framing + internal links to tutorials strengthen the coding cluster.",
        deepDive:
            "Order: values → functions → arrays/objects → DOM → fetch. Add AI explanations only after you attempt exercises yourself.",
        concepts: [
            "let/const and types",
            "Functions and return values",
            "Arrays and objects",
            "DOM selection and events",
            "Async basics with fetch",
        ],
        steps: [
            "Complete intro JS lessons on Sturdee",
            "Rebuild examples without looking",
            "Make a tiny interactive page",
            "Learn to read stack traces",
            "Use AI Tutor only for stuck moments (Pro)",
        ],
        practice:
            "Open /tutorials/javascript and follow lessons in order. Supplement with /learn/coding-free.",
        faq: [
            {
                question: "How long to learn JavaScript basics?",
                answer:
                    "Many beginners reach comfort with basics in 4–8 weeks of consistent practice.",
            },
            {
                question: "Should I learn TypeScript first?",
                answer:
                    "Learn JavaScript first. TypeScript is easier once you understand JS values and functions.",
            },
        ],
    },
    {
        slug: "html-css-javascript-free-course-style-path",
        title: "HTML CSS JavaScript Free Course-Style Learning Path",
        seoTitle: "HTML CSS JavaScript Free Course Path for Beginners",
        description:
            "Follow a free HTML, CSS, and JavaScript course-style path: structured lessons, projects, and next steps into web development with AI.",
        focusKeyword: "HTML CSS JavaScript free course",
        keywords: [
            "HTML CSS JavaScript free course",
            "learn HTML CSS JavaScript free",
            "free web development course",
            "front end course free",
            "beginner web development path",
        ],
        category: "HTML",
        readTime: "11 min read",
        publishedAt: D10,
        tutorialPath: "/learn/web-development",
        headings: {
            intro: "A Free Course-Style Path (Without the Paywall)",
            concepts: "What You’ll Learn in Order",
            steps: "Project Checklist",
            practice: "Start the Free Path",
            faq: "Free HTML CSS JS Course — FAQ",
        },
        intro: "You can follow an HTML CSS JavaScript free course experience using structured tutorial tracks: finish HTML, then CSS, then JS, with a portfolio project at each stage — no tuition required.",
        whyItMatters:
            "Targets “free course” intent that competitors monetize. Positions Sturdee tutorials as the course.",
        deepDive:
            "Treat each language track like modules in a bootcamp syllabus. Time-box modules. Publish projects on GitHub for accountability.",
        concepts: [
            "HTML structure and semantics",
            "CSS layout and responsive design",
            "JavaScript interactivity",
            "Accessibility checkpoints",
            "Optional AI-assisted review",
        ],
        steps: [
            "Build a semantic multi-section page (HTML)",
            "Style it responsively (CSS)",
            "Add a theme toggle or form validation (JS)",
            "Run an accessibility pass",
            "Write a short case study on the blog-worthy learnings",
        ],
        practice:
            "Use /tutorials/html, /tutorials/css, /tutorials/javascript, and /learn/web-development.",
        faq: [
            {
                question: "Is this equivalent to a paid bootcamp?",
                answer:
                    "It covers foundations. Bootcamps add intensity, career services, and deadlines — you can simulate those with cohorts.",
            },
            {
                question: "When do I add React?",
                answer:
                    "After you’re comfortable with DOM and JavaScript fundamentals — usually after your first few JS projects.",
            },
        ],
    },
];
