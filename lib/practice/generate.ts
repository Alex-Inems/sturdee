import type { Difficulty, PracticeProblem, PracticeTestCase, PracticeTopic } from "./types";

type ProblemBuilder = (variant: number, number: number) => PracticeProblem;

function fmt(v: unknown): string {
    return JSON.stringify(v);
}

function acceptance(difficulty: Difficulty, variant: number): number {
    const base = difficulty === "Easy" ? 62 : difficulty === "Medium" ? 48 : 34;
    return Math.min(89, base + (variant % 17));
}

function jsFn(name: string, params: string[], body: string): string {
    return `/**\n * @param {${params.map(() => "any").join("} {")}} \n */\nfunction ${name}(${params.join(", ")}) {\n${body}\n}`;
}

function pyFn(name: string, params: string[], body: string): string {
    return `def ${name}(${params.join(", ")}):\n${body.split("\n").map((l) => `    ${l}`).join("\n")}`;
}

function makeProblem(
    base: Omit<PracticeProblem, "number" | "acceptanceRate" | "seoKeywords"> & { seoKeywords?: string[] },
    number: number,
    variant: number
): PracticeProblem {
    const keywords = [
        base.title.toLowerCase(),
        `${base.difficulty.toLowerCase()} coding problem`,
        `${base.topic.toLowerCase()} practice`,
        "leetcode practice",
        "coding interview",
        "algorithm practice",
        ...(base.seoKeywords ?? []),
        ...base.topics.map((t) => t.toLowerCase()),
    ];
    return {
        ...base,
        number,
        acceptanceRate: acceptance(base.difficulty, variant),
        seoKeywords: [...new Set(keywords)],
    };
}

// ─── Array generators ───────────────────────────────────────────────────────

const arrayMax: ProblemBuilder = (v, n) => {
    const len = 5 + (v % 40);
    const nums = Array.from({ length: len }, (_, i) => (i * 7 + v * 3) % 97 - 20);
    const expected = Math.max(...nums);
    const cases: PracticeTestCase[] = [
        { input: [nums], expected },
        { input: [[1]], expected: 1 },
        { input: [[-5, -2, -9]], expected: -2 },
    ];
    return makeProblem(
        {
            slug: `array-max-element-${v}`,
            title: `Find Maximum Element ${v}`,
            difficulty: "Easy",
            topic: "Array",
            topics: ["array", "iteration"],
            description: `Given an integer array \`nums\` of length ${len > 10 ? "n" : len}, return the largest value in the array. This is variant **#${v}** — arrays may include negative numbers.`,
            examples: [{ input: `nums = ${fmt(nums)}`, output: fmt(expected) }],
            constraints: ["1 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4"],
            functionName: "findMax",
            starterCode: {
                javascript: jsFn("findMax", ["nums"], "    // Your code here\n    return nums[0];"),
                python: pyFn("find_max", ["nums"], "# Your code here\n    return nums[0]"),
            },
            solution: {
                javascript: jsFn("findMax", ["nums"], "    return Math.max(...nums);"),
                python: pyFn("find_max", ["nums"], "return max(nums)"),
            },
            testCases: cases,
        },
        n,
        v
    );
};

const arraySum: ProblemBuilder = (v, n) => {
    const len = 4 + (v % 30);
    const nums = Array.from({ length: len }, (_, i) => (i + v) % 50);
    const expected = nums.reduce((a, b) => a + b, 0);
    return makeProblem(
        {
            slug: `array-sum-${v}`,
            title: `Sum of Array Elements ${v}`,
            difficulty: "Easy",
            topic: "Array",
            topics: ["array", "math"],
            description: `Return the sum of all integers in \`nums\`. Variant **#${v}** focuses on clean iteration without built-in shortcuts.`,
            examples: [{ input: `nums = ${fmt(nums)}`, output: fmt(expected) }],
            constraints: ["1 <= nums.length <= 10^4", "-1000 <= nums[i] <= 1000"],
            functionName: "arraySum",
            starterCode: {
                javascript: jsFn("arraySum", ["nums"], "    let sum = 0;\n    return sum;"),
                python: pyFn("array_sum", ["nums"], "total = 0\n    return total"),
            },
            solution: {
                javascript: jsFn("arraySum", ["nums"], "    return nums.reduce((a, b) => a + b, 0);"),
                python: pyFn("array_sum", ["nums"], "return sum(nums)"),
            },
            testCases: [
                { input: [nums], expected },
                { input: [[1, 2, 3]], expected: 6 },
                { input: [[]], expected: 0 },
            ],
        },
        n,
        v
    );
};

