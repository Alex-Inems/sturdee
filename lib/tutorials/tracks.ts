import { section, h2, h3, list, page, code, tryit, p } from "./builder";
import {
    classesPage,
    conditionalsPage,
    dataTypesPage,
    functionsPage,
    introPage,
    loopsPage,
    operatorsPage,
    syntaxPage,
    variablesPage,
} from "./topics";
import type { TutorialLanguage, TutorialTrack } from "./types";

const LANG = (
    id: string,
    name: string,
    tagline: string,
    color: string,
    icon: string
): TutorialLanguage => ({ id, name, tagline, color, icon });

export const TUTORIAL_LANGUAGES: TutorialLanguage[] = [
    LANG("html", "HTML", "The standard markup language for web pages", "bg-orange-100 text-orange-700", "🌐"),
    LANG("css", "CSS", "Style sheets for designing HTML documents", "bg-blue-100 text-blue-700", "🎨"),
    LANG("javascript", "JavaScript", "The programming language of the web", "bg-yellow-100 text-yellow-800", "⚡"),
    LANG("typescript", "TypeScript", "Typed superset of JavaScript", "bg-indigo-100 text-indigo-700", "📘"),
    LANG("python", "Python", "General-purpose language for web, data, and automation", "bg-sky-100 text-sky-700", "🐍"),
    LANG("sql", "SQL", "Language for managing relational databases", "bg-emerald-100 text-emerald-700", "🗄️"),
    LANG("java", "Java", "Object-oriented language for enterprise systems", "bg-red-100 text-red-700", "☕"),
    LANG("cpp", "C++", "High-performance systems and application development", "bg-slate-100 text-slate-700", "⚙️"),
    LANG("c", "C", "Foundational systems programming language", "bg-gray-100 text-gray-700", "🔧"),
    LANG("csharp", "C#", "Modern language for .NET and game development", "bg-violet-100 text-violet-700", "💜"),
    LANG("php", "PHP", "Server-side scripting for dynamic websites", "bg-purple-100 text-purple-700", "🐘"),
    LANG("ruby", "Ruby", "Elegant language popularized by Ruby on Rails", "bg-rose-100 text-rose-700", "💎"),
    LANG("go", "Go", "Simple, fast language from Google", "bg-cyan-100 text-cyan-700", "🐹"),
    LANG("rust", "Rust", "Memory-safe systems programming", "bg-orange-100 text-orange-800", "🦀"),
    LANG("swift", "Swift", "Apple's language for iOS and macOS", "bg-orange-50 text-orange-600", "🍎"),
    LANG("kotlin", "Kotlin", "Modern JVM language for Android and backend", "bg-fuchsia-100 text-fuchsia-700", "📱"),
    LANG("r", "R", "Statistical computing and data visualization", "bg-blue-50 text-blue-600", "📊"),
    LANG("bash", "Bash", "Shell scripting for Linux and DevOps", "bg-green-100 text-green-800", "🖥️"),
    LANG("json", "JSON", "Lightweight data interchange format", "bg-amber-100 text-amber-800", "{ }"),
    LANG("xml", "XML", "Extensible markup for structured data", "bg-teal-100 text-teal-700", "📄"),
    LANG("nodejs", "Node.js", "JavaScript runtime for server-side development", "bg-lime-100 text-lime-800", "🟢"),
];

