import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