const reverseArray: ProblemBuilder = (v, n) => {
    const nums = Array.from({ length: 3 + (v % 15) }, (_, i) => i + v);
    const expected = [...nums].reverse();
    return makeProblem(
        {
            slug: `reverse-array-${v}`,
            title: `Reverse Array ${v}`,
            difficulty: "Easy",
            topic: "Array",
            topics: ["array", "two-pointers"],
            description: `Reverse \`nums\` **in-place** and return the mutated array. Variant **#${v}**.`,
            examples: [{ input: `nums = ${fmt(nums)}`, output: fmt(expected) }],
            constraints: ["1 <= nums.length <= 10^4"],
            functionName: "reverseArray",
            starterCode: {
                javascript: jsFn("reverseArray", ["nums"], "    // Reverse in-place\n    return nums;"),
                python: pyFn("reverse_array", ["nums"], "return nums"),
            },
            solution: {
                javascript: jsFn("reverseArray", ["nums"], "    let l = 0, r = nums.length - 1;\n    while (l < r) {\n        [nums[l], nums[r]] = [nums[r], nums[l]];\n        l++; r--;\n    }\n    return nums;"),
                python: pyFn("reverse_array", ["nums"], "left, right = 0, len(nums) - 1\n    while left < right:\n        nums[left], nums[right] = nums[right], nums[left]\n        left += 1\n        right -= 1\n    return nums"),
            },
            testCases: [
                { input: [[...nums]], expected },
                { input: [[1]], expected: [1] },
                { input: [[1, 2]], expected: [2, 1] },
            ],
        },
        n,
        v
    );
};

const twoSum: ProblemBuilder = (v, n) => {
    const size = 4 + (v % 20);
    const a = (v * 3 + 1) % 50;
    const b = (v * 7 + 2) % 50;
    const nums = Array.from({ length: size }, (_, i) => (i * 11 + v) % 40);
    nums[1] = a;
    nums[size - 1] = b;
    const target = a + b;
    let i0 = -1,
        i1 = -1;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                i0 = i;
                i1 = j;
                break;
            }
        }
        if (i0 >= 0) break;
    }
    const expected = [i0, i1];
    return makeProblem(
        {
            slug: `two-sum-${v}`,
            title: `Two Sum ${v}`,
            difficulty: v % 3 === 0 ? "Medium" : "Easy",
            topic: "Array",
            topics: ["array", "hash-table"],
            description: `Given \`nums\` and \`target\`, return indices of two distinct numbers that add up to \`target\`. Exactly one solution exists. Variant **#${v}**.`,
            examples: [
                {
                    input: `nums = ${fmt(nums)}, target = ${target}`,
                    output: fmt(expected),
                    explanation: `nums[${i0}] + nums[${i1}] = ${target}`,
                },
            ],
            constraints: ["2 <= nums.length <= 10^4", "Each input has exactly one solution"],
            functionName: "twoSum",
            starterCode: {
                javascript: jsFn("twoSum", ["nums", "target"], "    // Return [i, j]\n    return [0, 1];"),
                python: pyFn("two_sum", ["nums", "target"], "return [0, 1]"),
            },
            solution: {
                javascript: jsFn(
                    "twoSum",
                    ["nums", "target"],
                    "    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const need = target - nums[i];\n        if (map.has(need)) return [map.get(need), i];\n        map.set(nums[i], i);\n    }\n    return [];"
                ),
                python: pyFn(
                    "two_sum",
                    ["nums", "target"],
                    "seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []"
                ),
            },
            testCases: [
                { input: [nums, target], expected },
                { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
                { input: [[3, 3], 6], expected: [0, 1] },
            ],
            seoKeywords: ["two sum", "pair sum indices"],
        },
        n,
        v
    );
};

