import type { BlogTopicPatch } from "./types";

export const AI_TOPIC_PATCHES_ZH: Record<string, BlogTopicPatch> = {
    "learn-artificial-intelligence-free-beginners-guide": {
        title: "免费学人工智能 — 初学者指南（2026）",
        seoTitle: "免费学人工智能 — 完整初学者指南",
        description:
            "免费学人工智能的清晰路径：概念、提示词、免费课程与练习。无需学位或付费训练营即可入门 AI，按周循序渐进建立实战能力。",
        focusKeyword: "免费学人工智能",
        keywords: [
            "免费学人工智能",
            "免费学 AI",
            "人工智能入门",
            "免费 AI 课程",
            "如何学习人工智能",
        ],
        readTime: "14 分钟阅读",
        headings: {
            intro: "可以免费学人工智能吗？",
            concepts: "初学者应先学什么",
            steps: "免费 AI 学习路径（按周）",
            practice: "在 Sturdee 练习 AI 技能",
            faq: "免费学 AI — 常见问题",
        },
        intro:
            "可以 — 2026 年你仍能免费学人工智能。不必有计算机学位。先理解模型如何响应指令，再练习提示词、自动化与轻量编程教程。证书与 Pro 导师可之后再选。",
        whyItMatters:
            "「学人工智能」是高意图搜索。许多初学者被先讲数学的课程吓退。免费、实践导向的路径（提示词、工具、轻代码）更易转化为真实技能。",
        deepDive:
            "把学 AI 当作学语言：每天短练胜过周末突击。需要读写代码时用免费 HTML/Python 教程，再把 AI 应用到这些任务。",
        concepts: [
            "模型预测 token — 清晰指令胜过模糊提问",
            "提示词工程是最值得每天练的免费技能",
            "能稳定描述任务后再学自动化与智能体",
            "轻量 Python/JS 解锁 API 与评估",
            "自学停滞时可加入直播 cohort 增加约束",
        ],
        steps: [
            "第 1 周：了解 LLM 能/不能做什么；写 20 个带约束的提示词",
            "第 2 周：角色、few-shot、结构化输出等模式",
            "第 3 周：选一个工作流（邮件、调研、代码审查）并自动化",
            "第 4 周：跟免费编程 track（Python 或 JavaScript）",
            "第 5 周+：加入直播 AI cohort 或用 AI Tutor 反馈",
        ],
        mistakes: [
            "先用大量线性代数而不是先用工具",
            "把 ChatGPT 回答当事实不核实",
            "不做评估 — 从不衡量提示词质量",
            "免费练习未穷尽就买昂贵课程",
        ],
        practice:
            "从 /learn/ai 开始，浏览免费 AI 技能路径，每天练提示词。需要读/跑代码时配合免费编程教程。",
        faq: [
            {
                question: "2026 年免费学 AI 现实吗？",
                answer: "现实。免费教程、开放课程与练习工具覆盖基础。证书与一对一辅导是可选升级。",
            },
            {
                question: "需要先会编程吗？",
                answer: "提示词与 AI 素养不需要。要做智能体、API 或评估流水线则需要 — 可并行学编程。",
            },
            {
                question: "多久能到就业水平？",
                answer: "AI 素养可能几周；应用型岗位通常要数月项目。聚焦工作流作品集，而非只有证书。",
            },
        ],
    },
    "prompt-engineering-course-free-complete-tutorial": {
        title: "免费提示词工程课程 — 完整教程",
        seoTitle: "免费提示词工程课程 — 2026 完整教程",
        description:
            "免费提示词工程课程：角色、约束、少样本、思维链与结构化输出。用真实可复用提示词练习，建立可评估的提示词工作流。",
        focusKeyword: "免费提示词工程课程",
        keywords: [
            "免费提示词工程课程",
            "提示词工程教程",
            "学习提示词工程",
            "提示词工程入门",
            "ChatGPT 提示词工程",
        ],
        readTime: "16 分钟阅读",
        headings: {
            intro: "什么是提示词工程？",
            concepts: "核心提示词模式",
            steps: "如何免费练习提示词工程",
            code: "结构化提示词模板",
            practice: "继续 Sturdee 提示词路径",
            faq: "提示词工程课程 — 常见问题",
        },
        intro:
            "提示词工程是编写指令以从大语言模型获得稳定结果。免费课程应教可复用模式 — 不是魔法词。掌握角色、约束、示例与输出格式，然后评估。",
        whyItMatters:
            "品牌课程占据部分搜索；「免费提示词工程课程」等长尾仍奖励带示例与 FAQ 的实用指南。",
        deepDive:
            "好提示词明确受众、目标、约束与格式。差提示词只说「写点关于 X 的东西」。把每个提示词当迷你产品说明，再衡量是否达标。",
        concepts: [
            "角色 + 任务 + 约束 + 格式",
            "少样本示例优于抽象说明",
            "思维链用于推理任务（在有帮助时）",
            "结构化输出（JSON、表格）便于接工具",
            "评估：量表、抽检与回归提示集",
        ],
        steps: [
            "为每周真实任务写基线提示词",
            "添加角色与成功标准",
            "加入 2–3 个好输出 few-shot 示例",
            "强制结构化格式（列表或 JSON）",
            "保存 10 条回归提示，改动后重测",
        ],
        code: { title: "可复用提示词骨架" },
        mistakes: [
            "一条巨大模糊提示无格式",
            "风格任务不给示例",
            "不检查就接受第一次回答",
            "简单查询滥用思维链",
        ],
        practice:
            "打开 Prompt Engineering 技能路径与 /learn/prompt-engineering。Pro 可用 Practice Coach 做分级练习。",
        faq: [
            {
                question: "这门提示词课程真的免费吗？",
                answer: "Sturdee 技能路径与本教程免费阅读。AI 分级练习需 Sturdee Pro。",
            },
            {
                question: "模型更强后提示词工程还重要吗？",
                answer: "重要。更清晰指令仍减少错误、控制语气并产出结构化工作流输出。",
            },
            {
                question: "与 ChatGPT 技巧清单有何不同？",
                answer: "技巧是一次性的。课程教可迁移的模式、评估与迭代。",
            },
        ],
    },
    "free-generative-ai-courses-with-certificates-2026": {
        title: "免费生成式 AI 课程（含证书选项）2026",
        seoTitle: "2026 免费生成式 AI 课程 — 证书对比",
        description:
            "对比 2026 免费生成式 AI 课程：完全免费、免费旁听付费证书与厂商徽章。搭建可今天开始的实用 GenAI 学习路径。",
        focusKeyword: "免费生成式 AI 课程",
        keywords: [
            "免费生成式 AI 课程",
            "免费 AI 课程 证书",
            "生成式 AI 免费课程",
            "2026 最佳免费 AI 课程",
            "GenAI 入门",
        ],
        readTime: "12 分钟阅读",
        headings: {
            intro: "生成式 AI 课程里「免费」指什么",
            concepts: "免费 GenAI 学习类型",
            steps: "如何选择免费 GenAI 路径",
            practice: "在 Sturdee 免费学 GenAI",
            faq: "免费生成式 AI 课程 — 常见问题",
        },
        intro:
            "搜免费生成式 AI 课程常遇到付费证书墙。2026 年「免费」通常指：学习+证书都免费、旁听免费证书付费，或仅试用。报名前先明确需求。",
        whyItMatters:
            "该查询商业意图强。要诚实对比并给出读者今天就能开始的免费路径。",
        deepDive:
            "若要可分享证书，优先有免费完成徽章的平台。若要技能，优先练习量：提示词、项目与反馈。",
        concepts: [
            "完全免费学习 + 免费证书",
            "免费旁听 / 付费证书（Coursera 常见）",
            "Google、Microsoft、AWS 等厂商徽章",
            "项目作品集对许多招聘者胜过证书",
            "GenAI 理论配每日提示词练习",
        ],
        steps: [
            "决定：只要技能还是必须要证书",
            "开始免费 GenAI 入门（概念+提示词）",
            "完成一个应用项目（研究助手、代码助手、内容流程）",
            "公开记录提示词与结果",
            "项目后再可选添加免费/付费证书",
        ],
        practice: "用 /learn/ai 与免费教程建立 GenAI 素养，需要约束时可报直播 cohort。",
        faq: [
            {
                question: "免费 GenAI 课程值得吗？",
                answer: "对基础值得。配合项目展示应用能力，而不只是完课。",
            },
            {
                question: "雇主在意 AI 证书吗？",
                answer: "有时。更多人看演示：自动化工作流、评估过的提示词、上线的小工具。",
            },
        ],
    },
    "learn-to-code-with-ai-beginners-guide": {
        title: "用 AI 学编程 — 初学者指南",
        seoTitle: "用 AI 学编程 — 2026 免费入门指南",
        description:
            "用 AI 学编程而不外包思考。免费 HTML、JavaScript、Python 互动教程，配合 AI 导师解释与调试，建立可持续的编程习惯。",
        focusKeyword: "用 AI 学编程",
        keywords: [
            "用 AI 学编程",
            "AI 编程导师",
            "用 ChatGPT 学编程",
            "AI 结对编程 入门",
            "免费 AI 编程",
        ],
        readTime: "13 分钟阅读",
        headings: {
            intro: "初学者该用 AI 学编程吗？",
            concepts: "健康的 AI + 编程习惯",
            steps: "免费「AI 学编程」Routine",
            mistakes: "阻碍进步的 AI 编程误区",
            practice: "免费编程教程 + AI Tutor",
            faq: "用 AI 学编程 — 常见问题",
        },
        intro:
            "用 AI 学编程有效，当 AI 解释与审阅 — 而不是替你写全部。用免费互动教程刻意练习，卡住时再问 AI 导师为何失败。",
        whyItMatters:
            "「用 AI 学编程」介于编程教育与 AI 工具之间。教流程（读错→假设→问 AI→重写）的文章优于泛泛 ChatGPT 技巧。",
        deepDive:
            "经验法则：AI 帮完后若不能逐行解释代码，就自己重写。记录你修过的 bug 日记。",
        concepts: [
            "AI 用于解释与 rubber duck",
            "代码仍由你输入与运行",
            "先要提示再要完整解",
            "用文档与测试验证 AI 代码",
            "每周小项目先不用 AI 出初稿",
        ],
        steps: [
            "选一个免费 track（HTML/CSS 或 Python）",
            "先独立完成一课",
            "卡住 15 分钟以上再用 AI",
            "让 AI 考你刚学的内容",
            "交付小项目（页面、脚本或 API 调用）",
        ],
        mistakes: [
            "粘贴不理解的 AI 代码",
            "跳过基础（变量、控制流、DOM）",
            "从不读错误信息",
            "未学语法就要完整应用",
        ],
        practice: "从 /tutorials 开始，需要时用 /ai（Pro）按需获得 AI 编程导师。",
        faq: [
            {
                question: "AI 会取代学编程吗？",
                answer: "不会。AI 加速能规格化、调试与评估的人 — 这些仍要练习。",
            },
            {
                question: "用 AI 先学哪种语言？",
                answer: "JavaScript 或 Python。免费教程多，且适合 AI 讲解。",
            },
        ],
    },
    "how-to-write-better-chatgpt-prompts-examples": {
        title: "如何写出更好的 ChatGPT 提示词（含示例）",
        seoTitle: "更好的 ChatGPT 提示词 — 示例与模板",
        description:
            "写出更好的 ChatGPT 提示词：角色、约束、格式与迭代。复制可用于编程、写作与学习的模板，提升提示词工程 SEO 实践。",
        focusKeyword: "更好的 ChatGPT 提示词",
        keywords: [
            "更好的 ChatGPT 提示词",
            "ChatGPT 提示词示例",
            "如何写 ChatGPT 提示词",
            "ChatGPT 提示词 入门",
            "提示词模板",
        ],
        readTime: "11 分钟阅读",
        headings: {
            intro: "为什么大多数 ChatGPT 提示词失败",
            concepts: "强提示词的要素",
            code: "可复制提示词示例",
            steps: "像专业人士一样迭代提示词",
            practice: "在 Sturdee 练习提示词",
            faq: "ChatGPT 提示词 — 常见问题",
        },
        intro:
            "更好的 ChatGPT 提示词要具体：角色、受众、约束与输出格式。模糊提示得到模糊答案 — 然后人们怪模型。",
        whyItMatters:
            "ChatGPT 教程搜索量大。新鲜示例与模板获点击并支撑提示词工程 hub。",
        deepDive:
            "公开迭代：保留 v1、v2 与最终版，记录改动 — 习惯可迁移到 Claude、Gemini 与本地 LLM。",
        concepts: [
            "具体性胜过花哨措辞",
            "约束减少幻觉",
            "示例锁定风格与结构",
            "缺数据时要求说明假设",
            "事实类任务要求引用或来源",
        ],
        code: { title: "学习与编程提示词示例" },
        steps: [
            "用一句话说明目标",
            "加受众与约束",
            "展示一个好输出示例",
            "运行、批评、收紧提示词",
            "把优胜版存入提示库",
        ],
        practice: "在 Prompt Engineering 技能页练习。升级 Pro 可让 AI Tutor 点评提示词。",
        faq: [
            {
                question: "ChatGPT 提示词应该多长？",
                answer: "长到能定义成功即可。许多好提示词约 80–200 词且结构清晰。",
            },
            {
                question: "用自定义 GPT 还是纯提示词？",
                answer: "先从可复用提示词开始。常重复相同系统指令时再考虑自定义 GPT。",
            },
        ],
    },
    "ai-agents-explained-for-beginners-practical-guide": {
        title: "AI 智能体入门 — 实用指南",
        seoTitle: "AI 智能体入门 — 实用解释",
        description:
            "AI 智能体简明解释：工具、规划、记忆与循环。了解何时需要智能体 — 以及何时单个提示词已足够完成目标。",
        focusKeyword: "AI 智能体 解释",
        keywords: [
            "AI 智能体 解释",
            "什么是 AI 智能体",
            "AI 智能体 入门",
            "自主 AI 智能体",
            "学习 AI 智能体",
        ],
        readTime: "12 分钟阅读",
        headings: {
            intro: "什么是 AI 智能体？",
            concepts: "智能体的构建块",
            steps: "搭建迷你智能体工作流",
            mistakes: "初学者智能体陷阱",
            practice: "在 Sturdee 学智能体",
            faq: "AI 智能体 — 常见问题",
        },
        intro:
            "AI 智能体用模型规划步骤、调用工具并循环直到达成目标。不同于单次 ChatGPT 回复，它可在步骤间搜索、写文件或调 API。",
        whyItMatters:
            "智能体 hype 超过理解。定义工具、规划与失败模式的入门文能排「AI 智能体解释」并支撑技能路径。",
        deepDive:
            "从单工具智能体（搜索或计算器）开始，再谈多智能体群。多数业务价值是有日志的可靠循环 — 非最大自治。",
        concepts: [
            "目标 → 计划 → 调工具 → 观察 → 重复",
            "工具是模型可调用的函数",
            "记忆存中间结果",
            "护栏：步数上限、白名单、人工批准",
            "评估：任务成功率，而非感觉",
        ],
        steps: [
            "选窄目标（如总结 3 个 URL）",
            "给模型一个工具",
            "步数上限 5",
            "记录每次工具调用",
            "有副作用前人工批准",
        ],
        mistakes: [
            "生产数据上无限自治",
            "无日志或回放",
            "工具太多导致规划混乱",
            "跳过已够用的普通提示词",
        ],
        practice: "浏览 Sturdee AI 技能路径，在 AI Tutor 中练习带清晰约束的智能体目标。",
        faq: [
            {
                question: "智能体就是聊天机器人吗？",
                answer: "不是。聊天机器人单次（或轮次）回复。智能体规划并用工具完成多步目标。",
            },
            {
                question: "用智能体必须会编程吗？",
                answer: "有无代码构建器，但轻编程有助于理解工具、鉴权与评估。",
            },
        ],
    },
    "ai-automation-for-beginners-workflows-guide": {
        title: "AI 自动化入门 — 实用工作流",
        seoTitle: "AI 自动化入门 — 工作流指南",
        description:
            "AI 自动化入门：选重复任务、设计提示词、连接工具并用简单工作流衡量节省时间。适合初学者的可执行步骤与 FAQ。",
        focusKeyword: "AI 自动化 入门",
        keywords: [
            "AI 自动化 入门",
            "AI 自动化 工作流",
            "用 AI 自动化工作",
            "AI 效率 工作流",
            "学习 AI 自动化",
        ],
        readTime: "11 分钟阅读",
        headings: {
            intro: "什么是 AI 自动化？",
            concepts: "工作流构建块",
            steps: "本周自动化第一个任务",
            practice: "AI 自动化练习路径",
            faq: "AI 自动化 — 常见问题",
        },
        intro:
            "AI 自动化是把模型放进可重复工作流 — 不是一次性聊天。初学者应自动化烦人高频任务：摘要、初稿、分拣、调研包。",
        whyItMatters:
            "自动化关键词把学习者导向技能路径与 cohort。实用每周工作流胜过抽象「未来工作」文章。",
        deepDive:
            "映射为 输入 → 变换 → 输出 → 复核。AI 做变换；质量未证明前你负责复核。",
        concepts: [
            "触发器（定时、表单、收件箱）",
            "带变量的提示模板",
            "人工复核检查点",
            "指标：节省时间、错误率",
            "安全：勿向公共模型粘贴密钥",
        ],
        steps: [
            "列出每周重复的 5 项任务",
            "选最像模板的一项",
            "写清输出格式的提示",
            "运行 10 次并记录失败模式",
            "外发前加复核清单",
        ],
        practice: "浏览 Sturdee AI 自动化主题，在 Pro 用 AI Tutor 练提示模板。",
        faq: [
            {
                question: "初学者需要什么 AI 自动化工具？",
                answer: "先用 ChatGPT/Claude 加表格。提示稳定后再加 Zapier/Make 或脚本。",
            },
            {
                question: "工作数据做 AI 自动化安全吗？",
                answer: "遵守公司政策。企业版优先，消费级工具请脱敏个人数据。",
            },
        ],
    },
    "best-free-ai-tutorials-for-beginners-2026": {
        title: "2026 最佳免费 AI 教程（初学者）",
        seoTitle: "最佳免费 AI 教程 — 2026 指南",
        description:
            "2026 最佳免费 AI 教程：提示词、GenAI 基础、用 AI 学编程及先不付费的练习入口。含筛选标准与 Sturdee 起步路径。",
        focusKeyword: "免费 AI 教程 初学者",
        keywords: [
            "免费 AI 教程 初学者",
            "最佳免费 AI 教程",
            "AI 教程 免费",
            "初学者 AI 课程",
            "在线免费学 AI",
        ],
        readTime: "10 分钟阅读",
        headings: {
            intro: "我们如何挑选免费 AI 教程",
            concepts: "初学者应学什么",
            steps: "你的免费 AI 教程组合",
            practice: "在 Sturdee 免费开始",
            faq: "免费 AI 教程 — 常见问题",
        },
        intro:
            "最佳免费 AI 教程靠做中学：短课、示例与练习 — 不是 40 小时理论堆砌。优先提示词、GenAI 素养，再学一点编程。",
        whyItMatters:
            "「最佳免费」清单类搜索量大。用标准与清晰 Sturdee 路径建立信任，而非空泛 affiliate。",
        deepDive:
            "标准：可免费开始、适配 2026 模型、有练习、无套路试用。Sturdee /learn 与教程符合这些条件。",
        concepts: [
            "提示词工程教程",
            "GenAI 概念讲解",
            "配 AI 辅导的编程 track",
            "基础后再学智能体/自动化入门",
            "社区或 cohort 增加约束",
        ],
        steps: [
            "完成一个提示词工程教程",
            "完成免费 GenAI 概览",
            "用 AI 当教练做 5 节编程课",
            "交付一个迷你自动化工作流",
            "可选：加入直播 AI cohort",
        ],
        practice: "从 /learn/ai 开始，编程基础看 /tutorials。更深指南见 /blog。",
        faq: [
            {
                question: "YouTube AI 教程够吗？",
                answer: "适合概览。请配合动手练习以巩固技能。",
            },
            {
                question: "初学者该付费 AI 课吗？",
                answer: "不必先付。先用免费教程做项目；之后可为结构、证书或辅导付费。",
            },
        ],
    },
    "what-is-an-ai-tutor-and-how-it-helps-learning": {
        title: "什么是 AI 导师？如何学得更快",
        seoTitle: "什么是 AI 导师？益处与用法",
        description:
            "什么是 AI 导师？AI 辅导如何工作、何时胜过视频，以及如何结合 AI 导师、免费教程与真人 cohort 更高效学习。",
        focusKeyword: "什么是 AI 导师",
        keywords: [
            "什么是 AI 导师",
            "AI 导师",
            "学生 AI 辅导",
            "用 AI 导师学习",
            "AI 学习导师",
        ],
        readTime: "9 分钟阅读",
        headings: {
            intro: "什么是 AI 导师？",
            concepts: "AI 导师擅长什么",
            steps: "如何用 AI 导师学习",
            practice: "试用 Sturdee AI Tutor",
            faq: "AI 导师 — 常见问题",
        },
        intro:
            "AI 导师是基于聊天的教学助手，24/7 解释概念、测验并适应你的问题。它不能替代优秀人类教师 — 但填补视频与直播课之间的空白。",
        whyItMatters: "支撑 /ai 并覆盖「AI 导师」信息类搜索。",
        deepDive:
            "有效用法：按你的水平要解释、要测验、要分步推理。无效用法：不参与地「代做作业」。",
        concepts: [
            "苏格拉底式提示 vs 完整答案",
            "间隔复习测验",
            "当前课程上下文",
            "局限：幻觉与过时事实",
            "人类导师负责约束与细微反馈",
        ],
        steps: [
            "先学一节免费课",
            "让 AI 导师解释薄弱点",
            "要 5 题小测",
            "次日重做错题",
            "加入直播 cohort 做项目",
        ],
        practice: "打开 /ai 使用 Sturdee AI Tutor（Pro）。免费用户仍可通过教程与路径学习。",
        faq: [
            {
                question: "AI 导师够准确吗？",
                answer: "许多编程与提示词主题足够 — 但关键事实请核实。用于练习与解释，非唯一权威。",
            },
            {
                question: "AI 导师 vs 人类导师？",
                answer: "AI 随时可用、规模化成本低。人类擅长动机、职业建议与复杂项目反馈。",
            },
        ],
    },
    "python-for-ai-beginners-free-learning-path": {
        title: "AI 初学者 Python — 免费学习路径",
        seoTitle: "AI 初学者 Python — 2026 免费路径",
        description:
            "AI 初学者 Python：从基础到提示词与简单脚本的免费路径。只学 AI 工作真正需要的 Python，快速进入 API 与评估练习。",
        focusKeyword: "AI 初学者 Python",
        keywords: [
            "AI 初学者 Python",
            "免费学 Python 做 AI",
            "Python AI 教程 入门",
            "Python 机器学习 起步",
            "AI Python 基础",
        ],
        readTime: "12 分钟阅读",
        headings: {
            intro: "做 AI 需要多少 Python？",
            concepts: "AI 相关的 Python 基础",
            steps: "免费 Python → AI 路径",
            code: "提示词练习小脚本",
            practice: "Sturdee 免费 Python 教程",
            faq: "AI 用 Python — 常见问题",
        },
        intro:
            "入门 AI 不必学完 Python。聚焦变量、函数、列表/字典、文件与 HTTP。足以做提示脚本、简单评估与 API 调用。",
        whyItMatters: "连接编程教程与 AI hub — Python + AI 关键词内链。",
        deepDive:
            "先跳过深度 OOP 与算法。项目需要再加 NumPy/pandas。许多 GenAI 岗位 = 提示词 + API + 轻 Python。",
        concepts: [
            "函数与参数",
            "JSON 字典结构化数据",
            "环境变量存 API 密钥",
            "简单循环跑评估集",
            "虚拟环境管理依赖",
        ],
        steps: [
            "完成初学者 Python 教程（语法）",
            "写脚本格式化提示模板",
            "调用一次模型 API",
            "循环 10 个测试输入并保存输出",
            "用简单量表给输出打分",
        ],
        code: { title: "提示模板填充器" },
        practice: "跟 /tutorials/python，再在 AI 路径应用。调试脚本可用 AI Tutor（Pro）。",
        faq: [
            {
                question: "AI 初学者选 Python 还是 JavaScript？",
                answer: "AI/ML 默认 Python。若已做 web，JavaScript 也可 — 许多 AI 应用全栈 JS。",
            },
            {
                question: "要先学机器学习数学吗？",
                answer: "做 GenAI 应用不必。训练或研究模型再学数学。",
            },
        ],
    },
    "web-development-with-ai-free-guide": {
        title: "用 AI 做 Web 开发 — 免费初学者指南",
        seoTitle: "用 AI 做 Web 开发 — 免费入门",
        description:
            "用 AI 学 Web 开发：HTML、CSS、JavaScript 基础加 AI 辅助调试，不跳过基本功与无障碍检查，适合 2026 入门者。",
        focusKeyword: "用 AI 做 Web 开发",
        keywords: [
            "用 AI 做 Web 开发",
            "免费学 Web 开发",
            "Web 开发者 AI",
            "用 AI 建网站",
            "HTML CSS JavaScript AI",
        ],
        readTime: "11 分钟阅读",
        headings: {
            intro: "AI 时代的 Web 学习",
            concepts: "Web 开发仍重要的部分",
            steps: "免费 Web + AI 学习计划",
            practice: "Sturdee Web 开发路径",
            faq: "AI Web 开发 — 常见问题",
        },
        intro:
            "用 AI 做 Web 开发意味着更快交付 — 不是跳过 HTML、CSS、JavaScript。AI 可生成样板、解释 bug；你仍需读 DOM、理解布局并验证无障碍。",
        whyItMatters: "连接 /learn/web-development、免费编程 hub 与 AI 内容，增强主题权威。",
        deepDive:
            "用 AI 审查无障碍、建议语义 HTML、解释 CSS bug。始终在浏览器测试。键盘与读屏检查仍需人工。",
        concepts: [
            "语义 HTML 优先",
            "Flexbox/Grid 布局素养",
            "JavaScript 事件与 fetch",
            "AI 用于重构与测试",
            "性能与 a11y 不可妥协",
        ],
        steps: [
            "完成免费 HTML + CSS 教程",
            "手写静态落地页",
            "请 AI 审查语义与 a11y",
            "加 JavaScript 交互",
            "用 AI 写测试，而非整站代写",
        ],
        practice: "使用 /learn/web-development、/tutorials/html 与 Web Dev with AI 技能路径。",
        faq: [
            {
                question: "AI 能建整个网站吗？",
                answer: "可出草稿。维护、安全与无障碍仍要 Web 基础。",
            },
            {
                question: "初学者该用 AI 建站工具吗？",
                answer: "原型可以。若要 Web 职业，请并行学 HTML/CSS/JS。",
            },
        ],
    },
    "rag-explained-for-beginners-simple-guide": {
        title: "RAG 入门 — 简明指南",
        seoTitle: "RAG 入门 — 检索增强生成",
        description:
            "RAG 简明解释：检索增强生成让 AI 基于你的文档回答。了解 pipeline、适用场景与初学者常见坑，再决定是否上向量库。",
        focusKeyword: "RAG 入门 解释",
        keywords: [
            "RAG 入门 解释",
            "什么是 RAG AI",
            "检索增强生成",
            "RAG 教程 入门",
            "AI 用你的文档",
        ],
        readTime: "10 分钟阅读",
        headings: {
            intro: "什么是 RAG？",
            concepts: "RAG 流程通俗讲",
            steps: "何时用 RAG vs 更长提示词",
            mistakes: "常见 RAG 错误",
            practice: "下一步学应用 AI",
            faq: "RAG — 常见问题",
        },
        intro:
            "RAG（检索增强生成）：先搜文档，再让模型基于片段回答。减少公司知识、文档与政策场景下的幻觉。",
        whyItMatters: "RAG 是 AI 集群 mid-funnel 关键词。清晰入门文增加主题深度。",
        deepDive:
            "初学者易过度建设向量库。通常好搜索 + top-k 片段 + 严格「引用来源」提示就够理解模式。",
        concepts: [
            "文档切分为 passage",
            "嵌入或关键词检索",
            "把 top 片段塞进提示",
            "要求引用 chunk ID",
            "用真实用户问题集评估",
        ],
        steps: [
            "收集 10 个想回答的 FAQ",
            "文档切成小段",
            "每问检索 top 3 段",
            "提示：仅据片段回答；缺失则说明",
            "复杂基础设施前先测准确率",
        ],
        mistakes: [
            "chunk 过大或过小",
            "不要求引用",
            "未测查询就信任检索",
            "RAG 质量未好就上智能体",
        ],
        practice: "读完本文后学提示词工程与 AI 自动化 — RAG = 提示词 + 检索纪律。",
        faq: [
            {
                question: "RAG 等于微调吗？",
                answer: "不等。微调改权重。RAG 固定模型，提问时喂相关文档。",
            },
            {
                question: "学 RAG 必须向量数据库吗？",
                answer: "不必先上。关键词搜索足以建立 retrieve-then-generate 习惯。",
            },
        ],
    },
    "how-to-learn-ai-without-a-computer-science-degree": {
        title: "无计算机学位如何学 AI",
        seoTitle: "无 CS 学位学 AI — 实用路线图",
        description:
            "无计算机学位学 AI：免费资源、项目、提示词与轻编程的实用路线图，适合转行与自学者 — 12 周可执行计划。",
        focusKeyword: "无学位学 AI",
        keywords: [
            "无学位学 AI",
            "AI 转行",
            "零基础学 AI",
            "非技术 AI 入门",
            "自学 AI",
        ],
        readTime: "13 分钟阅读",
        headings: {
            intro: "学 AI 不必 CS 学位",
            concepts: "替代学历纸面的技能",
            steps: "12 周自学 AI 路线图",
            practice: "转行者的 Sturdee 免费路径",
            faq: "无学位学 AI — 常见问题",
        },
        intro:
            "许多 AI 实践者是自学。雇主 increasingly 要看演示：自动化工作流、评估过的提示词、小应用。学位有助研究岗；学习或交付 GenAI 工具并非必需。",
        whyItMatters: "职业意图长尾转化好，并强化 AI 博客集群权威。",
        deepDive:
            "定位「领域专家 + AI」（营销、运营、支持、教育），同时加深技术。领域 + AI 常胜初级泛 AI 简历。",
        concepts: [
            "许多应用岗 portfolio > 学历",
            "领域专长 + AI 杠杆",
            "公开工作流文章",
            "轻 Python/JS 素养",
            "公开交付建立网络",
        ],
        steps: [
            "第 1–2 周：AI 素养 + 每日提示词工程",
            "第 3–4 周：免费编程教程（Python 或 JS）",
            "第 5–6 周：自动化一个工作/生活流",
            "第 7–8 周：迷你 RAG 或研究助手",
            "第 9–12 周：发案例；加入直播 cohort",
        ],
        practice: "跟 /learn/ai、免费教程与技能注册。要更快反馈可开 Pro AI Tutor。",
        faq: [
            {
                question: "无学位能找 AI 工作吗？",
                answer: "许多应用岗可以，尤其有项目。研究/MLE 常要更 formal 深度。",
            },
            {
                question: "AI 作品集放什么？",
                answer: "前后工作流、提示库、评估笔记、带清晰 README 的小应用。",
            },
            {
                question: "今天从哪开始？",
                answer: "读 Sturdee learn AI hub，完成一个提示教程，每天练 45 分钟。",
            },
        ],
    },
    "shopify-liquid-tutorial-for-beginners-free-guide": {
        title: "Shopify Liquid 初学者教程 — 免费指南",
        seoTitle: "Shopify Liquid 初学者 — 免费教程",
        description:
            "Shopify Liquid 初学者教程：标签、对象与过滤器，含免费练习。主题基础不讲 jargon — 适合电商开发入门与 SEO 长尾。",
        focusKeyword: "Shopify Liquid 初学者教程",
        keywords: [
            "Shopify Liquid 初学者教程",
            "免费学 Shopify Liquid",
            "Liquid 模板教程",
            "Shopify 主题开发 入门",
            "Shopify Liquid 指南",
        ],
        readTime: "12 分钟阅读",
        headings: {
            intro: "什么是 Shopify Liquid？",
            concepts: "Liquid 构建块",
            steps: "第一次 Liquid 修改",
            practice: "Sturdee 免费 Liquid 教程",
            faq: "Shopify Liquid — 常见问题",
        },
        intro:
            "Shopify Liquid 是主题用来展示产品、购物车与集合的模板语言。初学者教程应从对象、标签、过滤器开始 — 再做小而安全的主题修改。",
        whyItMatters: "Shopify Liquid 是 Sturdee 优势关键词，竞争低于泛 Web 大词。",
        deepDive:
            "在开发主题练习。切勿先改生产。读懂 {{ product.title }} 再写复杂 snippet。",
        concepts: [
            "对象：product、collection、cart",
            "标签：if、for、case",
            "过滤器：money、escape、date",
            "sections 与 snippets",
            "现代主题的 JSON 模板",
        ],
        steps: [
            "复制主题",
            "找到产品模板",
            "输出安全对象属性",
            "加简单 if",
            "用过滤器并预览",
        ],
        practice: "完成 Sturdee 免费 Shopify Liquid 教程 track，再读相关 Shopify 博文。",
        faq: [
            {
                question: "Liquid 对初学者难吗？",
                answer: "有 HTML 基础则入门不难。逻辑标签像简化编程。",
            },
            {
                question: "要先学 Ruby 还是 JavaScript？",
                answer: "先 HTML/CSS。JS 有助主题交互；Liquid 主题不必 Ruby。",
            },
        ],
    },
    "javascript-tutorial-for-beginners-free-interactive": {
        title: "JavaScript 初学者教程 — 免费互动",
        seoTitle: "JavaScript 初学者 — 免费互动路径",
        description:
            "JavaScript 初学者教程：免费互动课涵盖变量、函数、DOM 与能坚持的练习习惯 — 2026 Sturdee 结构化路径与 FAQ。",
        focusKeyword: "JavaScript 初学者教程",
        keywords: [
            "JavaScript 初学者教程",
            "免费学 JavaScript",
            "JavaScript 入门 免费",
            "互动 JavaScript 教程",
            "JS 基础教程",
        ],
        readTime: "12 分钟阅读",
        headings: {
            intro: "初学者学 JavaScript 的最佳方式",
            concepts: "JavaScript 核心概念",
            steps: "免费互动 JS 学习计划",
            practice: "开始免费 JS 教程",
            faq: "JavaScript 初学者 — 常见问题",
        },
        intro:
            "JavaScript 初学者教程应互动：读概念、跑代码、弄坏、修复。只看视频难记住。配合 Sturdee 免费课与每日小挑战。",
        whyItMatters: "经典高流量编程词。2026  framing + 教程内链强化 coding 集群。",
        deepDive:
            "顺序：值 → 函数 → 数组/对象 → DOM → fetch。先自己做练习再用 AI 解释。",
        concepts: [
            "let/const 与类型",
            "函数与返回值",
            "数组与对象",
            "DOM 选择与事件",
            "fetch 异步基础",
        ],
        steps: [
            "完成 Sturdee JS 入门课",
            "不看资料重写示例",
            "做小型互动页",
            "学会读 stack trace",
            "仅卡住时用 AI Tutor（Pro）",
        ],
        practice: "打开 /tutorials/javascript 按序学习。补充 /learn/coding-free。",
        faq: [
            {
                question: "JavaScript 基础要学多久？",
                answer: "许多初学者持续练习 4–8 周可掌握基础。",
            },
            {
                question: "应该先学 TypeScript 吗？",
                answer: "先 JavaScript。理解值与函数后 TypeScript 更易。",
            },
        ],
    },
    "html-css-javascript-free-course-style-path": {
        title: "HTML CSS JavaScript 免费课程式学习路径",
        seoTitle: "HTML CSS JavaScript 免费课程路径",
        description:
            "跟随免费 HTML、CSS、JavaScript 课程式路径：结构化课时、阶段项目，并衔接用 AI 做 Web 开发 — 无需学费或付费墙。",
        focusKeyword: "HTML CSS JavaScript 免费课程",
        keywords: [
            "HTML CSS JavaScript 免费课程",
            "免费学 HTML CSS JavaScript",
            "免费 Web 开发课程",
            "免费前端课程",
            "初学者 Web 开发路径",
        ],
        readTime: "11 分钟阅读",
        headings: {
            intro: "免费课程式路径（无付费墙）",
            concepts: "按顺序学什么",
            steps: "项目清单",
            practice: "开始免费路径",
            faq: "免费 HTML CSS JS 课程 — 常见问题",
        },
        intro:
            "可用结构化教程 track 获得 HTML CSS JavaScript 免费「课程」体验：先 HTML，再 CSS，再 JS，每阶段 portfolio 项目 — 无需学费。",
        whyItMatters:
            "瞄准竞品 monetize 的「免费课程」意图。把 Sturdee 教程定位为课程本身。",
        deepDive:
            "每门语言像 bootcamp 模块。限时完成。GitHub 公开项目自我约束。",
        concepts: [
            "HTML 结构与语义",
            "CSS 布局与响应式",
            "JavaScript 交互",
            "无障碍检查点",
            "可选 AI 辅助审阅",
        ],
        steps: [
            "做语义多区块页面（HTML）",
            "响应式样式（CSS）",
            "主题切换或表单验证（JS）",
            "跑无障碍检查",
            "写简短学习案例",
        ],
        practice: "用 /tutorials/html、/tutorials/css、/tutorials/javascript 与 /learn/web-development。",
        faq: [
            {
                question: "等同付费 bootcamp 吗？",
                answer: "覆盖基础。Bootcamp 加强度、就业服务与 deadline — 可用 cohort 模拟。",
            },
            {
                question: "何时加 React？",
                answer: "熟悉 DOM 与 JS 基础后 — 通常做完几个 JS 项目之后。",
            },
        ],
    },
};