function htmlTrack(): TutorialTrack {
    const id = "html";
    const name = "HTML";
    const ext = "html";
    return {
        language: LANG(id, name, "The standard markup language for web pages", "bg-orange-100 text-orange-700", "🌐"),
        sections: [
            section("HTML Tutorial", [
                introPage(id, name, "HTML (HyperText Markup Language) defines the structure of web content using elements and attributes.", ext),
                syntaxPage(id, name, ext, [
                    "Documents start with <!DOCTYPE html>",
                    "Content lives inside <html>, <head>, and <body>",
                    "Elements use opening and closing tags",
                    "Attributes provide additional information",
                ], `<!DOCTYPE html>\n<html>\n<head>\n  <title>Page Title</title>\n</head>\n<body>\n  <h1>My First Heading</h1>\n  <p>My first paragraph.</p>\n</body>\n</html>`),
                page(`${id}_elements`, "HTML Elements", [
                    h2("HTML Elements"),
                    p("An HTML element has a start tag, content, and an end tag."),
                    code(ext, `<h1>Heading</h1>\n<p>Paragraph text.</p>\n<a href=\"https://www.sturdee.online\">Sturdee</a>`),
                    tryit(ext, `<!DOCTYPE html><html><body><h1>Heading</h1><p>Paragraph.</p></body></html>`),
                ]),
                page(`${id}_attributes`, "HTML Attributes", [
                    h2("Attributes"),
                    p("Attributes provide extra information about elements and are always specified in the start tag."),
                    code(ext, `<a href=\"https://www.sturdee.online\" target=\"_blank\">Visit Sturdee</a>\n<img src=\"logo.png\" alt=\"Logo\" width=\"120\">`),
                ]),
                page(`${id}_headings`, "HTML Headings", [
                    h2("Headings"),
                    p("HTML has six levels of headings from <h1> (most important) to <h6>."),
                    code(ext, `<h1>Main Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>`),
                    tryit(ext, `<!DOCTYPE html><html><body><h1>H1</h1><h2>H2</h2><h3>H3</h3></body></html>`),
                ]),
                page(`${id}_paragraphs`, "HTML Paragraphs", [
                    h2("Paragraphs"),
                    p("Use the <p> element for blocks of text."),
                    code(ext, `<p>This is a paragraph.</p>\n<p>This is another paragraph.</p>`),
                ]),
                page(`${id}_links`, "HTML Links", [
                    h2("Links"),
                    p("The <a> element creates hyperlinks using the href attribute."),
                    code(ext, `<a href=\"https://www.sturdee.online\">Sturdee Tutorials</a>`),
                ]),
                page(`${id}_images`, "HTML Images", [
                    h2("Images"),
                    p("Embed images with <img>. Always include alt text for accessibility."),
                    code(ext, `<img src=\"student.png\" alt=\"Student\" width=\"200\">`),
                ]),
                page(`${id}_tables`, "HTML Tables", [
                    h2("Tables"),
                    p("Tables use <table>, <tr>, <th>, and <td>."),
                    code(ext, `<table border=\"1\">\n  <tr><th>Name</th><th>Score</th></tr>\n  <tr><td>Alex</td><td>98</td></tr>\n</table>`),
                    tryit(ext, `<!DOCTYPE html><html><body><table border="1"><tr><th>Name</th><th>Score</th></tr><tr><td>Alex</td><td>98</td></tr></table></body></html>`),
                ]),
                page(`${id}_forms`, "HTML Forms", [
                    h2("Forms"),
                    p("Collect user input with <form>, <input>, <label>, and <button>."),
                    code(ext, `<form>\n  <label>Name: <input type=\"text\" name=\"name\"></label>\n  <button type=\"submit\">Submit</button>\n</form>`),
                ]),
            ]),
            section("HTML References", [
                page(`${id}_ref_tags`, "HTML Tag Reference", [
                    h2("Common Tags"),
                    list(["<div> — block container", "<span> — inline container", "<ul>/<ol>/<li> — lists", "<button> — clickable button", "<input> — form control"]),
                ]),
            ]),
        ],
    };
}

