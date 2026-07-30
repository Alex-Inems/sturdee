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

export const SKILLS: Skill[] = [
    {
        id: "web-development",
        title: "Web Development",
        blurb: "Build sites and apps with HTML, CSS, JavaScript, and modern frameworks.",
        summary:
            "Learn to ship real websites and web apps — from clean HTML structure to interactive frontends and simple backends.",
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
                title: "Modern frontend frameworks",
                description: "Component thinking with React/Next.js patterns — state, props, routing, and reusable UI.",
            },
            {
                title: "Deploying a live project",
                description: "Git basics, hosting, environment variables, and putting a portfolio project online.",
            },
            {
                title: "Forms, auth & data flow",
                description: "Collect user input safely, talk to APIs, and understand how frontends connect to backends.",
            },
        ],
    },
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
        id: "project-management",
        title: "Project Management",
        blurb: "Plan delivery, run standups, and keep teams shipping on time.",
        summary:
            "Run projects with clarity — scope, timelines, risk, and communication so work actually finishes.",
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
                title: "Agile rituals that matter",
                description: "Standups, sprint planning, retros — run them tightly without meeting bloat.",
            },
            {
                title: "Tools: boards & trackers",
                description: "Kanban/sprint boards, priorities, and status that stays honest.",
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
        title: "Product Management",
        blurb: "Shape roadmaps, talk to users, and turn ideas into shipped features.",
        summary:
            "Think like a product manager — discover real problems, prioritize ruthlessly, and ship value.",
        accent: "from-amber-400/20 to-transparent",
        topics: [
            {
                title: "User discovery & interviews",
                description: "Ask better questions, find jobs-to-be-done, and separate wants from needs.",
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
                title: "Working with design & engineering",
                description: "Collaborate on UX, estimate work, and negotiate scope without killing quality.",
            },
            {
                title: "Launch, metrics & iteration",
                description: "Ship, measure adoption, read feedback, and decide what to build next.",
            },
        ],
    },
    {
        id: "virtual-assistant",
        title: "Virtual Assistant",
        blurb: "Master inbox, calendar, research, and client ops at a pro level.",
        summary:
            "Become a reliable remote VA — communication, organization, and tools that keep clients moving.",
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
                title: "Research & briefings",
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
                title: "Tools stack for VAs",
                description: "Notion, Slack, CRM basics, AI helpers, and automations that save hours weekly.",
            },
        ],
    },
];

export function getSkill(id: string): Skill | undefined {
    return SKILLS.find((s) => s.id === id);
}

export function skillBookingServiceName(skill: Skill): string {
    return `${skill.title} — 1:1 skill session`;
}
