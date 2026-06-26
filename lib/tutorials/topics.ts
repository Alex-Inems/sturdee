import { code, h2, h3, list, p, tryit } from "./builder";
import type { TutorialPage } from "./types";

type TopicFactory = (langName: string, ext: string) => TutorialPage;

export const introPage = (id: string, name: string, blurb: string, ext: string): TutorialPage => ({
    slug: `${id}_intro`,
    title: `${name} Introduction`,
    sections: [
        h2(`What is ${name}?`),
        p(blurb),
        h2(`Why Learn ${name}?`),
        p(`${name} is widely used in industry and education. This tutorial follows a practical, example-driven approach so you can read a concept and try it immediately.`),
        h2("Learning by Examples"),
        p(`Our examples are concise and focused. Edit them in the Try it Yourself editor and observe the result.`),
        code(ext, getHelloExample(id, ext), "Example"),
        tryit(ext, getHelloExample(id, ext)),
    ],
});

export const syntaxPage = (id: string, name: string, ext: string, rules: string[], example: string): TutorialPage => ({
    slug: `${id}_syntax`,
    title: `${name} Syntax`,
    sections: [
        h2(`${name} Syntax`),
        p(`Every ${name} program has rules for how statements are written and executed.`),
        list(rules),
        h3("Example"),
        code(ext, example),
        tryit(ext, example),
    ],
});

export const variablesPage = (id: string, name: string, ext: string, example: string, notes: string[]): TutorialPage => ({
    slug: `${id}_variables`,
    title: `${name} Variables`,
    sections: [
        h2("Variables"),
        p(`Variables store data values. ${name} provides clear rules for declaring and updating variables.`),
        list(notes),
        code(ext, example),
        tryit(ext, example),
    ],
});

export const dataTypesPage = (id: string, name: string, types: string[], example: string, ext: string): TutorialPage => ({
    slug: `${id}_datatypes`,
    title: `${name} Data Types`,
    sections: [
        h2("Data Types"),
        p(`${name} includes several built-in types you will use in every program.`),
        list(types),
        code(ext, example),
        tryit(ext, example),
    ],
});

export const operatorsPage = (id: string, name: string, ext: string, example: string): TutorialPage => ({
    slug: `${id}_operators`,
    title: `${name} Operators`,
    sections: [
        h2("Operators"),
        p("Operators perform arithmetic, comparison, and logical operations on values."),
        code(ext, example),
        tryit(ext, example),
    ],
});

export const conditionalsPage = (id: string, name: string, ext: string, example: string): TutorialPage => ({
    slug: `${id}_conditions`,
    title: `${name} If...Else`,
    sections: [
        h2("Conditional Statements"),
        p("Use conditions to run different code paths based on logical tests."),
        code(ext, example),
        tryit(ext, example),
    ],
});

export const loopsPage = (id: string, name: string, ext: string, example: string, loopName: string): TutorialPage => ({
    slug: `${id}_loops`,
    title: `${name} ${loopName}`,
    sections: [
        h2(loopName),
        p(`Loops let you repeat blocks of code efficiently.`),
        code(ext, example),
        tryit(ext, example),
    ],
});

export const functionsPage = (id: string, name: string, ext: string, example: string): TutorialPage => ({
    slug: `${id}_functions`,
    title: `${name} Functions`,
    sections: [
        h2("Functions"),
        p("Functions group reusable logic behind a name you can call anywhere."),
        code(ext, example),
        tryit(ext, example),
    ],
});

export const classesPage = (id: string, name: string, ext: string, example: string): TutorialPage => ({
    slug: `${id}_classes`,
    title: `${name} Classes`,
    sections: [
        h2("Classes & Objects"),
        p("Classes model real-world entities with properties and methods."),
        code(ext, example),
        tryit(ext, example),
    ],
});

function getHelloExample(id: string, ext: string): string {
    const map: Record<string, string> = {
        html: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello from Sturdee</h1>\n</body>\n</html>`,
        css: `body {\n  font-family: sans-serif;\n  background: #e8ebf0;\n  color: #111827;\n}`,
        javascript: `console.log("Hello from Sturdee");`,
        typescript: `const greeting: string = "Hello from Sturdee";\nconsole.log(greeting);`,
        python: `print("Hello from Sturdee")`,
        java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello from Sturdee");\n  }\n}`,
        cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello from Sturdee";\n  return 0;\n}`,
        c: `#include <stdio.h>\n\nint main() {\n  printf("Hello from Sturdee");\n  return 0;\n}`,
        csharp: `using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello from Sturdee");\n  }\n}`,
        php: `<?php\necho "Hello from Sturdee";`,
        ruby: `puts "Hello from Sturdee"`,
        go: `package main\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello from Sturdee")\n}`,
        rust: `fn main() {\n  println!("Hello from Sturdee");\n}`,
        swift: `print("Hello from Sturdee")`,
        kotlin: `fun main() {\n  println("Hello from Sturdee")\n}`,
        r: `print("Hello from Sturdee")`,
        bash: `#!/bin/bash\necho "Hello from Sturdee"`,
        sql: `SELECT 'Hello from Sturdee' AS message;`,
        json: `{\n  "message": "Hello from Sturdee"\n}`,
        xml: `<?xml version="1.0"?>\n<greeting>Hello from Sturdee</greeting>`,
        nodejs: `console.log("Hello from Sturdee");`,
        liquid: `{% comment %}Hello from Sturdee{% endcomment %}\n<h1>{{ shop.name }}</h1>`,
    };
    return map[id] ?? `// Hello from Sturdee`;
}
