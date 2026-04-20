import type { Josh } from "../core/josh";

export function createVarsCommand(josh: Josh) {
	return () => {
		const vars = Array.from(josh.variables.entries());
		const format = ([key, val]: string[]) => `${key}=${val}`;
		return vars.map(format).join("<br>") || "*empty*";
	};
}