const maxSubarray: ProblemBuilder = (v, n) => {
    const nums = Array.from({ length: 5 + (v % 12) }, (_, i) => ((i + v) % 7) - 3);
    let best = nums[0],
        cur = nums[0];
    for (let i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        best = Math.max(best, cur);
    }
    return makeProblem(
        {
            slug: `max-subarray-${v}`,
            title: `Maximum Subarray ${v}`,
            difficulty: "Medium",
            topic: "Array",
            topics: ["array", "dynamic-programming"],
            description: `Find the contiguous subarray with the largest sum (Kadane's algorithm). Variant **#${v}**.`,
            examples: [{ input: `nums = ${fmt(nums)}`, output: fmt(best) }],
            constraints: ["1 <= nums.length <= 10^5"],
            functionName: "maxSubArray",
            starterCode: {
                javascript: jsFn("maxSubArray", ["nums"], "    return 0;"),
                python: pyFn("max_sub_array", ["nums"], "return 0"),
            },
            solution: {
                javascript: jsFn(
                    "maxSubArray",
                    ["nums"],
                    "    let best = nums[0], cur = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        cur = Math.max(nums[i], cur + nums[i]);\n        best = Math.max(best, cur);\n    }\n    return best;"
                ),
                python: pyFn(
                    "max_sub_array",
                    ["nums"],
                    "best = cur = nums[0]\n    for n in nums[1:]:\n        cur = max(n, cur + n)\n        best = max(best, cur)\n    return best"
                ),
            },
            testCases: [
                { input: [nums], expected: best },
                { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
                { input: [[1]], expected: 1 },
            ],
            seoKeywords: ["kadane algorithm", "maximum subarray"],
        },
        n,
        v
    );
};

const containsDuplicate: ProblemBuilder = (v, n) => {
    const size = 4 + (v % 20);
    const nums = Array.from({ length: size }, (_, i) => (i + v) % (size - 1));
    const expected = new Set(nums).size !== nums.length;
    return makeProblem(
        {
            slug: `contains-duplicate-${v}`,
            title: `Contains Duplicate ${v}`,
            difficulty: "Easy",
            topic: "Hash Table",
            topics: ["hash-table", "array"],
            description: `Return \`true\` if any value appears at least twice in \`nums\`. Variant **#${v}**.`,
            examples: [{ input: `nums = ${fmt(nums)}`, output: fmt(expected) }],
            constraints: ["1 <= nums.length <= 10^5"],
            functionName: "containsDuplicate",
            starterCode: {
                javascript: jsFn("containsDuplicate", ["nums"], "    return false;"),
                python: pyFn("contains_duplicate", ["nums"], "return False"),
            },
            solution: {
                javascript: jsFn("containsDuplicate", ["nums"], "    return new Set(nums).size !== nums.length;"),
                python: pyFn("contains_duplicate", ["nums"], "return len(nums) != len(set(nums))"),
            },
            testCases: [
                { input: [nums], expected },
                { input: [[1, 2, 3, 1]], expected: true },
                { input: [[1, 2, 3, 4]], expected: false },
            ],
        },
        n,
        v
    );
};

// ─── String generators ──────────────────────────────────────────────────────

const reverseString: ProblemBuilder = (v, n) => {
    const s = `variant${v}code`;
    const chars = s.split("");
    const expected = [...chars].reverse();
    return makeProblem(
        {
            slug: `reverse-string-${v}`,
            title: `Reverse String ${v}`,
            difficulty: "Easy",
            topic: "String",
            topics: ["string", "two-pointers"],
            description: `Reverse the character array \`s\` in-place and return it. Variant **#${v}**.`,
            examples: [{ input: `s = ${fmt(chars)}`, output: fmt(expected) }],
            constraints: ["1 <= s.length <= 10^5", "s[i] is printable ASCII"],
            functionName: "reverseString",
            starterCode: {
                javascript: jsFn("reverseString", ["s"], "    return s;"),
                python: pyFn("reverse_string", ["s"], "return s"),
            },
            solution: {
                javascript: jsFn(
                    "reverseString",
                    ["s"],
                    "    let l = 0, r = s.length - 1;\n    while (l < r) { [s[l], s[r]] = [s[r], s[l]]; l++; r--; }\n    return s;"
                ),
                python: pyFn("reverse_string", ["s"], "left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1\n    return s"),
            },
            testCases: [
                { input: [[...chars]], expected },
                { input: [["h", "e", "l", "l", "o"]], expected: ["o", "l", "l", "e", "h"] },
            ],
        },
        n,
        v
    );
};

const validPalindrome: ProblemBuilder = (v, n) => {
    const words = ["racecar", "hello", "A man a plan a canal Panama", "open"];
    const s = words[v % words.length] + (v > 3 ? String(v) : "");
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const expected = clean === [...clean].reverse().join("");
    return makeProblem(
        {
            slug: `valid-palindrome-${v}`,
            title: `Valid Palindrome ${v}`,
            difficulty: "Easy",
            topic: "String",
            topics: ["string", "two-pointers"],
            description: `After removing non-alphanumeric characters and ignoring case, determine if \`s\` reads the same forward and backward. Variant **#${v}**.`,
            examples: [{ input: `s = "${s}"`, output: fmt(expected) }],
            constraints: ["1 <= s.length <= 2 * 10^5"],
            functionName: "isPalindrome",
            starterCode: {
                javascript: jsFn("isPalindrome", ["s"], "    return false;"),
                python: pyFn("is_palindrome", ["s"], "return False"),
            },
            solution: {
                javascript: jsFn(
                    "isPalindrome",
                    ["s"],
                    "    const t = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    return t === t.split('').reverse().join('');"
                ),
                python: pyFn(
                    "is_palindrome",
                    ["s"],
                    "t = ''.join(c.lower() for c in s if c.isalnum())\n    return t == t[::-1]"
                ),
            },
            testCases: [
                { input: [s], expected },
                { input: ["race a car"], expected: false },
                { input: [" "], expected: true },
            ],
        },
        n,
        v
    );
};

const isAnagram: ProblemBuilder = (v, n) => {
    const base = "abcdefgh";
    const a = base.slice(0, 4 + (v % 4)) + (v % 2 ? "x" : "");
    const b = a.split("").sort(() => (v % 2 ? -0.5 : 0.5)).join("");
    const sorted = (x: string) => x.split("").sort().join("");
    const expected = sorted(a) === sorted(b) && a.length === b.length;
    return makeProblem(
        {
            slug: `valid-anagram-${v}`,
            title: `Valid Anagram ${v}`,
            difficulty: "Easy",
            topic: "String",
            topics: ["string", "hash-table", "sorting"],
            description: `Return \`true\` if \`t\` is an anagram of \`s\`. Variant **#${v}**.`,
            examples: [{ input: `s = "${a}", t = "${b}"`, output: fmt(expected) }],
            constraints: ["1 <= s.length <= 5 * 10^4", "s and t consist of lowercase English letters"],
            functionName: "isAnagram",
            starterCode: {
                javascript: jsFn("isAnagram", ["s", "t"], "    return false;"),
                python: pyFn("is_anagram", ["s", "t"], "return False"),
            },
            solution: {
                javascript: jsFn(
                    "isAnagram",
                    ["s", "t"],
                    "    if (s.length !== t.length) return false;\n    const c = new Array(26).fill(0);\n    for (let i = 0; i < s.length; i++) {\n        c[s.charCodeAt(i) - 97]++;\n        c[t.charCodeAt(i) - 97]--;\n    }\n    return c.every((x) => x === 0);"
                ),
                python: pyFn("is_anagram", ["s", "t"], "return sorted(s) == sorted(t)"),
            },
            testCases: [
                { input: [a, b], expected },
                { input: ["anagram", "nagaram"], expected: true },
                { input: ["rat", "car"], expected: false },
            ],
        },
        n,
        v
    );
};

const longestSubstring: ProblemBuilder = (v, n) => {
    const alphabet = "abcdef";
    const s = Array.from({ length: 8 + (v % 10) }, (_, i) => alphabet[(i + v) % alphabet.length]).join("");
    let best = 0,
        seen = new Map<string, number>(),
        left = 0;
    for (let right = 0; right < s.length; right++) {
        const ch = s[right];
        if (seen.has(ch) && seen.get(ch)! >= left) left = seen.get(ch)! + 1;
        seen.set(ch, right);
        best = Math.max(best, right - left + 1);
    }
    return makeProblem(
        {
            slug: `longest-substring-without-repeating-${v}`,
            title: `Longest Substring Without Repeating ${v}`,
            difficulty: "Medium",
            topic: "Sliding Window",
            topics: ["sliding-window", "hash-table", "string"],
            description: `Return the length of the longest substring without repeating characters. Variant **#${v}**.`,
            examples: [{ input: `s = "${s}"`, output: fmt(best) }],
            constraints: ["0 <= s.length <= 5 * 10^4"],
            functionName: "lengthOfLongestSubstring",
            starterCode: {
                javascript: jsFn("lengthOfLongestSubstring", ["s"], "    return 0;"),
                python: pyFn("length_of_longest_substring", ["s"], "return 0"),
            },
            solution: {
                javascript: jsFn(
                    "lengthOfLongestSubstring",
                    ["s"],
                    "    const seen = new Map();\n    let best = 0, left = 0;\n    for (let right = 0; right < s.length; right++) {\n        const ch = s[right];\n        if (seen.has(ch) && seen.get(ch) >= left) left = seen.get(ch) + 1;\n        seen.set(ch, right);\n        best = Math.max(best, right - left + 1);\n    }\n    return best;"
                ),
                python: pyFn(
                    "length_of_longest_substring",
                    ["s"],
                    "seen = {}\n    best = left = 0\n    for right, ch in enumerate(s):\n        if ch in seen and seen[ch] >= left:\n            left = seen[ch] + 1\n        seen[ch] = right\n        best = max(best, right - left + 1)\n    return best"
                ),
            },
            testCases: [
                { input: [s], expected: best },
                { input: ["abcabcbb"], expected: 3 },
                { input: ["bbbbb"], expected: 1 },
            ],
            seoKeywords: ["sliding window substring"],
        },
        n,
        v
    );
};

// ─── Math / DP / Binary Search ──────────────────────────────────────────────

const fibonacci: ProblemBuilder = (v, n) => {
    const k = 5 + (v % 25);
    let a = 0,
        b = 1;
    for (let i = 0; i < k; i++) {
        [a, b] = [b, a + b];
    }
    const expected = a;
    return makeProblem(
        {
            slug: `fibonacci-number-${v}`,
            title: `Fibonacci Number ${v}`,
            difficulty: "Easy",
            topic: "Math",
            topics: ["math", "dynamic-programming", "recursion"],
            description: `Return the \`${k}\`th Fibonacci number (0-indexed: F(0)=0, F(1)=1). Variant **#${v}**.`,
            examples: [{ input: `n = ${k}`, output: fmt(expected) }],
            constraints: ["0 <= n <= 30"],
            functionName: "fib",
            starterCode: {
                javascript: jsFn("fib", ["n"], "    return 0;"),
                python: pyFn("fib", ["n"], "return 0"),
            },
            solution: {
                javascript: jsFn(
                    "fib",
                    ["n"],
                    "    if (n <= 1) return n;\n    let a = 0, b = 1;\n    for (let i = 2; i <= n; i++) [a, b] = [b, a + b];\n    return b;"
                ),
                python: pyFn("fib", ["n"], "a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a"),
            },
            testCases: [
                { input: [k], expected },
                { input: [0], expected: 0 },
                { input: [1], expected: 1 },
                { input: [10], expected: 55 },
            ],
        },
        n,
        v
    );
};

const climbStairs: ProblemBuilder = (v, n) => {
    const steps = 3 + (v % 20);
    let a = 1,
        b = 1;
    for (let i = 2; i <= steps; i++) [a, b] = [b, a + b];
    const expected = steps <= 1 ? 1 : b;
    return makeProblem(
        {
            slug: `climbing-stairs-${v}`,
            title: `Climbing Stairs ${v}`,
            difficulty: "Easy",
            topic: "Dynamic Programming",
            topics: ["dynamic-programming", "math"],
            description: `You can climb 1 or 2 steps at a time. Return how many distinct ways to reach step \`n\`. Variant **#${v}**.`,
            examples: [{ input: `n = ${steps}`, output: fmt(expected) }],
            constraints: ["1 <= n <= 45"],
            functionName: "climbStairs",
            starterCode: {
                javascript: jsFn("climbStairs", ["n"], "    return 1;"),
                python: pyFn("climb_stairs", ["n"], "return 1"),
            },
            solution: {
                javascript: jsFn(
                    "climbStairs",
                    ["n"],
                    "    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) [a, b] = [b, a + b];\n    return b;"
                ),
                python: pyFn(
                    "climb_stairs",
                    ["n"],
                    "a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b if n > 1 else n"
                ),
            },
            testCases: [
                { input: [steps], expected },
                { input: [2], expected: 2 },
                { input: [3], expected: 3 },
            ],
        },
        n,
        v
    );
};

const binarySearch: ProblemBuilder = (v, n) => {
    const len = 8 + (v % 30);
    const nums = Array.from({ length: len }, (_, i) => i * 2 + v);
    const target = nums[(v * 3) % len];
    const expected = nums.indexOf(target);
    return makeProblem(
        {
            slug: `binary-search-${v}`,
            title: `Binary Search ${v}`,
            difficulty: v % 4 === 0 ? "Medium" : "Easy",
            topic: "Binary Search",
            topics: ["binary-search", "array"],
            description: `Search \`target\` in sorted ascending \`nums\`. Return index or \`-1\`. Variant **#${v}**.`,
            examples: [{ input: `nums = ${fmt(nums)}, target = ${target}`, output: fmt(expected) }],
            constraints: ["1 <= nums.length <= 10^4", "nums is sorted in ascending order"],
            functionName: "search",
            starterCode: {
                javascript: jsFn("search", ["nums", "target"], "    return -1;"),
                python: pyFn("search", ["nums", "target"], "return -1"),
            },
            solution: {
                javascript: jsFn(
                    "search",
                    ["nums", "target"],
                    "    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const m = (l + r) >> 1;\n        if (nums[m] === target) return m;\n        if (nums[m] < target) l = m + 1; else r = m - 1;\n    }\n    return -1;"
                ),
                python: pyFn(
                    "search",
                    ["nums", "target"],
                    "left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1"
                ),
            },
            testCases: [
                { input: [nums, target], expected },
                { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
                { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
            ],
        },
        n,
        v
    );
};

const coinChange: ProblemBuilder = (v, n) => {
    const coins = [1, 2, 5, 10].slice(0, 2 + (v % 3));
    const amount = 5 + (v % 30);
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let a = 1; a <= amount; a++) {
        for (const c of coins) {
            if (a >= c) dp[a] = Math.min(dp[a], dp[a - c] + 1);
        }
    }
    const expected = dp[amount] === Infinity ? -1 : dp[amount];
    return makeProblem(
        {
            slug: `coin-change-${v}`,
            title: `Coin Change ${v}`,
            difficulty: "Medium",
            topic: "Dynamic Programming",
            topics: ["dynamic-programming", "bfs"],
            description: `Return the fewest coins needed to make \`amount\`, or \`-1\` if impossible. Variant **#${v}**.`,
            examples: [{ input: `coins = ${fmt(coins)}, amount = ${amount}`, output: fmt(expected) }],
            constraints: ["1 <= coins.length <= 12", "0 <= amount <= 10^4"],
            functionName: "coinChange",
            starterCode: {
                javascript: jsFn("coinChange", ["coins", "amount"], "    return -1;"),
                python: pyFn("coin_change", ["coins", "amount"], "return -1"),
            },
            solution: {
                javascript: jsFn(
                    "coinChange",
                    ["coins", "amount"],
                    "    const dp = Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let a = 1; a <= amount; a++) {\n        for (const c of coins) if (a >= c) dp[a] = Math.min(dp[a], dp[a - c] + 1);\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];"
                ),
                python: pyFn(
                    "coin_change",
                    ["coins", "amount"],
                    "dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for a in range(1, amount + 1):\n        for c in coins:\n            if a >= c:\n                dp[a] = min(dp[a], dp[a - c] + 1)\n    return -1 if dp[amount] == float('inf') else dp[amount]"
                ),
            },
            testCases: [
                { input: [coins, amount], expected },
                { input: [[1, 2, 5], 11], expected: 3 },
                { input: [[2], 3], expected: -1 },
            ],
        },
        n,
        v
    );
};

// ─── Stack / Tree / Graph ───────────────────────────────────────────────────

const validParentheses: ProblemBuilder = (v, n) => {
    const pairs = ["()", "(())", "()[]{}", "([{}])", "([)]", "]{[("];
    const s = pairs[v % pairs.length] + (v > 5 ? ")".repeat(v % 3) : "");
    const stack: string[] = [];
    const map: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
    let valid = true;
    for (const ch of s) {
        if ("([{".includes(ch)) stack.push(ch);
        else if (")]}".includes(ch)) {
            if (stack.pop() !== map[ch]) {
                valid = false;
                break;
            }
        }
    }
    if (stack.length) valid = false;
    return makeProblem(
        {
            slug: `valid-parentheses-${v}`,
            title: `Valid Parentheses ${v}`,
            difficulty: "Easy",
            topic: "Stack",
            topics: ["stack", "string"],
            description: `Determine if \`s\` has valid bracket pairs \`()\`, \`[]\`, \`{}\`. Variant **#${v}**.`,
            examples: [{ input: `s = "${s}"`, output: fmt(valid) }],
            constraints: ["1 <= s.length <= 10^4"],
            functionName: "isValid",
            starterCode: {
                javascript: jsFn("isValid", ["s"], "    return false;"),
                python: pyFn("is_valid", ["s"], "return False"),
            },
            solution: {
                javascript: jsFn(
                    "isValid",
                    ["s"],
                    "    const st = [], map = { ')': '(', ']': '[', '}': '{' };\n    for (const ch of s) {\n        if ('([{'.includes(ch)) st.push(ch);\n        else if (st.pop() !== map[ch]) return false;\n    }\n    return st.length === 0;"
                ),
                python: pyFn(
                    "is_valid",
                    ["s"],
                    "stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif not stack or stack.pop() != pairs[ch]:\n            return False\n    return len(stack) == 0"
                ),
            },
            testCases: [
                { input: [s], expected: valid },
                { input: ["()"], expected: true },
                { input: ["(]"], expected: false },
            ],
        },
        n,
        v
    );
};

const maxDepthTree: ProblemBuilder = (v, n) => {
    const depth = 1 + (v % 6);
    type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };
    const root: TreeNode = { val: 1, left: null, right: null };
    let node: TreeNode = root;
    for (let i = 1; i < depth; i++) {
        node.left = { val: i + 1, left: null, right: null };
        node = node.left;
    }
    return makeProblem(
        {
            slug: `maximum-depth-of-binary-tree-${v}`,
            title: `Maximum Depth of Binary Tree ${v}`,
            difficulty: "Easy",
            topic: "Tree",
            topics: ["tree", "dfs", "bfs"],
            description: `Return the maximum depth of a binary tree. Trees are passed as nested objects \`{ val, left, right }\`. Variant **#${v}**.`,
            examples: [{ input: `root = nested tree (depth ${depth})`, output: fmt(depth) }],
            constraints: ["Number of nodes is in [0, 10^4]"],
            functionName: "maxDepth",
            starterCode: {
                javascript: jsFn("maxDepth", ["root"], "    return 0;"),
                python: pyFn("max_depth", ["root"], "return 0"),
            },
            solution: {
                javascript: jsFn(
                    "maxDepth",
                    ["root"],
                    "    if (!root) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));"
                ),
                python: pyFn(
                    "max_depth",
                    ["root"],
                    "if not root:\n        return 0\n    return 1 + max(max_depth(root.get('left')), max_depth(root.get('right')))"
                ),
            },
            testCases: [
                { input: [root], expected: depth },
                { input: [null], expected: 0 },
                {
                    input: [{ val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } }],
                    expected: 2,
                },
            ],
        },
        n,
        v
    );
};

