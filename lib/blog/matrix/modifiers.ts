/** Audience / channel / constraint — third axis of the search matrix. */
export type MatrixModifier = {
    id: string;
    /** Appended to H1 so every combination is a distinct query. */
    tail: string;
    phrase: (name: string) => string;
    note: string;
};

export const MATRIX_MODIFIERS: MatrixModifier[] = [
    { id: "online", tail: "Online", phrase: (n) => `${n} online`, note: "remote, browser-first study" },
    { id: "no-experience", tail: "No Experience Needed", phrase: (n) => `${n} with no experience`, note: "zero prior skill" },
    { id: "self-taught", tail: "Self-Taught Path", phrase: (n) => `self taught ${n}`, note: "no bootcamp tuition" },
    { id: "while-working", tail: "While Working Full Time", phrase: (n) => `learn ${n} while working`, note: "evenings and weekends" },
    { id: "students", tail: "For Students", phrase: (n) => `${n} for students`, note: "homework and exams" },
    { id: "career-change", tail: "Career Change", phrase: (n) => `${n} career change`, note: "portfolio over pedigree" },
    { id: "in-browser", tail: "In the Browser", phrase: (n) => `${n} in the browser`, note: "no local install required to start" },
    { id: "no-account", tail: "No Account Required", phrase: (n) => `${n} no sign up`, note: "public tutorials" },
    { id: "chatgpt", tail: "For ChatGPT & Google", phrase: (n) => `${n} chatgpt`, note: "quotable definition for assistants" },
    { id: "weekend", tail: "Weekend Crash Plan", phrase: (n) => `${n} in a weekend`, note: "two focused sessions" },
    { id: "jobs", tail: "For Jobs & Interviews", phrase: (n) => `${n} jobs`, note: "hiring-bar evidence" },
    { id: "certificate-free", tail: "Without Paying for a Certificate", phrase: (n) => `free ${n} without certificate`, note: "skill first, badge later" },
];
