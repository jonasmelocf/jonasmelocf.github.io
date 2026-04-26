import type { Josh } from "@/lib/josh";

export function createHelpCommand(josh: Josh) {
	return (arg: string) => help(josh, arg);
}

export function help(josh: Josh, command: string) {
	const commands = josh.commandMap.keys().toArray();
	if (!command)
		return `
syntax: help (command)<br>
for loop: help for<br>
assigning a variable: $var = 10<br>
if a command doesn't have a help page, try passing "-h" or "--help" as the first argument
available commands:<br>
${commands
	.filter((command) => command) // this filter removes the "" command
	.map((command) => `· ${command}`)
	.join("<br>")}`;

	switch (command) {
		case "cachorro":
			return "say hi to a random doggo";
		case "stack":
			return "Jonas de Melo's preferred stack for web development";
		case "color":
			return colorHelp;
		case "for":
			return forHelp;
		case "clear":
			return "clears the terminal.";
		case "echo":
			return "prints the arguments passed. pass `-n` as the first argument to stop line break";
		case "vars":
			return "prints all variables and their values.";
		case "help":
			return "...";
		case "me":
			return "you are a human being.";
		case "you":
			return "i'm a terminal";
		case "us":
			return "we are here";
		case "here":
			return "here is a website with information about this guy.";
		case "terminal":
			return "that's me";
		default:
			return `no help page found for ${command}`;
	}
}

const forHelp = `
runs a command any amount of time and stores the iteration index inside a variable.<br>
syntax: for (var) = (start) to (end) do (command) (arguments) ;<br>
example:<br>
for $i = 1 to 10 do echo "Iteration: $i" ;
`;

const colorHelp = `
changes the color of the terminal.<br>
pass no arguments to set the default color (white).<br>
examples:<br>
· color light blue<br>
· color red
`;
