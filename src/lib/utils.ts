import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toRaw } from "vue";

export function escapeHTML(text: string) {
	const div = document.createElement("div");
	div.innerText = text;
	return div.innerHTML;
}

export function merge(...args: ClassValue[]) {
	return twMerge(clsx(...args));
}

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Tries to JSON stringify data or return `undefined` */
export function stringify(data: unknown) {
	try {
		return JSON.stringify(data, null, 2);
	} catch {
		return undefined;
	}
}

/** Run JavaScript code inside a sandbox and returns an array of logs from `console.log` calls */
export function runSandboxedCode(code: string): string[] {
	const logs: unknown[][] = [];
	const sandboxConsole = {
		log: (...args: unknown[]) => void logs.push(args),
	};

	const runSandbox = new Function("console", code);
	runSandbox(sandboxConsole);

	return logs
		.map((logs) =>
			logs.map(log =>
				typeof log === "object" ? JSON.stringify(log) : String(log),
			).join(" ")
		);
}

export function copy<T>(value: T): T {
	return structuredClone(toRaw(value));
}

export const commentsRegex = /\/\/.*?$|\/\*.*\*\//gms;

export const nanToZero = (n: number) => (Number.isNaN(n) ? 0 : n);

export const tryOr = <T, K>(fn: () => T, or: K) => {
	try {
		return fn();
	} catch {
		return or;
	}
};

export const getQueryParam = (key: string) => {
	const params = new URLSearchParams(window.location.search);
	return params.get(key);
};

export function clamp(n: number, min: number, max: number) {
	return Math.max(Math.min(n, max), min);
}

/** Returns a random element from an array */
export function random<T>(arr: T[]): T;
/** Returns a random number between min and max (inclusive) */
export function random(min: number, max: number): number;
export function random<T>(arrOrMin: T[] | number, max?: number) {
	if (Array.isArray(arrOrMin)) {
		return arrOrMin[random(0, arrOrMin.length - 1)];
	}
	max ??= arrOrMin;
	return Math.floor(Math.random() * (max - arrOrMin + 1) + arrOrMin);
}

/** Solves a mathematical expression. Returns null on error. */
export function safeSolve(expression: string, vars?: Record<string, number>) {
	const varNames = vars ? Object.keys(vars) : [];
	const varValues = vars ? Object.values(vars) : [];
	const returnStatement = `return Number(${expression});`;
	// first tryOr checks for syntax errors
	const func = tryOr(() => new Function(...varNames, returnStatement), null);
	if (!func) {
		return null;
	}
	// second tryOr checks for "variable not defined" errors (ReferenceError)
	const result = tryOr(() => Number(func(...varValues)), null);
	return result;
}
