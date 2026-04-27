<script setup lang="ts">
import { type CSSProperties, nextTick, ref, useTemplateRef, watch } from "vue";
import Spinner from "@/components/Spinner.vue";
import { escapeHTML } from "@/lib/utils";
import { createJosh } from "./commands";

// - Utilities -
const random = <T>(arr: T[]) => arr[(Math.random() * arr.length) | 0];
type Color = CSSProperties["color"];

// — Props —
const props = defineProps(["intro"]);

// — Constants —
const prefixes = ["$ ", "~> ", "|> ", ">. ", ">_ ", "# ", "-> ", "=> ", "> ", ">>> ", "josh> ", "👉 "];
let prefix = random(prefixes);

// — State —
const color = ref<Color>("white");
const history = ref<string[]>([]);
const isLoading = ref(false);
let historyIndex: number | undefined;

// — Template refs —
const containerRef = useTemplateRef("container");
const terminalRef = useTemplateRef("terminal");

// — Terminal instance —
const josh = createJosh();

// — Actions —
const scrollToBottom = () =>
	containerRef.value?.scrollTo(0, containerRef.value.scrollHeight);

const focusInput = () => terminalRef.value?.focus();

const clearTerminal = () => {
	history.value.splice(0);
};

async function log(...msg: string[]) {
	history.value.push(msg.join(" "));
	await nextTick();
	scrollToBottom();
}

function handleNavigateHistory(step: number) {
	if (!terminalRef.value) return;

	const commands = history.value.filter((val) => val.startsWith(prefix)).reverse();
	if (!commands.length) return;

	if (historyIndex === undefined) {
		historyIndex = 0;
	} else {
		historyIndex = Math.min(Math.max(historyIndex + step, 0), commands.length - 1);
	}

	const last = commands[historyIndex]?.replace(prefix, "") ?? "";
	const terminal = terminalRef.value;

	focusInput();
	terminal.value = last;
	terminal.setSelectionRange(last.length, last.length);
}

async function handleInput() {
	if (terminalRef.value == null) return;

	historyIndex = undefined;

	const inputElement = terminalRef.value;
	const input = inputElement.value;
	inputElement.value = "";

	log(prefix + escapeHTML(input));

	isLoading.value = true;
	await josh
		.execute(input)
		.then(log)
		.catch(log)
		.finally(async () => {
			isLoading.value = false;
			await nextTick();
			focusInput(); // input loses focus after event, so we focus it again
		});
}

// — Command registration —
josh.commandMap.set("clear", () => {
	clearTerminal();
	return "";
});

josh.commandMap.set("color", (...args: string[]) => {
	color.value = args.join("") || "white";
	return "";
});

josh.commandMap.set("prefix", (arg: string) => {
	if (["-h", "--help"].includes(arg)) {
		return "changes the prefix with the argument. pass no arguments for a random prefix. example: prefix \"%> \" ";
	}
	if (arg) {
		prefix = arg;
	} else {
		prefix = random(prefixes);
	}
	return "prefix updated";
})

// — Watchers —
// Changing the page language doesn't refresh the page.
// Because of that, this setup script is not re-executed.
// So we need to watch if the prop changed and "restart" the terminal.
watch(
	() => props.intro,
	(intro) => {
		clearTerminal();
		const escapedIntro = intro.replace(/"/g, '\\"');
		josh.execute(`echo "${escapedIntro}"`).then(log).finally(focusInput);
	},
	{ immediate: true },
);
</script>
<template>
	<div ref="container" :style="{ color, zIndex: 999_999_999 }"
		class="bg-neutral-900 w-full md:mx-0 h-60 sm:h-80 lg:h-100 text-left font-mono border p-1 border-neutral-500 rounded mt-12 md:mt-0 overflow-y-auto scroll-smooth flex flex-col"
		@click="focusInput">

		<code v-for="command in history" v-html="command" @click="focusInput" />

		<code class="flex">
			<pre>{{ prefix }}</pre>

			<input v-if="!isLoading" id="terminalInput" ref="terminal" class="grow"
				@keydown.up.prevent="() => handleNavigateHistory(1)" @keydown.down.prevent="() => handleNavigateHistory(-1)"
				@keydown.enter="handleInput" />

			<Spinner v-if="isLoading" class="size-5 inline animate-spin" />
		</code>

	</div>
</template>
