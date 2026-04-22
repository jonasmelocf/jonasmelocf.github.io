export type Command = (...args: string[]) => string | Promise<string>;
export class Josh {
	variables = new Map<string, string>();
	commandMap: Map<string, Command>;
	static varRegex = /\$[\wçãẽĩõũáéíóú]+/i;
	static tokenRegex =
		/"((?:[^\\"]||\\.)*)"|[^\s\\$]+|\S+|\$[\wçãẽĩõũáéíóú]+/gis;

	constructor(commandMap = new Map<string, Command>()) {
		this.commandMap = commandMap;
	}

	async execute(input: string) {
		const tokens = Array.from(
			input.matchAll(Josh.tokenRegex).map((token) => token[1] ?? token[0]),
		);
		console.log(tokens);
		return await this.parseTokens(tokens);
	}

	async parseTokens(tokens: string[]) {
		if (tokens.length === 0) return "";
		let token = tokens.at(0);
		while (token !== undefined) {
			// Declare variable
			if (Josh.varRegex.test(token)) {
				return this.declaraVariableFrom(tokens);
			}
			// For loop
			// for $i = 10 to 20 do echo
			if (token === "for") {
				tokens.shift();
				const variable = tokens[0];
				if (!variable || !Josh.varRegex.test(variable)) {
					return `error in for loop (did you forget to declare a variable?)`;
				}
				const res = this.declaraVariableFrom(tokens);
				if (res.startsWith("error")) return res;
				const start = Number(res);
				if (Number.isNaN(start)) {
					return `error in for loop (initial value is not a number)`;
				}
				if (tokens.shift() !== "to") {
					return `error in for loop (did you forget \`to\`?)`;
				}
				const end = Number(tokens.shift());
				if (Number.isNaN(end)) {
					return `error in for loop (end value is not a number)`;
				}
				if (tokens.shift() !== "do") {
					return `error in for loop (did you forget \`do\`?)`;
				}
				const output: string[] = [];
				if (start <= end) {
					for (let i = start; i <= end; i++) {
						this.variables.set(variable, String(i));
						output.push(await this.parseTokens([...tokens]));
					}
				} else {
					for (let i = end; i >= start; i--) {
						this.variables.set(variable, String(i));
						output.push(await this.parseTokens([...tokens]));
					}
				}
				return output.join("");
			}
			const command = tokens.shift();
			if (command) {
				const args: string[] = [];
				let token = tokens.shift();
				while (token !== undefined && token !== ";") {
					args.push(
						token
							// - Replace non backslash prefixed variables -
							.replace(
								/(?<!\\)\$\w+/gi,
								(name) => this.variables.get(name) ?? "",
							)
							// - Remove escape backslash (\" -> ") -
							.replace(/\\(.)/g, (_, capture) => capture),
					);
					token = tokens.shift();
				}
				return await this.runCommand(command, args);
			}
			token = tokens.shift();
		}
		return "";
	}

	private declaraVariableFrom(tokens: string[]) {
		const varName = tokens[0];
		tokens.shift();
		if (tokens.shift() !== "=") {
			return `error during declaration of variable ${varName} (did you forget \`=\`?)`;
		}
		const value = tokens.shift();
		if (value === undefined) {
			return `error during declaration of variable ${varName} (did you forget the value?)`;
		}
		this.variables.set(varName, this.variables.get(value) ?? value);
		return value;
	}

	async runCommand(commandName: string, args: string[]) {
		const command = this.commandMap.get(commandName);
		if (command === undefined) return this.notFound(commandName);
		return await command(...args);
	}

	private notFound(command: string) {
		if (this.commandMap.has(command.toLowerCase())) {
			return `command not found: ${command} (did you mean ${command.toLowerCase()}?)`;
		}
		return `command not found: ${command}`;
	}
}
