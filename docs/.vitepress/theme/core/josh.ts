export type Command = (...args: string[]) => string | Promise<string>;
export class Josh {
	variables = new Map<string, string>();
	commandMap: Map<string, Command>;

	constructor(commandMap = new Map<string, Command>()) {
		this.commandMap = commandMap;
	}

	async execute(input: string): Promise<string> {
		const [command, ...args] = input.split(" ").map((arg) => arg.trim());

		if (command === "for") {
			return this.forLoop(args);
		}

		if (this.isVarDeclaration(input)) {
			const [key, value] = input.split("=").map((part) => part.trim());
			this.variables.set(key, this.replaceVariables(value));
			return value;
		}

		const program = this.commandMap.get(command);
		if (!program) return this.notFound(command);
		return await program(...args.map((arg) => this.replaceVariables(arg)));
	}

	private notFound(command: string) {
		if (this.commandMap.has(command.toLowerCase())) {
			return `command not found: ${command} (did you mean ${command.toLowerCase()}?)`;
		}
		return `command not found: ${command}`;
	}

	private async forLoop(args: string[]): Promise<string> {
		const variable = args.shift();
		const start = Number(args.shift());
		const end = Number(args.shift());
		const command = args.shift();
		if (
			!variable ||
			!Number.isInteger(start) ||
			!Number.isInteger(end) ||
			!command
		) {
			return "syntax: for (var) (start) (end) (command) (...args)<br>example: for i 1 5 echo $i iteration";
		}
		const output: string[] = [];
		for (let i = start; i <= end; i++) {
			this.variables.set(`$${variable}`, String(i));
			output.push(await this.execute(`${command} ${args.join(" ")}`));
		}
		return output.join("");
	}

	private replaceVariables(input: string) {
		return input.replace(
			/\$[a-z0-9_]+?\b/gi,
			(variable) => this.variables.get(variable) ?? variable,
		);
	}

	private isVarDeclaration(arg: string) {
		return /^\$[a-z_]+[a-z0-9_]* *= *.+/i.test(arg);
	}
}