const numIslands: ProblemBuilder = (v, n) => {
    const rows = 3 + (v % 4);
    const cols = 3 + (v % 5);
    const grid: string[][] = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ((r + c + v) % 3 === 0 ? "1" : "0"))
    );
    const visited = new Set<string>();
    const dfs = (r: number, c: number) => {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === "0" || visited.has(`${r},${c}`)) return;
        visited.add(`${r},${c}`);
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "1" && !visited.has(`${r},${c}`)) {
                count++;
                dfs(r, c);
            }
        }
    }
    return makeProblem(
        {
            slug: `number-of-islands-${v}`,
            title: `Number of Islands ${v}`,
            difficulty: "Medium",
            topic: "Graph",
            topics: ["graph", "dfs", "matrix"],
            description: `Count islands of \`'1'\` cells in a 2D grid (\`'0'\` is water). Variant **#${v}**.`,
            examples: [{ input: `grid = ${rows}x${cols} matrix`, output: fmt(count) }],
            constraints: ["m == grid.length", "n == grid[i].length"],
            functionName: "numIslands",
            starterCode: {
                javascript: jsFn("numIslands", ["grid"], "    return 0;"),
                python: pyFn("num_islands", ["grid"], "return 0"),
            },
            solution: {
                javascript: jsFn(
                    "numIslands",
                    ["grid"],
                    "    if (!grid.length) return 0;\n    let count = 0;\n    const dfs = (r, c) => {\n        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === '0') return;\n        grid[r][c] = '0';\n        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);\n    };\n    for (let r = 0; r < grid.length; r++)\n        for (let c = 0; c < grid[0].length; c++)\n            if (grid[r][c] === '1') { count++; dfs(r, c); }\n    return count;"
                ),
                python: pyFn(
                    "num_islands",
                    ["grid"],
                    "if not grid:\n        return 0\n    rows, cols = len(grid), len(grid[0])\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':\n            return\n        grid[r][c] = '0'\n        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)\n    count = 0\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                count += 1\n                dfs(r, c)\n    return count"
                ),
            },
            testCases: [
                { input: [grid.map((row) => [...row])], expected: count },
                {
                    input: [
                        [
                            ["1", "1", "0"],
                            ["0", "1", "0"],
                            ["0", "0", "1"],
                        ],
                    ],
                    expected: 2,
                },
            ],
        },
        n,
        v
    );
};

