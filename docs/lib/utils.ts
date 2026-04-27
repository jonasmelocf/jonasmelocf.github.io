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
	const globalForLogs = globalThis as unknown as {
		sandboxedLogs: string[] | undefined;
	};
	globalForLogs.sandboxedLogs = [];

	const sandboxedConsoleLog = `console.log = (...args) => globalThis.sandboxedLogs.push(args.join(" "));`;
	Function(`${sandboxedConsoleLog}\n${code}`)();

	const logs = globalForLogs.sandboxedLogs;
	globalForLogs.sandboxedLogs = undefined;

	return logs;
}

export function copy<T>(value: T): T {
	return structuredClone(toRaw(value));
}
