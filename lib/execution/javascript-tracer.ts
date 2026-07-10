import * as acorn from "acorn";
import type { ExecutionStep, ExecutionTrace, ExecutionTreeNode, TraceOptions } from "./types";
import { buildHeapSnapshot, serializeValue, stripTypeScript } from "./serialize";

type Node = acorn.Node;
type Program = acorn.Program;
type Expression = acorn.Expression;
type Statement = acorn.Statement;

interface UserFunction {
    kind: "function";
    name: string;
    params: string[];
    body: Node;
    closure: Map<string, unknown>;
}

type Env = Map<string, unknown>;

interface Frame {
    env: Env;
    label: string;
    nodeId: string;
}

const DEFAULTS: Required<TraceOptions> = { maxSteps: 250, maxLoopIterations: 50 };

export function traceJavaScript(source: string, options: TraceOptions = {}): ExecutionTrace {
    const opts = { ...DEFAULTS, ...options };
    const tree: ExecutionTreeNode = { id: "root", label: "Program start", line: 1, children: [] };
    const steps: ExecutionStep[] = [];
    const output: string[] = [];
    let nodeCounter = 0;
    let error: string | undefined;

    const nextId = (prefix: string) => `${prefix}-${++nodeCounter}`;

    const frames: Frame[] = [{ env: new Map(), label: "Global", nodeId: "root" }];
    const functions = new Map<string, UserFunction>();
    const treeNodes = new Map<string, ExecutionTreeNode>([["root", tree]]);

    const addTreeNode = (parentId: string, label: string, line?: number): string => {
        const id = nextId("node");
        const node: ExecutionTreeNode = { id, label, line, children: [] };
        treeNodes.get(parentId)?.children.push(node);
        treeNodes.set(id, node);
        return id;
    };

    const currentEnv = () => frames[frames.length - 1].env;
    const currentFrame = () => frames[frames.length - 1];

    const snippet = (node: Node) => source.slice(node.start, node.end);

    const record = (label: string, node: Node, treeNodeId: string) => {
        if (steps.length >= opts.maxSteps) {
            throw new Error("Execution step limit reached — simplify the code or reduce loops.");
        }
        const env = currentEnv();
        steps.push({
            index: steps.length,
            line: node.loc?.start.line ?? 1,
            code: snippet(node),
            label,
            variables: Object.fromEntries([...env.entries()].map(([k, v]) => [k, serializeValue(v)])),
            heap: buildHeapSnapshot(env),
            output: [...output],
            callStack: frames.map((f) => f.label),
            treeNodeId,
        });
    };

    const evalExpr = (node: Expression, treeNodeId: string): unknown => {
        switch (node.type) {
            case "Literal":
                return (node as acorn.Literal).value;
            case "Identifier": {
                const name = (node as acorn.Identifier).name;
                if (name === "undefined") return undefined;
                const env = currentEnv();
                if (!env.has(name)) throw new Error(`'${name}' is not defined`);
                return env.get(name);
            }
            case "UnaryExpression": {
                const n = node as acorn.UnaryExpression;
                const v = evalExpr(n.argument as Expression, treeNodeId);
                if (n.operator === "-") return -(v as number);
                if (n.operator === "+") return +(v as number);
                if (n.operator === "!") return !v;
                if (n.operator === "typeof") return typeof v;
                throw new Error(`Unsupported operator: ${n.operator}`);
            }
            case "BinaryExpression": {
                const n = node as acorn.BinaryExpression;
                const op = n.operator as string;
                const left = evalExpr(n.left as Expression, treeNodeId);
                if (op === "&&" && !left) return left;
                if (op === "||" && left) return left;
                const right = evalExpr(n.right as Expression, treeNodeId);
                switch (op) {
                    case "+": return (left as number) + (right as number);
                    case "-": return (left as number) - (right as number);
                    case "*": return (left as number) * (right as number);
                    case "/": return (left as number) / (right as number);
                    case "%": return (left as number) % (right as number);
                    case "===": return left === right;
                    case "!==": return left !== right;
                    case "==": return left == right;
                    case "!=": return left != right;
                    case "<": return (left as number) < (right as number);
                    case ">": return (left as number) > (right as number);
                    case "<=": return (left as number) <= (right as number);
                    case ">=": return (left as number) >= (right as number);
                    case "&&": return left && right;
                    case "||": return left || right;
                    default: throw new Error(`Unsupported operator: ${op}`);
                }
            }
            case "AssignmentExpression": {
                const n = node as acorn.AssignmentExpression;
                const value = evalExpr(n.right as Expression, treeNodeId);
                assignTarget(n.left, value, treeNodeId);
                return value;
            }
            case "UpdateExpression": {
                const n = node as acorn.UpdateExpression;
                const name = ((n.argument as acorn.Identifier).name);
                const env = currentEnv();
                const cur = Number(env.get(name) ?? 0);
                const next = n.operator === "++" ? cur + 1 : cur - 1;
                env.set(name, next);
                return n.prefix ? next : cur;
            }
            case "MemberExpression": {
                const n = node as acorn.MemberExpression;
                const obj = evalExpr(n.object as Expression, treeNodeId);
                const prop = n.computed
                    ? evalExpr(n.property as Expression, treeNodeId)
                    : (n.property as acorn.Identifier).name;
                if (obj === null || obj === undefined) throw new Error("Cannot read property of null/undefined");
                return (obj as Record<string | number, unknown>)[prop as string | number];
            }
            case "CallExpression": {
                const n = node as acorn.CallExpression;
                if (
                    n.callee.type === "MemberExpression" &&
                    (n.callee as acorn.MemberExpression).object.type === "Identifier" &&
                    ((n.callee as acorn.MemberExpression).object as acorn.Identifier).name === "console" &&
                    (n.callee as acorn.MemberExpression).property.type === "Identifier" &&
                    ((n.callee as acorn.MemberExpression).property as acorn.Identifier).name === "log"
                ) {
                    const args = n.arguments.map((a) => evalExpr(a as Expression, treeNodeId));
                    const line = args.map(serializeValue).join(" ");
                    output.push(line);
                    record("console.log output", node, treeNodeId);
                    return undefined;
                }
                return callUserFunction(n, treeNodeId);
            }
            case "ArrayExpression":
                return (node as acorn.ArrayExpression).elements.map((el) =>
                    el ? evalExpr(el as Expression, treeNodeId) : null
                );
            case "ObjectExpression": {
                const obj: Record<string, unknown> = {};
                for (const prop of (node as acorn.ObjectExpression).properties) {
                    if (prop.type !== "Property") continue;
                    const key =
                        prop.key.type === "Identifier"
                            ? prop.key.name
                            : String(evalExpr(prop.key as Expression, treeNodeId));
                    obj[key] = evalExpr(prop.value as Expression, treeNodeId);
                }
                return obj;
            }
            case "ArrowFunctionExpression":
            case "FunctionExpression":
                return storeFunction(node, treeNodeId);
            default:
                throw new Error(`Unsupported expression: ${node.type}`);
        }
    };

    const assignTarget = (target: Node, value: unknown, treeNodeId: string) => {
        if (target.type === "Identifier") {
            currentEnv().set((target as acorn.Identifier).name, value);
            return;
        }
        if (target.type === "MemberExpression") {
            const n = target as acorn.MemberExpression;
            const obj = evalExpr(n.object as Expression, treeNodeId) as Record<string | number, unknown>;
            const prop = n.computed
                ? evalExpr(n.property as Expression, treeNodeId)
                : (n.property as acorn.Identifier).name;
            obj[prop as string | number] = value;
        }
    };

    const storeFunction = (node: Node, treeNodeId: string): UserFunction => {
        const n = node as acorn.FunctionExpression | acorn.ArrowFunctionExpression;
        const params = n.params.map((p) => (p as acorn.Identifier).name);
        const body = n.body;
        return {
            kind: "function",
            name: "anonymous",
            params,
            body,
            closure: new Map(currentEnv()),
        };
    };

    const callUserFunction = (node: acorn.CallExpression, treeNodeId: string): unknown => {
        let fn: UserFunction | undefined;
        let name = "function";

        if (node.callee.type === "Identifier") {
            name = (node.callee as acorn.Identifier).name;
            const val = currentEnv().get(name);
            if (val && typeof val === "object" && (val as UserFunction).kind === "function") {
                fn = val as UserFunction;
            }
        }

        if (!fn) throw new Error(`'${name}' is not a callable function`);

        const callId = addTreeNode(treeNodeId, `Call ${name}()`, node.loc?.start.line);
        const callEnv = new Map(fn.closure);
        node.arguments.forEach((arg, i) => {
            if (fn!.params[i]) callEnv.set(fn!.params[i], evalExpr(arg as Expression, callId));
        });

        frames.push({ env: callEnv, label: `${name}()`, nodeId: callId });
        let result: unknown;
        try {
            if (fn.body.type === "BlockStatement") {
                result = execBlock(fn.body as acorn.BlockStatement, callId, true);
            } else {
                result = evalExpr(fn.body as Expression, callId);
            }
        } finally {
            frames.pop();
        }
        record(`Return from ${name}()`, node, callId);
        return result;
    };

    const execBlock = (block: acorn.BlockStatement, parentId: string, stopOnReturn = false): unknown => {
        let returnValue: unknown;
        for (const stmt of block.body) {
            const r = execStatement(stmt, parentId);
            if (stopOnReturn && r !== undefined && stmt.type === "ReturnStatement") {
                returnValue = r;
                break;
            }
        }
        return returnValue;
    };

    const execStatement = (stmt: Statement, parentId: string): unknown => {
        const stmtId = addTreeNode(parentId, statementLabel(stmt), stmt.loc?.start.line);
        record("Execute", stmt, stmtId);

        switch (stmt.type) {
            case "VariableDeclaration": {
                const n = stmt as acorn.VariableDeclaration;
                for (const decl of n.declarations) {
                    const name = (decl.id as acorn.Identifier).name;
                    const value = decl.init ? evalExpr(decl.init as Expression, stmtId) : undefined;
                    currentEnv().set(name, value);
                    record(`Declare ${name}`, decl as unknown as Node, stmtId);
                }
                return undefined;
            }
            case "ExpressionStatement": {
                return evalExpr((stmt as acorn.ExpressionStatement).expression as Expression, stmtId);
            }
            case "IfStatement": {
                const n = stmt as acorn.IfStatement;
                const test = evalExpr(n.test as Expression, stmtId);
                record(test ? "Condition true" : "Condition false", n.test as Node, stmtId);
                const branchId = addTreeNode(
                    stmtId,
                    test ? "Then branch" : "Else branch",
                    n.consequent.loc?.start.line
                );
                if (test) {
                    return execNode(n.consequent, branchId);
                }
                if (n.alternate) {
                    return execNode(n.alternate, branchId);
                }
                return undefined;
            }
            case "ForStatement": {
                const n = stmt as acorn.ForStatement;
                const loopId = addTreeNode(stmtId, "For loop", stmt.loc?.start.line);
                if (n.init) execNode(n.init, loopId);
                for (let i = 0; i < opts.maxLoopIterations; i++) {
                    if (n.test && !evalExpr(n.test as Expression, loopId)) break;
                    const iterId = addTreeNode(loopId, `Iteration ${i + 1}`, n.body.loc?.start.line);
                    execNode(n.body, iterId);
                    if (n.update) evalExpr(n.update as Expression, iterId);
                }
                return undefined;
            }
            case "WhileStatement": {
                const n = stmt as acorn.WhileStatement;
                const loopId = addTreeNode(stmtId, "While loop", stmt.loc?.start.line);
                for (let i = 0; i < opts.maxLoopIterations; i++) {
                    if (!evalExpr(n.test as Expression, loopId)) break;
                    const iterId = addTreeNode(loopId, `Iteration ${i + 1}`, n.body.loc?.start.line);
                    execNode(n.body, iterId);
                }
                return undefined;
            }
            case "BlockStatement":
                return execBlock(stmt as acorn.BlockStatement, stmtId);
            case "ReturnStatement": {
                const n = stmt as acorn.ReturnStatement;
                const val = n.argument ? evalExpr(n.argument as Expression, stmtId) : undefined;
                record("Return", stmt, stmtId);
                return val;
            }
            case "FunctionDeclaration": {
                const n = stmt as acorn.FunctionDeclaration;
                const name = n.id!.name;
                const fn: UserFunction = {
                    kind: "function",
                    name,
                    params: n.params.map((p) => (p as acorn.Identifier).name),
                    body: n.body,
                    closure: new Map(currentEnv()),
                };
                currentEnv().set(name, fn);
                functions.set(name, fn);
                record(`Define function ${name}`, stmt, stmtId);
                return undefined;
            }
            case "EmptyStatement":
                return undefined;
            default:
                throw new Error(`Unsupported statement: ${stmt.type}`);
        }
    };

    const execNode = (node: Node, parentId: string): unknown => {
        if (node.type === "BlockStatement") return execBlock(node as acorn.BlockStatement, parentId);
        return execStatement(node as Statement, parentId);
    };

    try {
        const js = stripTypeScript(source);
        const ast = acorn.parse(js, { ecmaVersion: 2020, locations: true }) as Program;
        for (const stmt of ast.body) {
            if (stmt.type === "ImportDeclaration" || stmt.type === "ExportNamedDeclaration" || stmt.type === "ExportDefaultDeclaration" || stmt.type === "ExportAllDeclaration") {
                continue;
            }
            execStatement(stmt as Statement, "root");
        }
        if (steps.length > 0) {
            record("Program finished", ast.body[ast.body.length - 1] ?? ast, "root");
        }
    } catch (e) {
        error = e instanceof Error ? e.message : "Failed to trace execution";
    }

    return { steps, tree, error, source };
}

function statementLabel(stmt: Statement): string {
    switch (stmt.type) {
        case "VariableDeclaration":
            return "Variable declaration";
        case "ExpressionStatement":
            return "Expression";
        case "IfStatement":
            return "If statement";
        case "ForStatement":
            return "For loop";
        case "WhileStatement":
            return "While loop";
        case "FunctionDeclaration":
            return "Function declaration";
        case "ReturnStatement":
            return "Return";
        case "BlockStatement":
            return "Block";
        default:
            return stmt.type;
    }
}

export function canTraceLanguage(language: string): boolean {
    return ["javascript", "typescript", "nodejs"].includes(language.toLowerCase());
}