const singleNumber: ProblemBuilder = (v, n) => {
    const nums = [2, 2, 3, 4, 4, 5, 5, v % 7];
    const expected = nums.reduce((a, b) => a ^ b, 0);
    return makeProblem(
        {
            slug: `single-number-${v}`,
            title: `Single Number ${v}`,
            difficulty: "Easy",
            topic: "Bit Manipulation",
            topics: ["bit-manipulation", "array"],
            description: `Every element appears twice except one. Find that single one using O(n) time and O(1) space. Variant **#${v}**.`,
            examples: [{ input: `nums = ${fmt(nums)}`, output: fmt(expected) }],
            constraints: ["1 <= nums.length <= 3 * 10^4"],
            functionName: "singleNumber",
            starterCode: {
                javascript: jsFn("singleNumber", ["nums"], "    return 0;"),
                python: pyFn("single_number", ["nums"], "return 0"),
            },
            solution: {
                javascript: jsFn("singleNumber", ["nums"], "    return nums.reduce((a, b) => a ^ b, 0);"),
                python: pyFn("single_number", ["nums"], "xor = 0\n    for n in nums:\n        xor ^= n\n    return xor"),
            },
            testCases: [
                { input: [nums], expected },
                { input: [[4, 1, 2, 1, 2]], expected: 4 },
            ],
        },
        n,
        v
    );
};

