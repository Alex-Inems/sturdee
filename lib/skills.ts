export type SkillTopic = {
    title: string;
    description: string;
};

export type Skill = {
    id: string;
    title: string;
    blurb: string;
    summary: string;
    accent: string;
    topics: SkillTopic[];
};

/** AI-first catalog — lead with AI-native paths, then AI-augmented careers. */
export const SKILLS: Skill[] = [
    {
        id: "ai-automation",
        title: "AI Automation",
        blurb: "Wire prompts, agents, and workflows that cut repetitive work.",
        summary:
            "Use AI tools to automate busywork — from strong prompting to multi-step workflows you can run every day.",
        accent: "from-teal-500/15 to-transparent",
        topics: [
            {
                title: "Prompt engineering that works",
                description: "Clear instructions, examples, constraints, and iteration so outputs are reliable.",
            },
            {
                title: "ChatGPT / Claude for daily work",
                description: "Drafting, research, summarizing, rewriting, and building personal playbooks.",
            },
            {
                title: "Automation workflows",
                description: "Connect tools (email, sheets, CRMs, Slack) so tasks run without manual copy-paste.",
            },
            {
                title: "AI agents & assistants",
                description: "When to use agents, tools, and memory — and how to keep them on-task.",
            },
            {
                title: "Document & data pipelines",
                description: "Extract, clean, and transform text or spreadsheets with AI-assisted steps.",
            },
            {
                title: "Quality, safety & review",
                description: "Spot hallucinations, add human checkpoints, and measure time saved.",
            },
        ],
    },
    {
        id: "prompt-engineering",
        title: "Prompt Engineering",
        blurb: "Design prompts that get reliable, production-ready outputs every time.",
        summary:
            "Go beyond casual chat — structure prompts, evaluate outputs, and build reusable prompt systems for teams.",
        accent: "from-violet-500/15 to-transparent",
        topics: [
            {
                title: "Prompt anatomy",
                description: "Roles, context, constraints, formats, and examples that steer models clearly.",
            },
            {
                title: "Few-shot & chain-of-thought",
                description: "When examples and step-by-step reasoning improve accuracy — and when they don't.",
            },
            {
                title: "Structured outputs",
                description: "JSON, tables, rubrics, and schemas so downstream tools can consume results.",
            },
            {
                title: "Evaluation & iteration",
                description: "Test sets, failure modes, and a loop that improves prompts systematically.",
            },
            {
                title: "System prompts & guardrails",
                description: "Tone, safety, tool use, and policies that keep assistants on-brand.",
            },
            {
                title: "Team prompt libraries",
                description: "Version, share, and document prompts so quality doesn't live in one person's chat.",
            },
        ],
    },
    {
        id: "ai-agents",
        title: "Building with AI Agents",
        blurb: "Design agents that use tools, memory, and multi-step plans safely.",
        summary:
            "Learn when agents beat simple prompts — tool calling, planning, memory, and human-in-the-loop controls.",
        accent: "from-cyan-500/15 to-transparent",
        topics: [
            {
                title: "Agents vs chatbots",
                description: "When a single prompt is enough — and when you need plans, tools, and loops.",
            },
            {
                title: "Tool calling & APIs",
                description: "Connect models to search, calendars, CRMs, and code safely.",
            },
            {
                title: "Planning & multi-step tasks",
                description: "Break goals into steps, recover from failure, and keep agents on track.",
            },
            {
                title: "Memory & context windows",
                description: "What to store, what to forget, and how to avoid context bloat.",
            },
            {
                title: "Human-in-the-loop",
                description: "Approvals, escalations, and checkpoints for high-stakes actions.",
            },
            {
                title: "Eval, cost & reliability",
                description: "Measure success, control spend, and ship agents you can trust.",
            },
        ],
    },
    {
        id: "web-development",
        title: "Web Dev with AI",
        blurb: "Ship sites and apps faster — with AI copilots in your workflow.",
        summary:
            "Build real websites and web apps while using AI for scaffolding, debugging, and shipping — without skipping fundamentals.",
        accent: "from-emerald-500/15 to-transparent",
        topics: [
            {
                title: "HTML & semantic structure",
                description: "Pages, forms, accessibility basics, and content that search engines and screen readers understand.",
            },
            {
                title: "CSS layout & responsive design",
                description: "Flexbox, Grid, spacing systems, and mobile-first layouts that look sharp on every screen.",
            },
            {
                title: "JavaScript fundamentals",
                description: "Variables, functions, DOM updates, fetch/API calls, and debugging in the browser.",
            },
            {
                title: "AI-assisted coding",
                description: "Use copilots for boilerplate, reviews, and explanations — while you still own the architecture.",
            },
            {
                title: "Modern frontend frameworks",
                description: "Component thinking with React/Next.js patterns — state, props, routing, and reusable UI.",
            },
            {
                title: "Deploying a live project",
                description: "Git basics, hosting, environment variables, and putting a portfolio project online.",
            },
        ],
    },
    {
        id: "project-management",
        title: "AI for Project Managers",
        blurb: "Plan delivery and run teams — with AI for status, risk, and reports.",
        summary:
            "Run projects with clarity — and use AI to draft updates, surface risks, and keep timelines honest.",
        accent: "from-sky-500/12 to-transparent",
        topics: [
            {
                title: "Scoping & kickoff",
                description: "Goals, deliverables, stakeholders, and a kickoff that prevents mid-project chaos.",
            },
            {
                title: "Work breakdown & timelines",
                description: "Tasks, estimates, milestones, and realistic schedules people can follow.",
            },
            {
                title: "AI status & reporting",
                description: "Turn messy notes into clear updates, risk logs, and stakeholder briefs.",
            },
            {
                title: "Agile rituals that matter",
                description: "Standups, sprint planning, retros — run them tightly without meeting bloat.",
            },
            {
                title: "Risk, blockers & change",
                description: "Surface risks early, escalate blockers, and manage scope changes without drama.",
            },
            {
                title: "Stakeholder updates",
                description: "Clear status reports, demos, and decisions so leadership stays aligned.",
            },
        ],
    },
    {
        id: "product-management",
        title: "AI for Product Managers",
        blurb: "Shape roadmaps and talk to users — with AI for research and specs.",
        summary:
            "Think like a product manager — and use AI to synthesize research, draft PRDs, and prioritize faster.",
        accent: "from-amber-400/20 to-transparent",
        topics: [
            {
                title: "User discovery & interviews",
                description: "Ask better questions, find jobs-to-be-done, and separate wants from needs.",
            },
            {
                title: "AI research synthesis",
                description: "Cluster feedback, spot themes, and turn interviews into actionable insights.",
            },
            {
                title: "Problem framing & PRDs",
                description: "Write crisp problem statements, success metrics, and lightweight specs.",
            },
            {
                title: "Prioritization frameworks",
                description: "RICE, impact/effort, and roadmap trade-offs when everything feels urgent.",
            },
            {
                title: "Roadmaps & storytelling",
                description: "Now / next / later roadmaps that teams and executives both understand.",
            },
            {
                title: "Launch, metrics & iteration",
                description: "Ship, measure adoption, read feedback, and decide what to build next.",
            },
        ],
    },
    {
        id: "virtual-assistant",
        title: "AI-Powered Virtual Assistant",
        blurb: "Master inbox, calendar, and ops — with AI helpers that multiply output.",
        summary:
            "Become a reliable remote VA — and use AI for drafts, research, and automations that save hours weekly.",
        accent: "from-lime-400/15 to-transparent",
        topics: [
            {
                title: "Inbox & email mastery",
                description: "Triage, templates, tone, and follow-ups that make clients look professional.",
            },
            {
                title: "Calendar & scheduling",
                description: "Time zones, booking links, conflict handling, and protecting deep-work time.",
            },
            {
                title: "AI research & briefings",
                description: "Fast, accurate research with clear summaries your client can act on.",
            },
            {
                title: "Docs, sheets & file systems",
                description: "Organize drives, trackers, SOPs, and handoffs so nothing gets lost.",
            },
            {
                title: "Client communication",
                description: "Daily updates, boundaries, SLAs, and how to raise issues early.",
            },
            {
                title: "AI tools stack for VAs",
                description: "Notion, Slack, CRM basics, AI helpers, and automations that save hours weekly.",
            },
        ],
    },
];

export function getSkill(id: string): Skill | undefined {
    return SKILLS.find((s) => s.id === id);
}

export function skillBookingServiceName(skill: Skill): string {
    return `${skill.title} — skill cohort`;
}

export function skillIds(): string[] {
    return SKILLS.map((s) => s.id);
}
