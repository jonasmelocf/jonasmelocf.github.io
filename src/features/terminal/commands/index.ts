import { type Command, Josh } from "@/lib/josh";
import { cachorro } from "./cachorro";
import { debug } from "./debug";
import { echo } from "./echo";
import { createHelpCommand } from "./help";
import { stack } from "./stack";
import { createVarsCommand } from "./vars";

export function createJosh() {
	const josh = new Josh();
	const commandMap = new Map<string, Command>([
		["", noop],
		["stack", stack],
		["echo", echo],
		["vars", createVarsCommand(josh)],
		["help", createHelpCommand(josh)],
		["cachorro", cachorro],
		["debug", debug],
	]);
	josh.commandMap = commandMap;
	return josh;
}

function noop() {
	return "";
}
