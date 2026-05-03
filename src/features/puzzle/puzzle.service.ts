import { format } from "pretty-format";
import { runSandboxedCode, stringify } from "@/lib/utils";
import type { Puzzle, TestCase } from "./puzzle.types";

export function toJsonFile(puzzles: Puzzle[]) {
	const map: Record<string, Puzzle> = {};
	for (const p of puzzles) map[p.id] = p;
	return stringify(map) ?? "Invalid JSON";
}

export function loadCode(puzzleId: string) {
	return localStorage.getItem(`puzzle:${puzzleId}`);
}

export function saveCode(puzzleId: string, code: string) {
	localStorage.setItem(`puzzle:${puzzleId}`, code);
}

export type TestResult = [string, boolean] | [string, false, Error];
export function runTest(test: TestCase, code: string): TestResult {
	try {
		const inputCode = `const input = () => ${JSON.stringify(test.input)};`;
		const sandboxCode = `${inputCode}\n${code}`;
		const result = runSandboxedCode(sandboxCode).join("\n");
		return [result, result === test.expects];
	} catch (error) {
		if (error instanceof Error) return ["", false, error];
		return ["", false, new Error(format(error))];
	}
}

export function getExamplePuzzle(): Puzzle {
	return {
		id: "example-id",
		code: "const [n] = input();\nconsole.log(n);",
		tests: [
			{
				input: ["example"],
				expects: "example",
			},
		],
	};
}