const minStackDesign: ProblemBuilder = (v, n) => {
    const ops = [
        ["MinStack", "push", "push", "getMin", "pop", "getMin"],
        [[], [-2], [0], [], [], []],
    ];
    return makeProblem(
        {
            slug: `min-stack-${v}`,
            title: `Min Stack ${v}`,
            difficulty: "Medium",
            topic: "Design",
            topics: ["design", "stack"],
            description: `Design a stack that supports \`push\`, \`pop\`, and \`getMin\` in O(1). Implement \`MinStack\` as a class/constructor. Variant **#${v}**. For this problem, return the results of each operation in order.`,
            examples: [
                {
                    input: `operations (see test cases)`,
                    output: `[null, null, null, -2, null, 0]`,
                },
            ],
            constraints: ["Methods pop, getMin, push are always valid"],
            functionName: "runMinStack",
            starterCode: {
                javascript: `class MinStack {\n  constructor() {}\n  push(val) {}\n  pop() {}\n  getMin() { return 0; }\n}\n\nfunction runMinStack(ops, args) {\n  const out = [];\n  let st = null;\n  for (let i = 0; i < ops.length; i++) {\n    // execute ops[i] with args[i]\n  }\n  return out;\n}`,
                python: `class MinStack:\n    def __init__(self):\n        pass\n\ndef run_min_stack(ops, args):\n    return []`,
            },
            solution: {
                javascript: `class MinStack {\n  constructor() { this.s = []; this.m = []; }\n  push(val) {\n    this.s.push(val);\n    this.m.push(this.m.length ? Math.min(this.m[this.m.length - 1], val) : val);\n  }\n  pop() { this.s.pop(); this.m.pop(); }\n  getMin() { return this.m[this.m.length - 1]; }\n}\n\nfunction runMinStack(ops, args) {\n  const out = [];\n  let st = null;\n  for (let i = 0; i < ops.length; i++) {\n    const op = ops[i], a = args[i];\n    if (op === 'MinStack') { st = new MinStack(); out.push(null); }\n    else if (op === 'push') { st.push(a[0]); out.push(null); }\n    else if (op === 'pop') { st.pop(); out.push(null); }\n    else if (op === 'getMin') out.push(st.getMin());\n  }\n  return out;\n}`,
                python: `class MinStack:\n    def __init__(self):\n        self.s, self.m = [], []\n    def push(self, val):\n        self.s.append(val)\n        self.m.append(val if not self.m else min(self.m[-1], val))\n    def pop(self):\n        self.s.pop(); self.m.pop()\n    def get_min(self):\n        return self.m[-1]`,
            },
            testCases: [
                {
                    input: [
                        ["MinStack", "push", "push", "getMin", "pop", "getMin"],
                        [[], [-2], [0], [], [], []],
                    ],
                    expected: [null, null, null, -2, null, 0],
                },
            ],
        },
        n,
        v
    );
};

