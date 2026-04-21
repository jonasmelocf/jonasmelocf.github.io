<script setup lang="ts">
import { type CSSProperties, watch, nextTick, ref, useTemplateRef } from "vue";
import { createJosh } from "../commands";
import Spinner from "./Spinner.vue";

const props = defineProps(["intro"]);

let historyIndex: number | undefined;
const history = ref<string[]>([]);
const clearTerminal = () => history.value.splice(0);
const color = ref<CSSProperties["color"]>("white");
const isLoading = ref(false);
const containerRef = useTemplateRef("container");
const scrollToBottom = () => containerRef.value?.scrollTo(0, containerRef.value.scrollHeight);
const terminalRef = useTemplateRef("terminal");
const focusInput = () => terminalRef.value?.focus();

const prefixes = ["$ ", "~> ", "|> ", ">. ", ">_ ", "# ", "-> ", "=> ", "> ", ">>> ", "josh> ", "👉 "];
const prefix = prefixes[Math.random() * prefixes.length | 0];
const josh = createJosh();

josh.commandMap.set("clear", () => clearTerminal() && "")
josh.commandMap.set("color", (...arg: string[]) => {
	color.value = arg.join("") || "white";
	return "";
})

async function log(...msg: string[]) {
	history.value.push(msg.join(" "));
	await nextTick();
	scrollToBottom();
}

function handleNavigateHistory(ev: KeyboardEvent, step: number) {
	if (!terminalRef.value) return;
	if (historyIndex === undefined) {
		historyIndex = 0;
	} else {
		historyIndex += step;
	}
	ev.preventDefault();
	const terminal = terminalRef.value;
	const commands = history.value.filter(val => val.startsWith(prefix)).reverse();
	const last = commands.at(historyIndex % history.value.length)?.replace(prefix, "") ?? "";
	focusInput()
	terminal.value = last;
	terminal.setSelectionRange(last.length, last.length);
}

async function handleInput() {
	if (terminalRef.value == null) return;
	historyIndex = undefined;
	const inputElement = terminalRef.value;
	const input = inputElement.value;
	inputElement.value = "";
	log(prefix + input);
	isLoading.value = true;
	await josh.execute(input)
		.then(log)
		.catch(log)
		.finally(async () => {
			isLoading.value = false
			await nextTick()
			focusInput(); // input loses focus after event, so we focus it again
		});
}

// Changing the page language doesn't refresh the page.
// Because of that, this setup script is not re-executed.
// So we need to watch if the prop changed and "restart" the terminal.
watch(
	() => props.intro,
	(intro) => {
		clearTerminal();
		josh.execute(`echo ${intro}`).then(log).finally(focusInput)
	},
	{ immediate: true },
);

</script>

<template>
	<div @click="focusInput" :style="{ color, zIndex: 999_999_999 }" ref="container"
		class="bg-neutral-900 w-full md:mx-0 h-60 sm:h-80 lg:h-100 text-left font-mono border p-1 border-neutral-500 rounded mt-12 md:mt-0 overflow-y-auto scroll-smooth flex flex-col">
		<code @click="focusInput" v-for="command in history" v-html="command"></code>
		<code class="flex">
			<pre>{{ prefix }}</pre>
			<input id="terminalInput" ref="terminal" @keydown.up="ev => handleNavigateHistory(ev, 1)"
				@keydown.down="ev => handleNavigateHistory(ev, -1)" @keydown.enter="handleInput" v-if="!isLoading"
				class="grow" />
			<Spinner v-if="isLoading" class="size-5 inline animate-spin" />
		</code>
	</div>
</template>