function cssTrack(): TutorialTrack {
    const id = "css";
    return {
        language: LANG(id, "CSS", "Style sheets for designing HTML documents", "bg-blue-100 text-blue-700", "🎨"),
        sections: [
            section("CSS Tutorial", [
                introPage(id, "CSS", "CSS (Cascading Style Sheets) controls layout, color, typography, and responsiveness.", "css"),
                syntaxPage(id, "CSS", "css", [
                    "A rule has a selector and declaration block",
                    "Properties end with semicolons",
                    "Comments use /* */",
                ], `body {\n  background-color: #e8ebf0;\n  font-family: sans-serif;\n}`),
                page(`${id}_selectors`, "CSS Selectors", [
                    h2("Selectors"),
                    p("Target elements by tag, class, id, or attribute."),
                    code("css", `p { color: #374151; }\n.highlight { background: #FFE55E; }\n#hero { padding: 2rem; }`),
                ]),
                page(`${id}_colors`, "CSS Colors", [
                    h2("Colors"),
                    p("Specify colors with names, hex, rgb(), or hsl()."),
                    code("css", `h1 { color: #111827; }\n.card { background: rgb(255, 255, 255); }`),
                ]),
                page(`${id}_boxmodel`, "CSS Box Model", [
                    h2("Box Model"),
                    p("Every element has content, padding, border, and margin."),
                    code("css", `.box {\n  width: 200px;\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  margin: 12px;\n}`),
                ]),
                page(`${id}_flexbox`, "CSS Flexbox", [
                    h2("Flexbox"),
                    p("One-dimensional layouts with flex containers and items."),
                    code("css", `.row {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n}`),
                ]),
                page(`${id}_grid`, "CSS Grid", [
                    h2("Grid"),
                    p("Two-dimensional layouts with rows and columns."),
                    code("css", `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem;\n}`),
                ]),
                page(`${id}_responsive`, "CSS Responsive", [
                    h2("Responsive Design"),
                    p("Use media queries to adapt styles to screen size."),
                    code("css", `@media (max-width: 768px) {\n  .sidebar { display: none; }\n}`),
                ]),
            ]),
        ],
    };
}

function jsTrack(): TutorialTrack {
    const id = "javascript";
    const ext = "javascript";
    return {
        language: LANG(id, "JavaScript", "The programming language of the web", "bg-yellow-100 text-yellow-800", "⚡"),
        sections: [
            section("JS Tutorial", [
                introPage(id, "JavaScript", "JavaScript makes web pages interactive and powers servers via Node.js.", ext),
                syntaxPage(id, "JavaScript", ext, ["Statements end with semicolons (optional but recommended)", "Case sensitive", "CamelCase for variables"], `let x = 5;\nlet y = 6;\nconsole.log(x + y);`),
                variablesPage(id, "JavaScript", ext, `let name = "Sturdee";\nconst year = 2026;\nvar legacy = true;\nconsole.log(name, year);`, ["let — block-scoped variable", "const — constant binding", "var — function-scoped (legacy)"]),
                dataTypesPage(id, "JavaScript", ["String", "Number", "Boolean", "Object", "Array", "null", "undefined"], `let s = "text";\nlet n = 42;\nlet ok = true;\nlet items = [1, 2, 3];\nconsole.log(typeof s, items.length);`, ext),
                operatorsPage(id, "JavaScript", ext, `let a = 10, b = 3;\nconsole.log(a + b, a ** b, a > b);`),
                conditionalsPage(id, "JavaScript", ext, `const score = 88;\nif (score >= 90) console.log("A");\nelse if (score >= 80) console.log("B");\nelse console.log("C");`),
                loopsPage(id, "JavaScript", ext, `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`, "For Loops"),
                page(`${id}_arrays`, "JavaScript Arrays", [
                    h2("Arrays"),
                    p("Ordered lists with methods like push, map, filter, and reduce."),
                    code(ext, `const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled);`),
                    tryit(ext, `const nums = [1,2,3];\nconsole.log(nums.map(n => n * 2));`),
                ]),
                functionsPage(id, "JavaScript", ext, `function greet(name) {\n  return "Hello, " + name;\n}\nconsole.log(greet("Sturdee"));`),
                classesPage(id, "JavaScript", ext, `class Course {\n  constructor(title) { this.title = title; }\n  summary() { return this.title; }\n}\nconsole.log(new Course("WEB-401").summary());`),
                page(`${id}_async`, "JavaScript Async", [
                    h2("Async / Await"),
                    p("Handle asynchronous operations with Promises and async functions."),
                    code(ext, `async function load() {\n  const res = await fetch("/api/courses");\n  return res.json();\n}`),
                ]),
                page(`${id}_dom`, "JavaScript HTML DOM", [
                    h2("HTML DOM"),
                    p("JavaScript can select and modify HTML elements at runtime."),
                    code(ext, `document.getElementById("title").textContent = "Updated";\ndocument.querySelector(".btn").addEventListener("click", () => alert("Hi"));`),
                ]),
            ]),
        ],
    };
}