const buySellStock: ProblemBuilder = (v, n) => {
    const prices = Array.from({ length: 6 + (v % 10) }, (_, i) => 10 + ((i * 3 + v) % 7) - 2);
    let min = prices[0],
        best = 0;
    for (const p of prices) {
        min = Math.min(min, p);
        best = Math.max(best, p - min);
    }
    return makeProblem(
        {
            slug: `best-time-to-buy-sell-stock-${v}`,
            title: `Best Time to Buy and Sell Stock ${v}`,
            difficulty: "Easy",
            topic: "Array",
            topics: ["array", "dynamic-programming"],
            description: `Return the maximum profit from one buy and one sell. Variant **#${v}**.`,
            examples: [{ input: `prices = ${fmt(prices)}`, output: fmt(best) }],
            constraints: ["1 <= prices.length <= 10^5"],
            functionName: "maxProfit",
            starterCode: {
                javascript: jsFn("maxProfit", ["prices"], "    return 0;"),
                python: pyFn("max_profit", ["prices"], "return 0"),
            },
            solution: {
                javascript: jsFn(
                    "maxProfit",
                    ["prices"],
                    "    let min = prices[0], best = 0;\n    for (const p of prices) {\n        min = Math.min(min, p);\n        best = Math.max(best, p - min);\n    }\n    return best;"
                ),
                python: pyFn(
                    "max_profit",
                    ["prices"],
                    "min_p, best = prices[0], 0\n    for p in prices:\n        min_p = min(min_p, p)\n        best = max(best, p - min_p)\n    return best"
                ),
            },
            testCases: [
                { input: [prices], expected: best },
                { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
                { input: [[7, 6, 4, 3, 1]], expected: 0 },
            ],
            seoKeywords: ["stock profit", "buy sell stock"],
        },
        n,
        v
    );
};

const mergeSorted: ProblemBuilder = (v, n) => {
    const a = Array.from({ length: 3 + (v % 5) }, (_, i) => i * 2 + v);
    const b = Array.from({ length: 3 + (v % 4) }, (_, i) => i * 2 + v + 1);
    const expected = [...a, ...b].sort((x, y) => x - y);
    return makeProblem(
        {
            slug: `merge-sorted-array-${v}`,
            title: `Merge Sorted Arrays ${v}`,
            difficulty: "Easy",
            topic: "Sorting",
            topics: ["array", "sorting", "two-pointers"],
            description: `Merge two sorted arrays \`nums1\` and \`nums2\` into one sorted array. Variant **#${v}**.`,
            examples: [{ input: `nums1 = ${fmt(a)}, nums2 = ${fmt(b)}`, output: fmt(expected) }],
            constraints: ["nums1 and nums2 are sorted ascending"],
            functionName: "merge",
            starterCode: {
                javascript: jsFn("merge", ["nums1", "nums2"], "    return [];"),
                python: pyFn("merge", ["nums1", "nums2"], "return []"),
            },
            solution: {
                javascript: jsFn(
                    "merge",
                    ["nums1", "nums2"],
                    "    const out = [];\n    let i = 0, j = 0;\n    while (i < nums1.length && j < nums2.length) {\n        if (nums1[i] <= nums2[j]) out.push(nums1[i++]);\n        else out.push(nums2[j++]);\n    }\n    return out.concat(nums1.slice(i)).concat(nums2.slice(j));"
                ),
                python: pyFn("merge", ["nums1", "nums2"], "i = j = 0\n    out = []\n    while i < len(nums1) and j < len(nums2):\n        if nums1[i] <= nums2[j]:\n            out.append(nums1[i]); i += 1\n        else:\n            out.append(nums2[j]); j += 1\n    return out + nums1[i:] + nums2[j:]"),
            },
            testCases: [
                { input: [a, b], expected },
                { input: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] },
                { input: [[], [1]], expected: [1] },
            ],
        },
        n,
        v
    );
};

