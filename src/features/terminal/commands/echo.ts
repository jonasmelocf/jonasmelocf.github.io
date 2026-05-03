export function echo(...args: string[]) {
	if (args[0] === "-n") return `${args.slice(1).join(" ")}`;
	return `${args.join(" ")}${"<br>"}`;
}
