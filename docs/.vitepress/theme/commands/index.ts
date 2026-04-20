import { type Command, Josh } from "../core/josh";
import { cachorro } from "./cachorro";
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
	]);
	josh.commandMap = commandMap;
	return josh;
}

function noop() {
	return "";
}