// ─── Catalog assembly ───────────────────────────────────────────────────────

const GENERATOR_SPECS: { builder: ProblemBuilder; count: number }[] = [
    { builder: arrayMax, count: 55 },
    { builder: arraySum, count: 50 },
    { builder: reverseArray, count: 45 },
    { builder: twoSum, count: 70 },
    { builder: maxSubarray, count: 55 },
    { builder: containsDuplicate, count: 45 },
    { builder: buySellStock, count: 40 },
    { builder: mergeSorted, count: 40 },
    { builder: reverseString, count: 50 },
    { builder: validPalindrome, count: 45 },
    { builder: isAnagram, count: 50 },
    { builder: longestSubstring, count: 55 },
    { builder: fibonacci, count: 45 },
    { builder: climbStairs, count: 45 },
    { builder: binarySearch, count: 60 },
    { builder: coinChange, count: 50 },
    { builder: validParentheses, count: 50 },
    { builder: maxDepthTree, count: 40 },
    { builder: numIslands, count: 45 },
    { builder: singleNumber, count: 45 },
    { builder: minStackDesign, count: 30 },
];

function buildCatalog(): PracticeProblem[] {
    const problems: PracticeProblem[] = [];
    let number = 1;
    for (const spec of GENERATOR_SPECS) {
        for (let v = 1; v <= spec.count; v++) {
            problems.push(spec.builder(v, number));
            number++;
        }
    }
    return problems;
}

let _catalog: PracticeProblem[] | null = null;

export function getPracticeCatalog(): PracticeProblem[] {
    if (!_catalog) _catalog = buildCatalog();
    return _catalog;
}

export const PRACTICE_PROBLEM_COUNT = GENERATOR_SPECS.reduce((s, g) => s + g.count, 0);

export const PRACTICE_TOPICS: PracticeTopic[] = [
    "Array",
    "String",
    "Hash Table",
    "Two Pointers",
    "Sliding Window",
    "Stack",
    "Queue",
    "Linked List",
    "Tree",
    "Graph",
    "Binary Search",
    "Dynamic Programming",
    "Backtracking",
    "Greedy",
    "Heap",
    "Math",
    "Bit Manipulation",
    "Design",
    "Sorting",
];

export function topicSlug(topic: PracticeTopic): string {
    return topic.toLowerCase().replace(/\s+/g, "-");
}

export function getPracticeProblem(slug: string): PracticeProblem | undefined {
    return getPracticeCatalog().find((p) => p.slug === slug);
}

export function getProblemsByTopic(topic: PracticeTopic): PracticeProblem[] {
    return getPracticeCatalog().filter((p) => p.topic === topic);
}

export function getAdjacentProblems(slug: string): { prev?: PracticeProblem; next?: PracticeProblem } {
    const catalog = getPracticeCatalog();
    const idx = catalog.findIndex((p) => p.slug === slug);
    if (idx < 0) return {};
    return { prev: catalog[idx - 1], next: catalog[idx + 1] };
}

export function getDifficultyCounts() {
    const catalog = getPracticeCatalog();
    return {
        Easy: catalog.filter((p) => p.difficulty === "Easy").length,
        Medium: catalog.filter((p) => p.difficulty === "Medium").length,
        Hard: catalog.filter((p) => p.difficulty === "Hard").length,
    };
}