function pythonTrack(): TutorialTrack {
    const id = "python";
    const ext = "python";
    return {
        language: LANG(id, "Python", "General-purpose language for web, data, and automation", "bg-sky-100 text-sky-700", "🐍"),
        sections: [
            section("Python Tutorial", [
                introPage(id, "Python", "Python emphasizes readability with clean syntax and a vast standard library.", ext),
                syntaxPage(id, "Python", ext, ["Indentation defines blocks", "No semicolons required", "Dynamic typing"], `x = 5\ny = 10\nprint(x + y)`),
                variablesPage(id, "Python", ext, `name = "Sturdee"\nage = 21\nis_student = True\nprint(name, age)`, ["Assign with =", "Multiple assignment supported", "Naming: snake_case"]),
                dataTypesPage(id, "Python", ["str", "int", "float", "bool", "list", "tuple", "dict", "set"], `text = "hi"\nnums = [1, 2, 3]\nuser = {"name": "Alex", "score": 95}\nprint(text, nums[0], user["score"])`, ext),
                operatorsPage(id, "Python", ext, `a, b = 10, 3\nprint(a + b, a // b, a ** b)`),
                conditionalsPage(id, "Python", ext, `score = 91\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")`),
                loopsPage(id, "Python", ext, `for i in range(5):\n    print(i)`, "For Loops"),
                page(`${id}_while`, "Python While Loops", [
                    h2("While Loops"),
                    code(ext, `n = 3\nwhile n > 0:\n    print(n)\n    n -= 1`),
                    tryit(ext, `n = 3\nwhile n > 0:\n    print(n)\n    n -= 1`),
                ]),
                functionsPage(id, "Python", ext, `def greet(name):\n    return f"Hello, {name}"\n\nprint(greet("Sturdee"))`),
                classesPage(id, "Python", ext, `class Course:\n    def __init__(self, title):\n        self.title = title\n\nc = Course("PROG-301")\nprint(c.title)`),
                page(`${id}_modules`, "Python Modules", [
                    h2("Modules"),
                    p("Import reusable code with import statements."),
                    code(ext, `import math\nprint(math.sqrt(16))`),
                    tryit(ext, `import math\nprint(math.sqrt(16))`),
                ]),
                page(`${id}_exceptions`, "Python Try...Except", [
                    h2("Exception Handling"),
                    code(ext, `try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`),
                    tryit(ext, `try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`),
                ]),
                page(`${id}_files`, "Python File Handling", [
                    h2("File Handling"),
                    code(ext, `with open("notes.txt", "w") as f:\n    f.write("Hello")\n\nwith open("notes.txt") as f:\n    print(f.read())`),
                ]),
            ]),
        ],
    };
}

