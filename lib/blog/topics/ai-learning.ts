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
        readTime: "20 min read",
        publishedAt: D1,
        tutorialPath: "/learn/ai",
        coverImage: "/blog/learn-ai-hero.jpg",
        coverAlt: "Beginner studying artificial intelligence on a laptop with notes and a learning path",
        hook:
            "Maya opened three AI courses, watched half a lecture on backpropagation, and closed the tab. She did not feel dumb — she felt misled. Nobody had told her that learning artificial intelligence free in 2026 could start with plain English instructions to a chatbot, not a whiteboard full of calculus.",
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
        chapters: [
            {
                title: "The problem: curiosity meets the math wall",
                paragraphs: [
                    "Search for “learn artificial intelligence free” and you will find two extremes. One camp promises a PhD in six weeks with equations you have not seen since school. The other camp sells magic buttons that “do AI for you” without teaching anything durable. Most beginners bounce between those poles until they burn out.",
                    "The real problem is not intelligence — it is sequencing. AI literacy is not one subject. It is a stack: how models behave, how to instruct them, how to wire them into work, and optionally how to read code that calls an API. When courses start at the bottom of that stack (heavy math) instead of the top (daily use), dropout looks like a personal failure. It is usually a curriculum failure.",
                    "If you want to learn AI free, treat the first month as orientation, not credential hunting. You are learning what good and bad model output looks like, where models lie confidently, and which tasks are worth automating. That mindset costs nothing but attention — and it is the foundation every paid bootcamp assumes you already have.",
                ],
                figure: {
                    src: "/blog/learning-path.jpg",
                    alt: "Diagram of a beginner AI learning path from literacy to light coding",
                    caption: "Start with prompts and workflows; add Python or JavaScript when you need APIs and evaluation.",
                },
            },
            {
                title: "The attempt: a week-by-week free path that actually sticks",
                paragraphs: [
                    "Week one is exposure, not mastery. Use any free chat interface and run twenty real tasks you already do: summarize a long email thread, draft meeting notes, explain a concept you are studying, rewrite a paragraph for clarity. After each reply, ask one critical question: what did the model assume, and what would I need to verify?",
                    "Week two shifts from vibes to patterns. Learn prompt engineering as a reusable skill: role, task, audience, constraints, format. Copy one skeleton prompt and reuse it across tasks. You are building muscle memory for specification — the same skill senior engineers use when they design agent workflows.",
                    "Weeks three and four add tooling literacy without turning you into a software engineer overnight. Pick either Python or JavaScript from free interactive tutorials. You do not need algorithms; you need to read error messages, edit a script, and call an API once. That single API call demystifies “AI products” more than ten hours of architecture slides.",
                    "By week five, choose accountability. Self-study wins on cost; cohorts and AI tutors win on feedback loops. Sturdee’s free AI skill paths and tutorials cover the self-study loop; Sturdee Pro adds AI Tutor when you want someone (something) to grade your prompts and nudge your next step.",
                ],
                list: [
                    "Week 1: twenty constrained prompts on real tasks + verification habit",
                    "Week 2: prompt patterns (role, few-shot, structured output)",
                    "Week 3: automate one weekly workflow end to end",
                    "Week 4: free Python or JavaScript track for API literacy",
                    "Week 5+: live cohort or AI Tutor for feedback",
                ],
                tip: "Cap daily study at 45 focused minutes. Consistency beats weekend binge-watching lecture playlists.",
            },
            {
                title: "The insight: models predict tokens — your job is to specify success",
                paragraphs: [
                    "Large language models do not “know” facts the way a database does. They predict likely next tokens from patterns in training data. That single idea explains both their brilliance and their confident mistakes. When you learn artificial intelligence free, you are really learning how to steer probabilistic text engines toward outcomes you can check.",
                    "Prompt engineering is the highest-leverage free skill because it transfers across ChatGPT, Claude, Gemini, and local models. Clear instructions reduce rework, control tone, and force structured outputs that feed automation. You are not hunting magic words; you are writing mini product specs.",
                    "Automation and agents come later — after you can describe tasks reliably. Jumping straight to “build an agent” without evaluation is how teams ship fragile demos. The beginners who progress fastest treat every prompt as a hypothesis and every output as data.",
                ],
            },
            {
                title: "The practice: mistakes to avoid and proof you are improving",
                paragraphs: [
                    "Avoid starting with linear algebra unless you have a specific research goal. Avoid treating chat replies as verified facts. Avoid buying expensive certificates before you have a folder of prompts, failures, and fixes — that folder is what interviews increasingly ask for.",
                    "Measure progress with artifacts, not feelings. Save ten “regression prompts” you care about and re-run them when you change technique. Time how long a weekly report takes before and after a template. Publish one short write-up explaining a workflow you automated — that public proof beats a badge hidden on a learning platform.",
                    "Pair Sturdee’s /learn/ai hub with free coding tutorials when scripts appear in your path. The combination mirrors how applied AI roles actually work: language, tools, light code, and relentless evaluation.",
                ],
            },
        ],
        takeaway:
            "You can learn artificial intelligence free by sequencing skills correctly: daily prompting first, one automated workflow second, light coding third, deeper theory when a project demands it. Keep your regression prompts, document what failed, and let your portfolio of small wins compound — certificates optional, competence not.",
        faq: [
            {
                question: "Is learning AI free realistic in 2026?",
                answer:
                    "Yes. Free tutorials, open courses, and practice tools cover foundations. Certificates and 1:1 tutoring are optional upgrades once you know what you need.",
            },
            {
                question: "Do I need to know how to code first?",
                answer:
                    "No for prompting and AI literacy. Yes eventually if you want agents, APIs, or evaluation pipelines — start coding in parallel once a workflow outgrows copy-paste.",
            },
            {
                question: "How long until I’m job-ready?",
                answer:
                    "AI literacy can take weeks; applied AI roles usually need months of projects. Focus on a portfolio of workflows, not certificates alone.",
            },
            {
                question: "Which free resources should I prioritize?",
                answer:
                    "Prioritize interactive practice: prompt drills, small scripts, and one shipped automation. Pair reading with doing on Sturdee’s /learn/ai path and free coding tutorials.",
            },
            {
                question: "When should I pay for Pro or a cohort?",
                answer:
                    "Pay when feedback latency blocks you — when you need graded prompts, debugging help, or deadlines. Free material gets you fluent; paid structure accelerates accountability.",
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
        readTime: "22 min read",
        publishedAt: D2,
        tutorialPath: "/learn/prompt-engineering",
        coverImage: "/blog/prompt-anatomy.jpg",
        coverAlt: "Annotated diagram of a strong prompt with role, task, constraints, and format",
        hook:
            "The marketing team pasted the same vague request into ChatGPT every Monday — “write a newsletter” — and every Monday they spent an hour fixing tone, length, and hallucinated stats. One afternoon they added four lines specifying audience, word count, and a bullet format. The model did not get smarter; their prompt engineering course-free moment did.",
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
        chapters: [
            {
                title: "Why vague prompts fail in production",
                paragraphs: [
                    "Prompt engineering is not about tricking a model with secret keywords. It is the craft of writing instructions that define success clearly enough that another human could grade the output. When prompts fail, the failure mode is almost always under-specification: missing audience, missing constraints, or missing format.",
                    "Free prompt engineering courses should teach patterns you can reuse across models — not screenshots of clever one-liners. The patterns that survive model upgrades are structural: who the model is, what it must do, what it must not do, and how the answer should look.",
                    "Treat every prompt like a mini product spec. If you cannot describe what “done” looks like in one sentence, the model will guess — and guessing is where hallucinations and rework live.",
                ],
                figure: {
                    src: "/blog/prompt-anatomy.jpg",
                    alt: "Layers of a prompt: role, task, audience, constraints, examples, format",
                    caption: "Strong prompts stack role, task, constraints, and format before the user input.",
                },
            },
            {
                title: "Core patterns: from baseline to few-shot",
                paragraphs: [
                    "Start with a baseline prompt for a task you perform weekly — status updates, code reviews, lesson plans, customer replies. Run it once and capture what went wrong. That failure log becomes your curriculum.",
                    "Add a role and explicit success criteria next. “You are a senior editor” is weak alone; “You are a senior editor who preserves factual claims and cuts fluff to 120 words” is actionable. Success criteria turn subjective taste into checklists the model can follow.",
                    "Few-shot examples beat abstract adjectives for stylistic tasks. Show two or three input/output pairs that represent “good.” The model interpolates style and structure more reliably than it interprets “make it professional.”",
                    "For reasoning tasks, chain-of-thought can help when you need intermediate steps — but it adds tokens and latency. Use it when mistakes are costly; skip it when a lookup or template suffices.",
                ],
                list: [
                    "Role + task + audience + constraints + format",
                    "Two to three few-shot examples for style-heavy work",
                    "Structured outputs (JSON, tables) for tool pipelines",
                    "Regression set of ten prompts before you “ship” a template",
                ],
            },
            {
                title: "Structured outputs and evaluation discipline",
                paragraphs: [
                    "Workflows break when models return prose and your automation expects JSON. Force structure in the prompt — keys, types, allowed enums — and reject malformed answers in code or with a repair pass. Structured outputs are how prompt engineering connects to agents and integrations.",
                    "Evaluation separates hobby prompting from professional work. Build a rubric: format compliance, factual checks, tone, and safety. Spot-check ten outputs, not one lucky reply. Save version history: prompt v1, v2, v3, and what changed.",
                    "When a provider releases a new model, rerun your regression set. Prompt engineering course-free does not mean “set and forget.” It means you own a test suite the way engineers own unit tests.",
                ],
                tip: "If a prompt works once, assume luck until it passes ten diverse inputs.",
            },
            {
                title: "Practice loop: iterate like a product owner",
                paragraphs: [
                    "Copy the skeleton below into your notes app and fill the braces for each task. Keep winners in a prompt library tagged by use case — support, coding, study, research. Share libraries with teammates so quality compounds.",
                    "Common mistakes: one giant paragraph with no format, no examples for stylistic tasks, accepting the first answer, and chain-of-thought on simple lookups. Fix those and you are ahead of most certificate collectors.",
                    "Continue on Sturdee’s Prompt Engineering skill path and /learn/prompt-engineering for structured drills. Use Practice Coach on Pro when you want graded feedback on constraint-following and format compliance.",
                ],
            },
        ],
        takeaway:
            "A free prompt engineering course succeeds when you leave with patterns, not parlor tricks: specify success, show examples, force structure, and evaluate with a regression set. Models will keep improving; specification and measurement remain your durable edge.",
        faq: [
            {
                question: "Is this prompt engineering course really free?",
                answer:
                    "The Sturdee skill path and this tutorial are free to read. AI-powered practice drills require Sturdee Pro.",
            },
            {
                question: "Does prompt engineering still matter with better models?",
                answer:
                    "Yes. Clearer instructions still reduce errors, control tone, and produce structured outputs for workflows — especially at scale.",
            },
            {
                question: "How is this different from ChatGPT tips lists?",
                answer:
                    "Tips are one-offs. A course teaches reusable patterns, evaluation, and iteration — skills that transfer across models.",
            },
            {
                question: "How many examples belong in a few-shot prompt?",
                answer:
                    "Often two or three diverse examples are enough. More examples help noisy tasks but increase token cost; trim once quality plateaus.",
            },
            {
                question: "Should I put instructions in the system or user message?",
                answer:
                    "Put stable rules in the system message when the API supports it; put task-specific input in the user message. Keep one source of truth to avoid contradictions.",
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
        readTime: "19 min read",
        publishedAt: D3,
        tutorialPath: "/learn/ai",
        coverImage: "/blog/genai-courses.jpg",
        coverAlt: "Collage of free generative AI course options and certificate badges",
        hook:
            "Jordan searched “free generative AI courses,” clicked the top result, and hit a paywall at the first quiz. The landing page said “free” in giant letters; the checkout page said “certificate required.” Understanding what free actually means is the first lesson no syllabus includes.",
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
        chapters: [
            {
                title: "Three definitions of “free” in GenAI education",
                paragraphs: [
                    "In 2026, “free generative AI courses” usually means one of three models: fully free learning with a free completion badge, free to audit with a paid certificate, or free trial access that converts to subscription. Each can be legitimate; each solves a different goal.",
                    "Skills-only learners should optimize for practice volume: prompts per day, projects shipped, feedback loops. Certificate hunters should verify whether the badge is shareable on LinkedIn, whether employers recognize the issuer, and whether payment is required before the final assessment.",
                    "Vendor badges from Google, Microsoft, or AWS can add credibility in enterprise hiring pipelines — but they are not substitutes for demos. Hiring managers increasingly ask what you built, not which logo appears on a PDF.",
                ],
                figure: {
                    src: "/blog/genai-courses.jpg",
                    alt: "Comparison of free audit, free certificate, and skills-first GenAI learning paths",
                    caption: "Decide whether you need a badge, skills, or both before you enroll.",
                },
            },
            {
                title: "Choosing a path that matches your intent",
                paragraphs: [
                    "Start with a free GenAI intro that covers model behavior, safety, and prompting — not just tool tours. You want vocabulary that transfers when the interface changes next quarter.",
                    "Complete one applied project before chasing credentials: a research assistant over your notes, a code helper with evaluation, or a content workflow with human review. Document prompts, failures, and metrics. That write-up is portfolio gold.",
                    "If a certificate still makes sense after the project, pick a provider whose assessment reflects real tasks — structured outputs, retrieval, or automation — not multiple-choice trivia about model names.",
                ],
                list: [
                    "Fully free learning + free certificate",
                    "Free audit / paid certificate (common on MOOC platforms)",
                    "Vendor skill badges for enterprise credibility",
                    "Project portfolios for applied hiring screens",
                ],
            },
            {
                title: "Pair theory with daily prompt practice",
                paragraphs: [
                    "Generative AI courses excel at framing: transformers at a high level, use cases, risks, and responsible use. They rarely force the daily reps that build intuition. Pair any course with a prompt journal and ten regression tasks from your job or studies.",
                    "Sturdee focuses skills-first: free tutorials and AI paths that assume you learn by doing, then optionally add Pro tutoring when you want faster critique. That sequencing avoids paying for video hours you will forget without practice.",
                    "When comparing courses, ask: Is content updated for current models? Are there exercises with expected outputs? Is there a dark-pattern trial? Honest comparisons rank higher than affiliate listicles — and save readers money.",
                ],
            },
            {
                title: "From course completion to credible proof",
                paragraphs: [
                    "Publish a case study: problem, baseline manual process, GenAI workflow, evaluation, and time saved. Redact sensitive data; keep the structure. That narrative beats a certificate alone for many teams hiring “AI-enabled” roles.",
                    "Network by shipping in public: share prompt libraries, not secret sauce. Comment on others’ automation write-ups. Cohort programs help here — accountability plus peers reviewing your project.",
                    "Return to /learn/ai whenever a course introduces a concept you have not practiced yet. Free generative AI courses open the door; your projects prove you belong in the room.",
                ],
                tip: "Never pay for a certificate before you finish one free project that uses the course’s ideas in your real context.",
            },
        ],
        takeaway:
            "Free generative AI courses are worth it when you know which “free” you need and you pair videos with projects. Build first, certify second if employers ask — and let demos of evaluated workflows carry your job search.",
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
            {
                question: "What is the difference between audit-free and certificate-free?",
                answer:
                    "Audit-free lets you watch and practice without paying; certificate-free includes a completion badge at no cost. MOOCs often charge only for the graded certificate.",
            },
            {
                question: "How do I avoid free-trial traps?",
                answer:
                    "Read checkout flows before entering payment details. Prefer platforms that let you finish core lessons without a card on file.",
            },
            {
                question: "Can I learn GenAI only on Sturdee without MOOCs?",
                answer:
                    "Yes for applied literacy and prompting. Add external courses if you want vendor badges or academic structure; use Sturdee for daily practice and coding foundations.",
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
        readTime: "21 min read",
        publishedAt: D4,
        tutorialPath: "/learn/coding-free",
        coverImage: "/blog/code-with-ai.jpg",
        coverAlt: "Developer learning to code with an AI tutor beside an editor and terminal",
        hook:
            "Sam asked ChatGPT to build an entire todo app on day one of learning JavaScript. The app ran — until it did not. When the checkbox broke, Sam had no map of the DOM, no habit of reading errors, and no way to tell whether the bug lived in HTML, CSS, or JS. Learn to code with AI works when AI is the coach, not the author.",
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
        chapters: [
            {
                title: "The temptation to outsource thinking",
                paragraphs: [
                    "AI coding assistants tempt beginners with instant green checkmarks. Paste a spec, get a repo, move on. That shortcut collapses the first time requirements change, dependencies update, or an interviewer asks you to trace a function line by line.",
                    "Healthy learn-to-code-with-AI habits treat the model as an explainer and reviewer. You still type syntax, run tests, and read stack traces. AI fills gaps when you are stuck — not when you have not tried.",
                    "The goal is not to avoid AI; it is to avoid learned helplessness. Developers who thrive with copilots can articulate what they wanted, verify what they got, and refactor what they do not understand.",
                ],
                figure: {
                    src: "/blog/code-with-ai.jpg",
                    alt: "Split view of student code and AI-generated hints",
                    caption: "Use AI after you attempt the exercise — not instead of the exercise.",
                },
            },
            {
                title: "A daily routine that compounds skill",
                paragraphs: [
                    "Pick one free track — HTML/CSS for web visuals or Python for scripts and APIs. Complete a lesson without AI first. Struggle for at least fifteen minutes before opening a chat. That friction builds retrieval memory.",
                    "When you ask for help, request hints before full solutions. “What is wrong with my loop?” beats “write the whole function.” Ask the AI to quiz you on the lesson: three questions, no answers until you attempt them.",
                    "Ship a tiny project weekly: a landing page, a CLI script, a fetch call to a public API. Start without AI for the skeleton; use AI to review accessibility, suggest tests, or explain a cryptic error message.",
                ],
                list: [
                    "Lesson first, AI second (15-minute rule)",
                    "Hints before full solutions",
                    "Explain-the-code test after every AI assist",
                    "Bugs journal of errors you fixed yourself",
                ],
            },
            {
                title: "Verification: docs, tests, and the line-by-line rule",
                paragraphs: [
                    "Models hallucinate APIs and import paths. Verify against official docs. Run the code. If you use AI-generated tests, make sure you understand what they assert — fake confidence is worse than no tests.",
                    "Adopt the line-by-line rule: if you cannot explain each line after AI helps, rewrite it in your own words and variable names. That exercise converts pasted code into owned knowledge.",
                    "Sturdee’s free tutorials plus optional AI Tutor mirror this loop: structured practice on the site, on-demand explanation when you are stuck on Pro.",
                ],
                tip: "Never paste production secrets or employer code into consumer chat tools — use policy-approved environments.",
            },
            {
                title: "Mistakes that stall beginners — and how to recover",
                paragraphs: [
                    "Copy-pasting full apps before learning variables and control flow creates brittle confidence. Skipping fundamentals makes every framework feel like magic. Not reading error messages turns every bug into a panic prompt.",
                    "Recovery is simple but not easy: return to the smallest working example, compare to your broken code, and ask AI to explain the diff — not rewrite the universe.",
                    "Learn to code with AI is a partnership. You bring intent and verification; the model brings speed and alternative explanations. Over months, the partnership flips: you lead design, AI accelerates implementation.",
                ],
            },
        ],
        takeaway:
            "Learn to code with AI by keeping your hands on the keyboard: tutorials for reps, AI for targeted help, verification always. You will ship faster than either pure solo study or pure AI generation — and you will survive the first real bug in production.",
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
            {
                question: "Should beginners use GitHub Copilot or similar?",
                answer:
                    "After basics. Copilot helps when you can judge suggestions. Turn it off for your first syntax lessons.",
            },
            {
                question: "How do I know if I am over-relying on AI?",
                answer:
                    "If you cannot rebuild today’s exercise tomorrow without chat, redo it manually once. That reset is cheaper than interviewing unprepared.",
            },
            {
                question: "Where should I practice for free?",
                answer:
                    "Start at /tutorials for interactive tracks, /learn/coding-free for orientation, and /ai on Pro when you want a coding tutor on demand.",
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
        readTime: "18 min read",
        publishedAt: D5,
        tutorialPath: "/skills/prompt-engineering",
        coverImage: "/blog/prompt-anatomy.jpg",
        coverAlt: "ChatGPT prompt template with role, constraints, and example outputs",
        hook:
            "Two coworkers asked ChatGPT the same question about refunds. One wrote “What is our refund policy?” and got a confident essay about generic consumer law. The other pasted role, audience, and “answer only from the attached policy; say if missing.” Same model, different prompts — only one answer was safe to send to a customer.",
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
        chapters: [
            {
                title: "Specificity beats clever wording",
                paragraphs: [
                    "Better ChatGPT prompts name the role, audience, constraints, and output format before the task. Vague prompts produce vague answers — then users blame “the AI” instead of the specification.",
                    "Constraints reduce hallucinations and scope creep: word limits, banned topics, required sections, citation rules. Treat constraints as guardrails, not suggestions.",
                    "When data is missing, instruct the model to ask clarifying questions or explicitly state assumptions. That single habit prevents silent fabrication in customer-facing workflows.",
                ],
            },
            {
                title: "Examples lock style and structure",
                paragraphs: [
                    "Show one good output for stylistic tasks: tone, heading hierarchy, bullet density. ChatGPT mirrors patterns in the prompt more reliably than adjectives like “professional.”",
                    "For coding help, paste the function and ask for severity-ranked findings with minimal fixes — not a rewrite of the entire module. For study, ask for one analogy, one code sample, then quiz questions with hidden answers.",
                    "Keep a prompt library with version notes. Iterate in public with yourself: v1 failed on length, v2 failed on tone, v3 added an example — winner saved.",
                ],
                figure: {
                    src: "/blog/prompt-anatomy.jpg",
                    alt: "Before and after ChatGPT prompts showing added constraints",
                    caption: "Small structural additions often beat longer rambling instructions.",
                },
            },
            {
                title: "Templates you can copy today",
                paragraphs: [
                    "Use the study and coding templates in the code block below as starting points — replace braces, keep the skeleton. Templates encode lessons from hundreds of failures so you do not repeat them.",
                    "For factual tasks, request sources or say “if unsure, say you do not know.” For creative tasks, specify what must remain factual versus what can be invented.",
                    "Run, critique, tighten. One iteration cycle per day on a real task beats reading fifty tip threads.",
                ],
                list: [
                    "State the goal in one sentence",
                    "Add audience + constraints + format",
                    "Include one exemplar output",
                    "Run ten variations; save the winner",
                ],
            },
            {
                title: "From ChatGPT to every other model",
                paragraphs: [
                    "These patterns transfer to Claude, Gemini, and local LLMs — only API details change. Custom GPTs help when you repeat identical system instructions; reusable prompts help when you iterate frequently.",
                    "Practice on Sturdee’s Prompt Engineering skill page. Upgrade to Pro for AI Tutor critique that scores constraint-following and suggests tighter formats.",
                    "Better ChatGPT prompts are a career skill disguised as a party trick. The person who specifies success clearly becomes the person teams trust with customer emails, code reviews, and research packs.",
                ],
            },
        ],
        takeaway:
            "Write better ChatGPT prompts by specifying success, showing examples, and iterating with a saved library. The model is interchangeable; your specification discipline is not.",
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
            {
                question: "Do temperature settings matter for beginners?",
                answer:
                    "Lower temperature for factual, structured tasks; higher for brainstorming. Prompt clarity matters more than knob tuning at first.",
            },
            {
                question: "How do I reduce hallucinations in ChatGPT?",
                answer:
                    "Add constraints, require citations or source quotes, and instruct the model to refuse when information is missing.",
            },
            {
                question: "Can I share prompts safely at work?",
                answer:
                    "Share templates, not customer data. Redact identifiers and follow your company’s acceptable-use policy for AI tools.",
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
        readTime: "20 min read",
        publishedAt: D6,
        tutorialPath: "/skills",
        coverImage: "/blog/ai-agents-loop.jpg",
        coverAlt: "Diagram of an AI agent loop: plan, tool call, observe, repeat",
        hook:
            "A founder demoed an “autonomous AI agent” that booked flights, emailed investors, and updated the CRM — until it emailed the wrong investor a draft meant for internal eyes. The model was fine; the loop had no approvals, no logs, and too many tools. AI agents explained honestly start smaller than keynote slides.",
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
        chapters: [
            {
                title: "Agents versus single replies",
                paragraphs: [
                    "A chatbot answers the latest message. An AI agent uses a model to plan steps, invoke tools, observe results, and loop until a goal is met or a guard stops the run. That loop is what enables research across URLs, file edits, or API calls between “thoughts.”",
                    "Hype conflates agents with magic autonomy. Practical agents are narrow: one domain, one tool at first, hard step caps, human approval before side effects. Most business value is reliable automation with logging — not an open-ended digital employee.",
                    "Before you build an agent, ask whether a single well-structured prompt plus retrieval already solves the task. Agents add complexity, cost, and failure modes. Use them when multi-step tool use is genuinely required.",
                ],
                figure: {
                    src: "/blog/ai-agents-loop.jpg",
                    alt: "AI agent cycle from goal to plan to tool execution and observation",
                    caption: "Goal → plan → tool → observe → repeat, with guards at every step.",
                },
            },
            {
                title: "Building blocks: tools, memory, guards",
                paragraphs: [
                    "Tools are functions the model can call: search, calculator, database query, send draft email. Each tool needs a schema the model understands and code that enforces permissions.",
                    "Memory stores intermediate results — scratchpad notes, retrieved documents, prior tool outputs. Without memory, agents forget why they chose a step three calls ago.",
                    "Guards include max steps, tool allowlists, budget caps, and human-in-the-loop approvals before irreversible actions. Guards are not optional extras; they are the difference between demo and production.",
                ],
                list: [
                    "One narrow goal per agent version",
                    "Start with a single tool",
                    "Log every tool call with inputs and outputs",
                    "Cap steps (e.g., five) until success rate is measured",
                ],
            },
            {
                title: "Build a tiny agent workflow you can trust",
                paragraphs: [
                    "Pick a goal small enough to finish in one sitting: summarize three URLs, triage ten support subjects, or compile a research brief from public pages. Give the model one search or fetch tool.",
                    "Require the model to cite which URL each claim came from. If a claim lacks a source, it must say “not found.” That discipline previews retrieval-augmented patterns without overbuilding infrastructure.",
                    "Add human approval before anything leaves your machine — sending email, posting comments, charging cards. Agents fail gracefully when humans review diffs.",
                ],
                tip: "If you cannot replay a run from logs, you do not have an agent — you have a lottery.",
            },
            {
                title: "Evaluation and beginner pitfalls",
                paragraphs: [
                    "Measure task success rate on a fixed set of inputs, not vibes. Track cost per successful run, latency, and failure categories: wrong tool, wrong plan, tool error, model drift.",
                    "Common pitfalls: unlimited autonomy on production data, no logging, too many tools confusing planning, skipping plain prompts that already work.",
                    "Explore Sturdee AI skill paths and practice writing agent specs — goals, tools, guards — in AI Tutor. Light coding helps you read tool definitions even if you start with no-code builders.",
                ],
            },
        ],
        takeaway:
            "AI agents explained for beginners means loops with tools, memory, and guards — not sci-fi autonomy. Start with one tool, log everything, approve side effects, and measure success before you add complexity.",
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
            {
                question: "How many tools should a beginner agent have?",
                answer:
                    "One, maybe two after baseline metrics look good. Too many tools increase planning errors.",
            },
            {
                question: "What is human-in-the-loop?",
                answer:
                    "A required human approval step before irreversible actions — sending messages, payments, or public posts.",
            },
            {
                question: "When should I choose RAG instead of an agent?",
                answer:
                    "When the task is answer-from-documents without multi-step side effects. RAG is often simpler and easier to evaluate.",
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
        readTime: "19 min read",
        publishedAt: D7,
        tutorialPath: "/skills",
        coverImage: "/blog/ai-agents-loop.jpg",
        coverAlt: "Workflow diagram showing AI automation with human review checkpoint",
        hook:
            "Every Friday, Priya copied survey comments into a spreadsheet, tagged themes, and drafted a summary for leadership — two hours of mechanical work. She did not need an agent swarm; she needed a prompt template, a CSV export, and a rule that nothing emailed until she clicked approve. That is AI automation for beginners.",
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
        chapters: [
            {
                title: "Automation is a workflow, not a chat",
                paragraphs: [
                    "AI automation means embedding models inside repeatable pipelines: trigger → transform → output → review. One-off chats do not count — they do not scale, measure, or improve.",
                    "Beginners should target annoying, frequent, template-like tasks: inbox triage labels, first-draft meeting notes, research packs with citations, weekly KPI narratives. These tasks have clear inputs and formats — perfect for prompts with variables.",
                    "Map the task as Input → Transform → Output → Review. AI owns Transform once the prompt is stable; you own Review until error rates prove you can relax oversight.",
                ],
            },
            {
                title: "Designing your first reliable template",
                paragraphs: [
                    "List five tasks you repeat weekly. Score them by frequency, templateness, and downside risk if wrong. Automate high-frequency, low-risk tasks first.",
                    "Write a prompt with slots: {customer_name}, {ticket_body}, {tone}. Force output structure — JSON keys, markdown sections, or fixed bullet counts — so downstream tools can parse results.",
                    "Run the template ten times with real inputs. Log failure modes: hallucinated fields, wrong tone, ignored constraints. Fix the prompt before you connect Zapier, Make, or a script.",
                ],
                figure: {
                    src: "/blog/prompt-anatomy.jpg",
                    alt: "Prompt template with variable slots for automation",
                    caption: "Variable prompts turn ad-hoc chats into repeatable workflows.",
                },
            },
            {
                title: "Human review and metrics that matter",
                paragraphs: [
                    "Add a checklist review before anything sends externally: factual claims, names, numbers, policy compliance. Automation without review is how confident mistakes reach customers.",
                    "Track time saved per week and error rate after review. If review catches issues on more than one in ten runs, tighten the prompt or add retrieval — do not remove the human.",
                    "Security: never paste secrets, private customer data, or unreleased financials into consumer models without enterprise agreements and redaction rules.",
                ],
                list: [
                    "Triggers: schedule, form submit, inbox label",
                    "Prompt templates with explicit output schema",
                    "Review checkpoint before external actions",
                    "Metrics: minutes saved, defects caught in review",
                ],
            },
            {
                title: "When to add tools beyond chat",
                paragraphs: [
                    "Start with chat plus spreadsheets — cheapest learning loop. Add automation platforms when the prompt passes ten diverse tests and you want triggers without writing code.",
                    "Scripts in Python or JavaScript make sense when you need custom validation, API calls, or logging. Light coding tutorials on Sturdee bridge that gap when you are ready.",
                    "Browse AI Automation skill topics and practice templates with AI Tutor on Pro to get critique before you wire production triggers.",
                ],
                tip: "Automate the boring middle of workflows; keep humans on judgment calls and exceptions.",
            },
        ],
        takeaway:
            "AI automation for beginners is disciplined prompting plus review plus measurement — not flashy agents on day one. Ship one template, prove ten clean runs, then connect triggers and celebrate minutes returned to your week.",
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
            {
                question: "How do I know a workflow is ready to automate?",
                answer:
                    "When a prompt succeeds on ten diverse real inputs and review catches fewer than one serious defect per ten runs.",
            },
            {
                question: "Should I automate customer-facing emails first?",
                answer:
                    "No. Start with internal drafts and summaries until error rates are measured and low.",
            },
            {
                question: "What is the difference between automation and an agent?",
                answer:
                    "Automation follows a fixed template and path. Agents plan dynamic steps and call tools in loops — higher power, higher risk.",
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
        readTime: "18 min read",
        publishedAt: D8,
        tutorialPath: "/learn/ai",
        coverImage: "/blog/learning-path.jpg",
        coverAlt: "Curated stack of free AI tutorials for beginners in 2026",
        hook:
            "Alex bookmarked seventeen “best AI courses” lists and finished none of them. Each list recommended another forty-hour playlist. The breakthrough was not a better list — it was a stack: one prompting tutorial, one GenAI overview, five coding lessons, one shipped workflow.",
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
        chapters: [
            {
                title: "Criteria that separate signal from listicle noise",
                paragraphs: [
                    "The best free AI tutorials for beginners share traits: free to start without a credit card trap, updated for 2026 model behavior, exercises with clear expected outputs, and a path from reading to doing.",
                    "We deprioritize content that is pure hype — agent keynotes without labs — or pure theory — math with no prompting practice. Beginners need both conceptual framing and daily reps.",
                    "Sturdee tutorials and /learn hubs meet those bars: interactive coding where relevant, AI skill paths for prompts and automation, and blog guides for depth without paywalls on reading.",
                ],
                figure: {
                    src: "/blog/learning-path.jpg",
                    alt: "Recommended order of free AI tutorials for beginners",
                    caption: "Prompting → GenAI literacy → coding with AI → automation intro.",
                },
            },
            {
                title: "What to study in what order",
                paragraphs: [
                    "Start with prompt engineering tutorials — roles, constraints, structured outputs. That skill pays rent on every other AI topic.",
                    "Add a free generative AI overview for vocabulary: tokens, context windows, fine-tuning versus retrieval, responsible use. You do not need to implement transformers; you need to speak the language in meetings.",
                    "Layer coding tracks when scripts appear: Python or JavaScript basics with AI as coach, not author. Finish agent and automation intros only after you can evaluate prompt quality on real tasks.",
                ],
                list: [
                    "Prompt engineering tutorials with exercises",
                    "GenAI concept explainers (2026-updated)",
                    "Coding tracks paired with AI help",
                    "Automation/agent intros after basics",
                    "Community or cohort for accountability",
                ],
            },
            {
                title: "Your free tutorial stack for the next 30 days",
                paragraphs: [
                    "Week one: complete one prompt tutorial and run twenty real prompts with a regression note file. Week two: GenAI overview plus one applied mini-project documented in public.",
                    "Week three: five coding lessons on Sturdee with the fifteen-minute-before-AI rule. Week four: ship one tiny automated workflow with review checkpoints.",
                    "Optional week five: join a live AI cohort when self-study momentum fades. Cohorts simulate bootcamp deadlines without upfront tuition.",
                ],
            },
            {
                title: "YouTube, MOOCs, and when to pay",
                paragraphs: [
                    "YouTube excels at motivation and visual intuition. It fails at retention unless you pause and rebuild examples yourself. Treat videos as lecture, Sturdee as lab.",
                    "Do not pay for AI courses until free tutorials and one project expose your gaps — maybe you need certificates, maybe you need tutoring, maybe you need neither.",
                    "Use /blog pillar guides like this one for narrative depth; use /learn/ai and /tutorials for hands-on progression. That pairing beats collecting bookmarks.",
                ],
            },
        ],
        takeaway:
            "The best free AI tutorials for beginners are not the longest playlists — they are the stacks you finish. Prompting first, GenAI literacy second, coding and automation third, accountability when you stall.",
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
            {
                question: "How many tutorials should I juggle at once?",
                answer:
                    "One primary track plus one AI skill path. Parallel courses increase guilt, not skill.",
            },
            {
                question: "Are Sturdee tutorials really free to start?",
                answer:
                    "Yes for reading and core interactive lessons. Pro adds AI Tutor and graded drills when you want faster feedback.",
            },
            {
                question: "What project proves I finished the basics?",
                answer:
                    "A documented automation or prompt library with evaluation notes — something a colleague could run and judge.",
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
        readTime: "17 min read",
        publishedAt: D9,
        tutorialPath: "/ai",
        coverImage: "/blog/learn-ai-hero.jpg",
        coverAlt: "Student asking questions to an AI tutor beside a lesson on screen",
        hook:
            "At 11 p.m. before an exam, Lina opened her textbook and hit a paragraph she could not parse. Office hours were tomorrow; videos were too slow. She asked an AI tutor to explain the same idea at her level, quizzed herself, and slept — not because the AI replaced her professor, but because it filled the gap between lecture and morning.",
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
        chapters: [
            {
                title: "What an AI tutor is — and is not",
                paragraphs: [
                    "An AI tutor is a chat-based teaching assistant available on demand. It explains concepts at the level you request, generates practice questions, and adapts to follow-up confusion — within the limits of model knowledge and your prompt clarity.",
                    "It is not a replacement for great human teachers, mentors, or classroom discussion. It is the layer between passive video and scheduled office hours: always on, infinitely patient, never offended by repeated questions.",
                    "Effective tutoring products combine context from your current lesson, Socratic questioning, and guardrails against doing your homework verbatim. Ineffective use treats the tutor as an answer vending machine.",
                ],
            },
            {
                title: "Where AI tutors shine",
                paragraphs: [
                    "Explanation at multiple levels: “explain like I’m twelve,” then “add the formal definition,” then “give me an analogy from web development.”",
                    "Spaced quizzes: five questions now, retry misses tomorrow — a study pattern research supports but few students maintain alone.",
                    "Rubber-duck debugging for code: you describe what you expected, paste the error, and the tutor helps you form hypotheses before revealing fixes.",
                ],
                figure: {
                    src: "/blog/learn-ai-hero.jpg",
                    alt: "AI tutor offering hints and quiz questions during a study session",
                    caption: "Pair lessons with quizzes and hints — not full answer dumps.",
                },
            },
            {
                title: "A study session recipe",
                paragraphs: [
                    "Study a free Sturdee lesson first so you bring context. Ask the AI tutor to explain only the step where you stalled — not the entire chapter.",
                    "Request a five-question quiz without answers. Attempt each question on paper. Then ask for grading and explanations on misses only.",
                    "Next day, retry missed questions cold. If you still miss, the gap is real — return to the tutorial exercise or join a live cohort for human nuance.",
                ],
                list: [
                    "Lesson first, tutor second",
                    "Hints before solutions",
                    "Quizzes with delayed grading",
                    "Human cohorts for projects and motivation",
                ],
            },
            {
                title: "Limits, verification, and Sturdee Pro",
                paragraphs: [
                    "AI tutors hallucinate facts, especially in fast-moving domains. Verify critical claims against docs, textbooks, or instructors. Use tutors for practice and explanation, not sole authority on grades that matter.",
                    "Humans still win on motivation, career strategy, and nuanced project critique — capstone feedback, portfolio reviews, ethical judgment in ambiguous cases.",
                    "Open /ai for Sturdee AI Tutor on Pro. Free users still progress via tutorials and skill paths; Pro reduces feedback latency when you are stuck at midnight — or 11 p.m. before an exam.",
                ],
                tip: "Ask the tutor to teach you how to ask better questions — meta-prompting accelerates every future session.",
            },
        ],
        takeaway:
            "An AI tutor helps you learn faster when you use it Socratically: explain, quiz, hint — not cheat. Combine it with free lessons and human cohorts; verify facts; retry misses until understanding sticks.",
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
            {
                question: "Can AI tutors help with math and proofs?",
                answer:
                    "They can explain steps and generate practice, but formal proofs need human review. Treat outputs as drafts to verify.",
            },
            {
                question: "Will an AI tutor do my homework?",
                answer:
                    "It might if you ask wrongly. Prompt for hints and methodology; instructors increasingly detect undigested AI output.",
            },
            {
                question: "How does Sturdee AI Tutor differ from generic chat?",
                answer:
                    "It is positioned for learning flows on Sturdee lessons and skill paths, with tutoring-oriented defaults on Pro.",
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
        readTime: "20 min read",
        publishedAt: D10,
        tutorialPath: "/tutorials/python",
        coverImage: "/blog/code-with-ai.jpg",
        coverAlt: "Python script calling an AI API on a developer laptop",
        hook:
            "When Nina’s team said “just call the API,” she stared at a Python file full of imports she did not recognize. She did not need a machine learning PhD — she needed functions, dictionaries, and courage to run a ten-line script. Python for AI beginners is narrower than the internet implies.",
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
        chapters: [
            {
                title: "The minimum viable Python for GenAI work",
                paragraphs: [
                    "Most generative AI application roles are prompt + API + light Python — not training transformers from scratch. You need variables, functions, lists and dicts, reading files, environment variables for keys, and HTTP requests.",
                    "Skip deep object-oriented design and competitive programming at first. Add NumPy or pandas when a project truly requires data wrangling — not because a syllabus said week three.",
                    "Python for AI beginners is a means to express workflows: fill templates, loop over evaluation sets, log outputs, score them with a rubric. That scriptable mindset connects prompting to engineering.",
                ],
                figure: {
                    src: "/blog/code-with-ai.jpg",
                    alt: "Short Python script formatting prompts and calling an API",
                    caption: "Functions, JSON dicts, and loops cover most starter GenAI scripts.",
                },
            },
            {
                title: "From syntax tutorials to your first API call",
                paragraphs: [
                    "Complete beginner Python tutorials on Sturdee through functions and dictionaries. Write a script that formats a prompt template with f-strings or a small helper function — no API yet.",
                    "Introduce virtual environments and `.env` files for API keys. Never commit secrets; never paste keys into chat tools.",
                    "Call a model API once with a hard-coded prompt. Print the response. Celebrate — you just demystified half the products you use daily.",
                ],
                list: [
                    "Functions and arguments",
                    "JSON-like dicts for structured data",
                    "Environment variables for secrets",
                    "Simple loops over ten test inputs",
                    "Save outputs to a CSV for review",
                ],
            },
            {
                title: "Evaluation loops beat toy hello-worlds",
                paragraphs: [
                    "Loop ten test inputs through your template and save outputs. Score each with a simple rubric: format OK? tone OK? factual flags? Manual scoring teaches you what later automation must detect.",
                    "When something fails, fix the prompt before fixing the code — unless the bug is clearly syntax or HTTP. Most beginner pain is specification, not Python.",
                    "Use AI Tutor on Pro to debug tracebacks: read the error bottom-up, hypothesize, patch one line, rerun. That habit transfers to every stack you will touch.",
                ],
                tip: "Keep scripts under one file until pain forces modularization — premature packages slow beginners.",
            },
            {
                title: "Python versus JavaScript and when math enters",
                paragraphs: [
                    "Choose Python if you want the default AI/ML ecosystem and simpler scripts. Choose JavaScript if you already ship web apps and want AI features beside your frontend.",
                    "Machine learning math becomes relevant when you fine-tune, train, or research — not when you orchestrate APIs and retrieval. Learn math on demand.",
                    "Follow /tutorials/python, then apply skills in AI paths on Sturdee. Your next milestone is a README explaining what your script does, how to run it, and how you evaluated outputs.",
                ],
            },
        ],
        takeaway:
            "Python for AI beginners is a thin, practical slice: templates, API calls, loops, and evaluation files. Master that slice before libraries you do not yet need — and let projects dictate when to go deeper.",
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
            {
                question: "Which Python version should I use?",
                answer:
                    "Use a supported 3.x release your tutorials recommend. Focus on basics compatible across versions.",
            },
            {
                question: "Do I need Jupyter notebooks?",
                answer:
                    "Helpful for experiments, optional for small scripts. Start with plain `.py` files and a terminal.",
            },
            {
                question: "How do I practice safely with API keys?",
                answer:
                    "Store keys in environment variables, rotate if leaked, and use billing alerts on provider dashboards.",
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
        readTime: "19 min read",
        publishedAt: D11,
        tutorialPath: "/learn/web-development",
        coverImage: "/blog/code-with-ai.jpg",
        coverAlt: "Web developer using AI to review HTML semantics and CSS layout",
        hook:
            "A founder used an AI site builder for a launch page. It looked fine in Chrome on a laptop. On a phone, text overlapped; a screen reader read buttons as plain text. Web development with AI still demands someone who knows HTML, CSS, and JavaScript — not someone who only knows generate.",
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
        chapters: [
            {
                title: "What still matters when AI writes boilerplate",
                paragraphs: [
                    "AI can scaffold components and suggest CSS, but browsers still parse your HTML, apply your cascade, and run your JavaScript event listeners. If you cannot read those layers, every AI edit is a blind edit.",
                    "Semantic HTML, layout with Flexbox and Grid, fetch and DOM events, performance, and accessibility remain non-negotiable for professional work. AI accelerates drafting; humans verify behavior across devices and assistive tech.",
                    "Web development with AI is a multiplier on fundamentals — not a substitute for them. Careers are built on debugging weird layout bugs at midnight, not on one-click deploy fantasies.",
                ],
            },
            {
                title: "A free study plan that keeps you honest",
                paragraphs: [
                    "Finish HTML and CSS free tutorials, then build a static landing page by hand — no component library yet. Type the tags yourself so structure sticks.",
                    "Ask AI to review semantics and accessibility: heading order, alt text, focus states, color contrast. Fix issues manually; do not accept patches you cannot explain.",
                    "Add JavaScript interactivity: toggles, form validation, fetch to a public API. Use AI to propose tests or explain console errors, not to generate the entire app unseen.",
                ],
                figure: {
                    src: "/blog/code-with-ai.jpg",
                    alt: "AI reviewing a hand-built landing page for accessibility",
                    caption: "Let AI critique; you implement and verify in real browsers.",
                },
            },
            {
                title: "Healthy AI habits for frontend learners",
                paragraphs: [
                    "Use AI for refactors you understand, test ideas, and translate stack traces into plain language. Avoid skipping exercises because a model can finish them — interviews and on-call shifts will not have that shortcut.",
                    "Test keyboard navigation and screen readers on critical flows. AI rarely volunteers a11y gaps; you must ask and then verify with tools.",
                    "Pair /learn/web-development with /tutorials/html, CSS, and JavaScript tracks on Sturdee, then explore the Web Dev with AI skill path for workflow patterns.",
                ],
                list: [
                    "Semantic HTML first",
                    "Layout literacy (Flexbox/Grid)",
                    "JS events and fetch basics",
                    "AI for review and tests, not first drafts of fundamentals",
                    "Performance and a11y checks before ship",
                ],
            },
            {
                title: "Builders versus careers",
                paragraphs: [
                    "AI website builders are fine for prototypes and marketing experiments. If you want a web career, learn the underlying languages even while using builders — otherwise you cannot fix what breaks in production.",
                    "When AI generates CSS, watch for specificity wars and duplicate utilities. When it generates JS, watch for missing error handling on fetch.",
                    "Ship small sites publicly. Write short case studies about what AI helped with and what you verified manually. That story resonates with hiring managers tired of pure vibe-coded portfolios.",
                ],
            },
        ],
        takeaway:
            "Web development with AI means you learn HTML, CSS, and JavaScript deeply, then use AI to review, test, and accelerate — always verifying in browsers and assistive technologies before you call it done.",
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
            {
                question: "Which AI uses are safest while learning?",
                answer:
                    "Accessibility reviews, explaining console errors, suggesting test cases, and refactoring code you already understand.",
            },
            {
                question: "Do I still need to learn responsive design?",
                answer:
                    "Yes. AI layouts often break on small screens until a human adjusts breakpoints and typography.",
            },
            {
                question: "Where should I start on Sturdee?",
                answer:
                    "Use /learn/web-development for orientation, then /tutorials/html and related tracks, plus the Web Dev with AI skill path.",
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
        readTime: "21 min read",
        publishedAt: D12,
        tutorialPath: "/learn/ai",
        coverImage: "/blog/rag-pipeline.jpg",
        coverAlt: "Retrieval augmented generation pipeline from documents to answer",
        hook:
            "Support kept answering the same policy questions with slightly wrong details — the model “remembered” old blog posts that contradicted the official handbook. RAG explained in practice meant searching the handbook first, then answering only from those snippets. Accuracy jumped without retraining anything.",
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
        chapters: [
            {
                title: "The problem RAG solves",
                paragraphs: [
                    "Large language models improvise when they lack grounded context. For company policies, product docs, and internal wikis, improvisation looks like confident wrong answers. Retrieval-augmented generation fixes the grounding step: find relevant passages, then generate an answer constrained by those passages.",
                    "RAG is not magic search. It is a pipeline: chunk documents, retrieve top matches for a question, inject them into the prompt, and instruct the model to cite or refuse when evidence is missing.",
                    "Beginners hear “vector database” and overbuild. Often keyword search plus good chunking plus strict prompting teaches the pattern faster than infrastructure cosplay.",
                ],
                figure: {
                    src: "/blog/rag-pipeline.jpg",
                    alt: "RAG pipeline: chunk, retrieve, prompt, generate with citations",
                    caption: "Retrieve relevant chunks before the model answers.",
                },
            },
            {
                title: "Pipeline pieces in plain English",
                paragraphs: [
                    "Chunk documents into passages small enough to fit context windows but large enough to preserve meaning — often a few paragraphs, not whole PDFs.",
                    "Retrieve with embeddings and vector search or with keyword search for structured FAQs. Top-k passages (often three to five) feed the prompt.",
                    "Prompt the model: answer only from provided sections; quote or cite chunk IDs; say “not found” if evidence is insufficient. That instruction is half the battle.",
                ],
                list: [
                    "Chunk → index → retrieve top-k",
                    "Prompt with passages + citation rules",
                    "Evaluate with real user questions",
                    "Iterate chunk size and retrieval before scaling infra",
                ],
            },
            {
                title: "Hands-on learning without overengineering",
                paragraphs: [
                    "Collect ten FAQs your team actually asks. Split source docs into sections manually if needed. For each question, pick the three best sections by hand first — you are learning relevance intuition.",
                    "Automate retrieval next with simple search. Compare automated picks to your manual picks. Where they diverge, fix chunk boundaries or headings.",
                    "Measure accuracy on the ten-question set before adding agents, fancy rerankers, or multi-hop reasoning. RAG quality gates everything downstream.",
                ],
                tip: "If answers lack citations, treat every output as untrusted until the prompt enforces sources.",
            },
            {
                title: "RAG versus bigger prompts and versus fine-tuning",
                paragraphs: [
                    "If all knowledge fits in one context window and changes rarely, a big prompt may suffice. RAG wins when knowledge is large, updates often, or must be auditable via citations.",
                    "Fine-tuning changes model weights and is costly to refresh. RAG keeps the model fixed and updates docs independently — better for policies and product catalogs that change weekly.",
                    "After this guide, deepen prompt engineering and automation on Sturdee — RAG is retrieval discipline plus prompts, not a separate religion.",
                ],
            },
        ],
        takeaway:
            "RAG explained for beginners is retrieve-then-generate with citations: chunk docs, fetch top passages, constrain answers, evaluate on real questions. Master that loop before vector databases become a hobby.",
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
            {
                question: "How big should chunks be?",
                answer:
                    "Small enough for precise retrieval, large enough for context — often 200–500 tokens, tuned with evaluation.",
            },
            {
                question: "Why do RAG systems still hallucinate?",
                answer:
                    "Weak retrieval, missing citation rules, or prompts that allow outside knowledge. Tighten each layer and measure.",
            },
            {
                question: "When should I add reranking models?",
                answer:
                    "After baseline RAG works on a test set and retrieval errors dominate — not before you have evaluation.",
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
        readTime: "22 min read",
        publishedAt: D13,
        tutorialPath: "/learn/ai",
        coverImage: "/blog/learning-path.jpg",
        coverAlt: "Self-taught learner roadmap for AI without a computer science degree",
        hook:
            "Diego spent a decade in hospitality before pivoting. He assumed AI jobs were gated by CS degrees until a hiring manager scrolled past his education line and asked about the workflow that cut onboarding time in half. The degree mattered less than the demo.",
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
        chapters: [
            {
                title: "Credentials versus demonstrations",
                paragraphs: [
                    "Research and core ML engineering roles still often expect formal math and CS depth. Applied generative AI roles — automation, solutions, enablement, many product-adjacent paths — increasingly hire on demonstrations: workflows shipped, prompts evaluated, apps maintained.",
                    "Learn AI without a degree by replacing credential theater with public proof: write-ups, repos, before/after metrics, and prompt libraries redacted for privacy.",
                    "Domain expertise plus AI leverage beats a generic “AI generalist” résumé with no industry context. You already have domain — hospitality, finance, education, ops — add AI as multiplier.",
                ],
                figure: {
                    src: "/blog/learning-path.jpg",
                    alt: "Twelve-week self-taught AI roadmap for career changers",
                    caption: "Literacy → coding → automation → portfolio → cohort.",
                },
            },
            {
                title: "Twelve weeks that respect your calendar",
                paragraphs: [
                    "Weeks 1–2: AI literacy and daily prompt engineering — twenty real tasks, regression notes, verification habits.",
                    "Weeks 3–4: free coding tutorials in Python or JavaScript — enough to read scripts, call an API, and debug errors with AI as coach.",
                    "Weeks 5–6: automate one workflow at work or home with review checkpoints and time-saved metrics.",
                    "Weeks 7–8: build a tiny RAG or research assistant over public or synthetic docs — citations required.",
                    "Weeks 9–12: publish case studies, refine portfolio READMEs, join a live cohort for accountability and peer review.",
                ],
            },
            {
                title: "Portfolio pieces hiring managers actually open",
                paragraphs: [
                    "Before/after workflow stories with numbers — minutes saved, error rates, human review steps.",
                    "Prompt libraries with version history and evaluation notes — what failed on v1, what fixed v3.",
                    "A small app or script with setup instructions, sample inputs, and honest limitations section.",
                    "Skip listing every certificate badge without context. Lead with artifacts a stranger can run or read in five minutes.",
                ],
                list: [
                    "Public write-ups of automations",
                    "Evaluated prompt sets",
                    "Light Python/JS repos with READMEs",
                    "Networking via shipping in public",
                ],
            },
            {
                title: "Staying honest about gaps",
                paragraphs: [
                    "Self-teaching works; self-delusion does not. If you avoid coding entirely, you will cap out at copy-paste workflows. If you avoid evaluation, you will ship confident wrong outputs.",
                    "Use Sturdee’s /learn/ai hub, free tutorials, and skill registration for structure. Add Pro AI Tutor when feedback latency blocks you.",
                    "Degrees open some doors faster — but demonstrations kick them open too. Your twelve-week roadmap is a contract with yourself, not a fantasy timeline.",
                ],
            },
        ],
        takeaway:
            "You can learn AI without a computer science degree by stacking literacy, light code, automations, and public case studies — especially when you pair domain expertise with evaluated workflows. Start today with one prompt tutorial and forty-five daily minutes.",
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
            {
                question: "Should I go back to school for AI?",
                answer:
                    "Only if your target role explicitly requires it. Many career changers succeed with projects plus selective certificates.",
            },
            {
                question: "How do I talk about self-taught AI in interviews?",
                answer:
                    "Tell stories with metrics and tradeoffs — what you automated, how you evaluated, what you would improve next.",
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
        readTime: "20 min read",
        publishedAt: D8,
        tutorialPath: "/tutorials/liquid",
        coverImage: "/blog/code-with-ai.jpg",
        coverAlt: "Shopify theme code editor showing Liquid template tags",
        hook:
            "The merchant wanted product badges on collection pages — “Sale,” “New,” “Low stock” — but every tutorial assumed Ruby or React. Shopify Liquid tutorial for beginners starts simpler: read `product.title`, wrap it in an `if`, preview in a duplicated theme, breathe.",
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
        chapters: [
            {
                title: "Liquid is HTML’s dynamic layer",
                paragraphs: [
                    "Shopify Liquid is the templating language themes use to render products, collections, carts, and customer data. It is not a separate app platform — it lives inside your theme files, interleaved with HTML and CSS.",
                    "Beginners should think of Liquid as print statements and simple logic wrapped around markup: show this badge if inventory is low, loop variants, format money with filters. You are not building a backend; you are shaping storefront HTML safely.",
                    "A Shopify Liquid tutorial for beginners succeeds when you edit a development theme, preview changes, and rollback without touching production — fear of breaking the live store stops more learners than syntax ever does.",
                ],
            },
            {
                title: "Objects, tags, and filters",
                paragraphs: [
                    "Objects like `product`, `collection`, and `cart` expose properties — `product.title`, `product.price`. Tags control flow: `if`, `for`, `case`. Filters transform output: `money`, `escape`, `date`.",
                    "Modern themes organize reusable chunks into sections and snippets; JSON templates wire sections to pages. You will read more Liquid than you write at first — that reading skill prevents copy-paste disasters.",
                    "Start by printing safe properties on a product template. Add a simple `if` for tags or availability. Apply one filter and inspect HTML source in the browser.",
                ],
                figure: {
                    src: "/blog/code-with-ai.jpg",
                    alt: "Liquid template snippet showing product object and if tag",
                    caption: "Objects output data; tags add logic; filters format values.",
                },
            },
            {
                title: "Your first safe edits",
                paragraphs: [
                    "Duplicate the live theme in Shopify admin — never experiment on production first. Locate the product template or a section file your theme documents.",
                    "Insert a visible but harmless change — a test paragraph — preview, confirm, remove. Confidence comes from reversible steps.",
                    "Implement the merchant request: badges, metafield text, or collection-specific copy. Keep logic readable; comment why an `if` exists when non-obvious.",
                ],
                list: [
                    "Duplicate theme → edit section/template",
                    "Print object properties",
                    "Add conditional tags",
                    "Use filters for money and escaping",
                    "Preview on mobile and desktop",
                ],
                tip: "Use AI to explain a Liquid tag you do not recognize — then verify against Shopify’s Liquid reference before shipping.",
            },
            {
                title: "What to learn next",
                paragraphs: [
                    "HTML and CSS remain prerequisites — Liquid without layout skill produces brittle themes. JavaScript helps for cart drawers and interactive sections; Ruby is not required for standard theme customization.",
                    "Complete the free Shopify Liquid tutorial track on Sturdee, then explore related Shopify blog posts for merchandising patterns and performance tips.",
                    "When you graduate from snippets to full sections, document your changes for merchants — future you will thank present you during holiday traffic spikes.",
                ],
            },
        ],
        takeaway:
            "Shopify Liquid for beginners is readable templates plus cautious theme duplication: objects, tags, filters, preview, ship. Master small edits before ambitious rewrites — and keep production sacred until previews lie.",
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
            {
                question: "Can I break my store with Liquid?",
                answer:
                    "Syntax errors can break theme previews. Work on duplicated themes and fix errors before publishing.",
            },
            {
                question: "Where is Liquid documented?",
                answer:
                    "Shopify’s Liquid reference and theme docs are authoritative. Cross-check AI explanations against them.",
            },
            {
                question: "Should I use Online Store 2.0 sections?",
                answer:
                    "Yes for modern themes — sections and JSON templates are the standard customization path.",
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
        readTime: "21 min read",
        publishedAt: D9,
        tutorialPath: "/tutorials/javascript",
        coverImage: "/blog/code-with-ai.jpg",
        coverAlt: "Interactive JavaScript tutorial with runnable examples in the browser",
        hook:
            "Chris watched three JavaScript crash courses and still could not write a function without pausing the video. The turning point was an interactive lesson: change one line, see the error, fix it, run again — no narrator, no skipping ahead. That is how a JavaScript tutorial for beginners should feel.",
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
        chapters: [
            {
                title: "Passive watching versus interactive reps",
                paragraphs: [
                    "JavaScript rewards fingers-on-keyboard time. Videos introduce ideas; exercises convert them into memory. A JavaScript tutorial for beginners should make you run code, break it, and read errors — not copy slide decks.",
                    "Free interactive lessons on Sturdee follow that loop: concept, example, challenge, instant feedback. Pair them with tiny daily builds so syntax becomes automatic.",
                    "If you only consume content, you will feel familiarity without competence — the worst pre-interview emotion.",
                ],
                figure: {
                    src: "/blog/code-with-ai.jpg",
                    alt: "Beginner editing JavaScript in an interactive tutorial pane",
                    caption: "Run code after every concept — errors are part of the curriculum.",
                },
            },
            {
                title: "Core ideas in the right order",
                paragraphs: [
                    "Start with values, `let`/`const`, and types — what JavaScript actually stores. Move to functions and return values — how you organize logic.",
                    "Arrays and objects model real data from APIs and forms. DOM selection and events connect JavaScript to HTML you write. Async basics with `fetch` prepare you for modern apps.",
                    "Add AI explanations only after you attempt exercises. AI excels at translating stack traces; it stunts growth when it writes every solution before you try.",
                ],
                list: [
                    "Values, variables, and types",
                    "Functions and control flow",
                    "Arrays, objects, and iteration",
                    "DOM events and basic fetch",
                    "Reading stack traces calmly",
                ],
            },
            {
                title: "A free interactive study plan",
                paragraphs: [
                    "Complete Sturdee intro lessons in order — resist jumping to React. Rebuild examples from memory the next day.",
                    "Ship a tiny interactive page: button clicks, form validation, or a fetch to a public API. Keep scope embarrassing small; finishing matters.",
                    "Maintain a bugs journal: error message, wrong assumption, fix. Patterns repeat across careers.",
                ],
                tip: "When stuck more than fifteen minutes, ask AI for a hint — not the full answer — then return to the editor.",
            },
            {
                title: "What comes after basics",
                paragraphs: [
                    "TypeScript, frameworks, and tooling come after you can write functions and debug DOM code without a tutorial open.",
                    "Use /learn/coding-free for orientation and career context; use /tutorials/javascript for daily reps.",
                    "Optional Pro AI Tutor helps on stuck moments — but the reps still happen in your fingers, not the chat window.",
                ],
            },
        ],
        takeaway:
            "The best JavaScript tutorial for beginners is interactive, ordered, and repetitive: run code daily, rebuild examples, ship micro-projects, and use AI as interpreter — not author — until basics feel boring.",
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
            {
                question: "Is JavaScript still worth learning with AI?",
                answer:
                    "Yes. AI generates JS; humans maintain, secure, and debug it. Fundamentals differentiate hireable developers.",
            },
            {
                question: "How much time per day?",
                answer:
                    "Thirty to forty-five focused minutes beats occasional multi-hour cram sessions.",
            },
            {
                question: "Where do I practice for free?",
                answer:
                    "Open /tutorials/javascript on Sturdee and follow lessons sequentially; supplement with /learn/coding-free.",
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
        readTime: "20 min read",
        publishedAt: D10,
        tutorialPath: "/learn/web-development",
        coverImage: "/blog/learning-path.jpg",
        coverAlt: "Structured free course path for HTML CSS and JavaScript",
        hook:
            "Bootcamp brochures promised a single invoice and a job — but the invoice arrived before the first project shipped. Taylor rebuilt the same syllabus with free Sturdee tracks: HTML module, CSS module, JavaScript module, portfolio project, public case study. Same shape, no paywall.",
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
        chapters: [
            {
                title: "Module mindset without tuition",
                paragraphs: [
                    "An HTML CSS JavaScript free course experience is about sequencing: finish HTML structure, then CSS layout, then JavaScript behavior — each module ending in a visible project milestone.",
                    "Paid bootcamps sell intensity and accountability. You can simulate intensity with time-boxed modules and simulate accountability with public GitHub commits and cohort check-ins.",
                    "Sturdee tutorial tracks are the course modules; /learn/web-development is the syllabus glue. You pay with schedule discipline, not upfront tuition.",
                ],
                figure: {
                    src: "/blog/learning-path.jpg",
                    alt: "Module order for HTML then CSS then JavaScript projects",
                    caption: "Three language modules, three portfolio checkpoints, one capstone page.",
                },
            },
            {
                title: "What you learn in each module",
                paragraphs: [
                    "HTML: semantics, forms, accessibility basics — structure humans and machines can parse.",
                    "CSS: layout with Flexbox and Grid, responsive typography, color, and spacing — making structure legible on phones and desktops.",
                    "JavaScript: DOM interaction, events, fetch — turning static pages into tools people click.",
                ],
                list: [
                    "HTML structure and semantics",
                    "CSS layout and responsive design",
                    "JavaScript interactivity and fetch",
                    "Accessibility checkpoints each module",
                    "Optional AI-assisted review after hand-built work",
                ],
            },
            {
                title: "Project checklist that proves completion",
                paragraphs: [
                    "Project one: semantic multi-section page — resume, product, or event — no CSS framework required.",
                    "Project two: responsive styling with a mobile-first pass and keyboard-navigable menus.",
                    "Project three: JavaScript enhancement — theme toggle, form validation, or API-driven section.",
                    "Run an accessibility pass: headings, labels, focus, contrast. Write a short case study blog post about what you learned — hiring managers read those.",
                ],
            },
            {
                title: "Bootcamp gaps you can fill for free",
                paragraphs: [
                    "Career services and mock interviews are bootcamp perks — seek communities, cohorts, and peer review to approximate them.",
                    "Add React only after DOM and JavaScript fundamentals feel boring — usually after several small projects, not after day three.",
                    "Link modules explicitly: /tutorials/html, /tutorials/css, /tutorials/javascript, and /learn/web-development. Your free course-style path becomes real when URLs are calendar events, not bookmarks.",
                ],
                tip: "Publish each module project on GitHub with a README screenshot — visual proof beats a certificate PDF alone.",
            },
        ],
        takeaway:
            "An HTML CSS JavaScript free course-style path is modules plus projects plus public proof. Use Sturdee tracks as curriculum, time-box your weeks, and add cohort accountability when solo study fades — foundations first, frameworks later.",
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
            {
                question: "How long should each module take?",
                answer:
                    "Often two to three weeks per language at part-time pace — adjust based on prior exposure.",
            },
            {
                question: "Do I need design skills?",
                answer:
                    "Basic taste helps, but focus on semantics, layout, and accessibility first. Copy simple references honestly.",
            },
            {
                question: "Can AI replace this path?",
                answer:
                    "AI can review and accelerate, but hand-built projects prove you can maintain what ships — keep fundamentals human-verified.",
            },
        ],
    },
];
