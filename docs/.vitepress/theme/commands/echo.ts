export function echo(...args: string[]) {
	return `${args.join(" ")}${"<br>"}`;
}