function genericTrack(
    lang: TutorialLanguage,
    ext: string,
    blurb: string,
    varExample: string,
    typeList: string[],
    typeExample: string,
    opExample: string,
    ifExample: string,
    loopExample: string,
    fnExample: string,
    classExample?: string
): TutorialTrack {
    const { id, name } = lang;
    const basics = [
        introPage(id, name, blurb, ext),
        syntaxPage(id, name, ext, [`Follow ${name} syntax rules for statements and blocks`, "Use comments to document code", "Run examples in the Try it editor"], varExample),
        variablesPage(id, name, ext, varExample, [`Declare variables using ${name} conventions`, "Choose meaningful names"]),
        dataTypesPage(id, name, typeList, typeExample, ext),
        operatorsPage(id, name, ext, opExample),
        conditionalsPage(id, name, ext, ifExample),
        loopsPage(id, name, ext, loopExample, "Loops"),
        functionsPage(id, name, ext, fnExample),
    ];
    if (classExample) basics.push(classesPage(id, name, ext, classExample));
    return { language: lang, sections: [section(`${name} Tutorial`, basics)] };
}

export const TUTORIAL_TRACKS: TutorialTrack[] = [
    htmlTrack(),
    cssTrack(),
    jsTrack(),
    pythonTrack(),
    genericTrack(
        LANG("typescript", "TypeScript", "Typed superset of JavaScript", "bg-indigo-100 text-indigo-700", "📘"),
        "typescript",
        "TypeScript adds static types to JavaScript for safer large-scale applications.",
        `let course: string = "WEB-401";\nlet price: number = 1899;\nconsole.log(course, price);`,
        ["string", "number", "boolean", "array", "tuple", "enum", "any", "unknown"],
        `type User = { name: string; active: boolean };\nconst u: User = { name: "Alex", active: true };\nconsole.log(u.name);`,
        `const sum = (a: number, b: number): number => a + b;\nconsole.log(sum(4, 5));`,
        `const score = 85;\nconsole.log(score >= 80 ? "Pass" : "Review");`,
        `for (let i = 0; i < 3; i++) console.log(i);`,
        `function greet(name: string): string {\n  return "Hello, " + name;\n}\nconsole.log(greet("Sturdee"));`,
        `class Course {\n  constructor(public title: string) {}\n}\nconsole.log(new Course("TS-101").title);`
    ),
    genericTrack(
        LANG("sql", "SQL", "Language for managing relational databases", "bg-emerald-100 text-emerald-700", "🗄️"),
        "sql",
        "SQL (Structured Query Language) queries, inserts, updates, and manages relational data.",
        `SELECT first_name, last_name FROM students;`,
        ["INTEGER", "VARCHAR", "BOOLEAN", "DATE", "DECIMAL", "TIMESTAMP"],
        `CREATE TABLE students (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(100),\n  enrolled BOOLEAN\n);`,
        `SELECT price * 0.9 AS discounted FROM courses;`,
        `SELECT * FROM courses WHERE price > 1000;`,
        `-- loops vary by dialect\nSELECT id, title FROM courses LIMIT 5;`,
        `CREATE FUNCTION course_count() RETURNS INTEGER AS $$\n  SELECT COUNT(*) FROM courses;\n$$ LANGUAGE sql;`
    ),
    genericTrack(
        LANG("java", "Java", "Object-oriented language for enterprise systems", "bg-red-100 text-red-700", "☕"),
        "java",
        "Java powers Android apps, enterprise backends, and large distributed systems.",
        `String name = "Sturdee";\nint year = 2026;\nSystem.out.println(name + " " + year);`,
        ["int", "double", "boolean", "char", "String", "arrays"],
        `int[] scores = {90, 88, 95};\nSystem.out.println(scores[0]);`,
        `int a = 10, b = 3;\nSystem.out.println(a % b);`,
        `int score = 92;\nif (score >= 90) System.out.println("A");`,
        `for (int i = 0; i < 3; i++) System.out.println(i);`,
        `public static String greet(String name) {\n  return "Hello, " + name;\n}`,
        `class Course {\n  String title;\n  Course(String t) { title = t; }\n}`
    ),
    genericTrack(
        LANG("cpp", "C++", "High-performance systems and application development", "bg-slate-100 text-slate-700", "⚙️"),
        "cpp",
        "C++ is used in game engines, browsers, and performance-critical software.",
        `int x = 5;\nint y = 10;\nstd::cout << x + y;`,
        ["int", "double", "bool", "char", "string", "vector"],
        `std::vector<int> nums = {1, 2, 3};\nstd::cout << nums.size();`,
        `int a = 7, b = 2;\nstd::cout << a / b;`,
        `int n = 8;\nif (n > 5) std::cout << "big";`,
        `for (int i = 0; i < 3; i++) std::cout << i;`,
        `int add(int a, int b) { return a + b; }`,
        `class Course {\npublic:\n  std::string title;\n  Course(std::string t) : title(t) {}\n};`
    ),
    genericTrack(
        LANG("c", "C", "Foundational systems programming language", "bg-gray-100 text-gray-700", "🔧"),
        "c",
        "C is the foundation for operating systems, embedded devices, and many other languages.",
        `int count = 10;\nprintf("%d", count);`,
        ["int", "float", "double", "char", "pointer"],
        `int nums[] = {1, 2, 3};\nprintf("%d", nums[1]);`,
        `int a = 9, b = 4;\nprintf("%d", a % b);`,
        `if (a > b) printf("greater");`,
        `for (int i = 0; i < 3; i++) printf("%d", i);`,
        `int add(int a, int b) { return a + b; }`
    ),
    genericTrack(
        LANG("csharp", "C#", "Modern language for .NET and game development", "bg-violet-100 text-violet-700", "💜"),
        "csharp",
        "C# is the primary language for .NET, Unity games, and enterprise Windows apps.",
        `string name = "Sturdee";\nint year = 2026;\nConsole.WriteLine($"{name} {year}");`,
        ["int", "double", "bool", "string", "decimal", "arrays"],
        `var scores = new[] { 90, 88, 95 };\nConsole.WriteLine(scores[0]);`,
        `Console.WriteLine(10 / 3.0);`,
        `int score = 88;\nif (score >= 80) Console.WriteLine("B");`,
        `for (int i = 0; i < 3; i++) Console.WriteLine(i);`,
        `static string Greet(string name) => $"Hello, {name}";`,
        `class Course {\n  public string Title { get; set; }\n}`
    ),
    genericTrack(
        LANG("php", "PHP", "Server-side scripting for dynamic websites", "bg-purple-100 text-purple-700", "🐘"),
        "php",
        "PHP powers WordPress, Laravel, and millions of dynamic websites.",
        `$name = "Sturdee";\necho $name;`,
        ["string", "int", "float", "bool", "array", "object"],
        `$user = ["name" => "Alex", "score" => 95];\necho $user["name"];`,
        `echo 10 + 3;`,
        `if ($score >= 90) echo "A";`,
        `foreach ([1,2,3] as $n) echo $n;`,
        `function greet($name) { return "Hello, $name"; }`,
        `class Course {\n  public function __construct(public $title) {}\n}`
    ),
    genericTrack(
        LANG("ruby", "Ruby", "Elegant language popularized by Ruby on Rails", "bg-rose-100 text-rose-700", "💎"),
        "ruby",
        "Ruby prioritizes developer happiness and powers many web startups via Rails.",
        `name = "Sturdee"\nputs name`,
        ["String", "Integer", "Float", "Symbol", "Array", "Hash"],
        `user = { name: "Alex", score: 95 }\nputs user[:name]`,
        `puts 10 ** 2`,
        `puts "pass" if score >= 60`,
        `3.times { |i| puts i }`,
        `def greet(name)\n  "Hello, #{name}"\nend`,
        `class Course\n  attr_accessor :title\nend`
    ),
    genericTrack(
        LANG("go", "Go", "Simple, fast language from Google", "bg-cyan-100 text-cyan-700", "🐹"),
        "go",
        "Go (Golang) is designed for cloud infrastructure, CLIs, and concurrent services.",
        `name := "Sturdee"\nfmt.Println(name)`,
        ["string", "int", "float64", "bool", "slice", "map"],
        `nums := []int{1, 2, 3}\nfmt.Println(len(nums))`,
        `fmt.Println(10 % 3)`,
        `if score >= 90 { fmt.Println("A") }`,
        `for i := 0; i < 3; i++ { fmt.Println(i) }`,
        `func greet(name string) string {\n  return "Hello, " + name\n}`,
        `type Course struct { Title string }`
    ),
    genericTrack(
        LANG("rust", "Rust", "Memory-safe systems programming", "bg-orange-100 text-orange-800", "🦀"),
        "rust",
        "Rust provides C++-level performance with compile-time memory safety guarantees.",
        `let name = "Sturdee";\nprintln!("{}", name);`,
        ["i32", "f64", "bool", "char", "String", "Vec"],
        `let nums = vec![1, 2, 3];\nprintln!("{}", nums[0]);`,
        `println!("{}", 10 % 3);`,
        `if score >= 90 { println!("A"); }`,
        `for i in 0..3 { println!("{}", i); }`,
        `fn greet(name: &str) -> String {\n  format!("Hello, {}", name)\n}`,
        `struct Course { title: String }`
    ),
    genericTrack(
        LANG("swift", "Swift", "Apple's language for iOS and macOS", "bg-orange-50 text-orange-600", "🍎"),
        "swift",
        "Swift is the primary language for iOS, iPadOS, macOS, and watchOS development.",
        `let name = "Sturdee"\nprint(name)`,
        ["String", "Int", "Double", "Bool", "Array", "Dictionary"],
        `let scores = [90, 88, 95]\nprint(scores[0])`,
        `print(10 % 3)`,
        `if score >= 90 { print("A") }`,
        `for i in 0..<3 { print(i) }`,
        `func greet(name: String) -> String {\n  return "Hello, \\(name)"\n}`,
        `struct Course { var title: String }`
    ),
    genericTrack(
        LANG("kotlin", "Kotlin", "Modern JVM language for Android and backend", "bg-fuchsia-100 text-fuchsia-700", "📱"),
        "kotlin",
        "Kotlin is Google's preferred language for Android and a concise JVM alternative to Java.",
        `val name = "Sturdee"\nprintln(name)`,
        ["String", "Int", "Double", "Boolean", "List", "Map"],
        `val scores = listOf(90, 88, 95)\nprintln(scores[0])`,
        `println(10 % 3)`,
        `if (score >= 90) println("A")`,
        `for (i in 0 until 3) println(i)`,
        `fun greet(name: String) = "Hello, $name"`,
        `data class Course(val title: String)`
    ),
    genericTrack(
        LANG("r", "R", "Statistical computing and data visualization", "bg-blue-50 text-blue-600", "📊"),
        "r",
        "R is the leading language for statistics, research, and data visualization.",
        `name <- "Sturdee"\nprint(name)`,
        ["numeric", "character", "logical", "factor", "data.frame"],
        `df <- data.frame(name=c("Alex"), score=c(95))\nprint(df$score)`,
        `print(10 %% 3)`,
        `if (score >= 90) print("A")`,
        `for (i in 1:3) print(i)`,
        `greet <- function(name) paste("Hello,", name)`
    ),
    genericTrack(
        LANG("bash", "Bash", "Shell scripting for Linux and DevOps", "bg-green-100 text-green-800", "🖥️"),
        "bash",
        "Bash automates tasks on Linux and macOS and is essential for DevOps workflows.",
        `NAME="Sturdee"\necho $NAME`,
        ["string", "integer", "array", "exit codes"],
        `scores=(90 88 95)\necho \${scores[0]}`,
        `echo $((10 % 3))`,
        `if [ $score -ge 90 ]; then echo "A"; fi`,
        `for i in 1 2 3; do echo $i; done`,
        `greet() { echo "Hello, $1"; }`
    ),
    {
        language: LANG("json", "JSON", "Lightweight data interchange format", "bg-amber-100 text-amber-800", "{ }"),
        sections: [
            section("JSON Tutorial", [
                introPage("json", "JSON", "JSON (JavaScript Object Notation) is a text format for storing and transporting data.", "json"),
                page("json_syntax", "JSON Syntax", [
                    h2("JSON Syntax"),
                    p("Data is name/value pairs wrapped in curly braces, or ordered lists in square brackets."),
                    code("json", `{\n  "course": "WEB-401",\n  "price": 1899,\n  "tags": ["web", "react"]\n}`),
                ]),
                page("json_objects", "JSON Objects", [
                    h2("Objects"),
                    code("json", `{"instructor": "Dr. Elena Vasquez", "rating": 4.9}`),
                ]),
                page("json_arrays", "JSON Arrays", [
                    h2("Arrays"),
                    code("json", `["HTML", "CSS", "JavaScript", "Python"]`),
                ]),
                page("json_parse", "JSON in JavaScript", [
                    h2("Parse & Stringify"),
                    code("javascript", `const data = '{"title":"CRY-301"}';\nconst obj = JSON.parse(data);\nconsole.log(JSON.stringify(obj));`),
                    tryit("javascript", `const data = '{"title":"CRY-301"}';\nconsole.log(JSON.parse(data).title);`),
                ]),
            ]),
        ],
    },
    {
        language: LANG("xml", "XML", "Extensible markup for structured data", "bg-teal-100 text-teal-700", "📄"),
        sections: [
            section("XML Tutorial", [
                introPage("xml", "XML", "XML (eXtensible Markup Language) stores structured data with custom tags.", "xml"),
                page("xml_syntax", "XML Syntax", [
                    h2("XML Syntax"),
                    p("XML documents have a root element, nested elements, and attributes."),
                    code("xml", `<?xml version="1.0"?>\n<courses>\n  <course code="WEB-401">\n    <title>Full-Stack Web</title>\n  </course>\n</courses>`),
                ]),
                page("xml_elements", "XML Elements", [
                    h2("Elements"),
                    code("xml", `<student>\n  <name>Alex</name>\n  <score>95</score>\n</student>`),
                ]),
                page("xml_attributes", "XML Attributes", [
                    h2("Attributes"),
                    code("xml", `<course code="CRY-301" level="Intermediate">Blockchain</course>`),
                ]),
            ]),
        ],
    },
    genericTrack(
        LANG("nodejs", "Node.js", "JavaScript runtime for server-side development", "bg-lime-100 text-lime-800", "🟢"),
        "nodejs",
        "Node.js runs JavaScript outside the browser for APIs, CLIs, and real-time apps.",
        `const http = require('http');\nconsole.log("Node ready");`,
        ["Buffer", "Stream", "Module", "EventEmitter", "Promise"],
        `const fs = require('fs');\nconst data = fs.readFileSync('file.txt', 'utf8');`,
        `console.log(process.version);`,
        `if (process.env.NODE_ENV === 'production') console.log('prod');`,
        `for (const port of [3000, 3001]) console.log(port);`,
        `function createServer() {\n  return http.createServer((req, res) => {\n    res.end('OK');\n  });\n}`
    ),
];

export function getTutorialTrack(langId: string): TutorialTrack | undefined {
    return TUTORIAL_TRACKS.find((t) => t.language.id === langId);
}

export function getAllTutorialPages(langId: string) {
    const track = getTutorialTrack(langId);
    if (!track) return [];
    return track.sections.flatMap((s) => s.pages);
}

export function getTutorialPage(langId: string, slug: string) {
    return getAllTutorialPages(langId).find((p) => p.slug === slug);
}

export function getAdjacentPages(langId: string, slug: string) {
    const pages = getAllTutorialPages(langId);
    const idx = pages.findIndex((p) => p.slug === slug);
    return {
        prev: idx > 0 ? pages[idx - 1] : null,
        next: idx < pages.length - 1 ? pages[idx + 1] : null,
    };
}
