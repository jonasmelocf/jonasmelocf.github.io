<script setup lang="ts">
import { Play } from "@lucide/vue";
import { audio } from "@/assets/audio";
import Button from "@/components/Button.vue";
import Label from "@/components/Label.vue";
import { useTranslation } from "@/composables/useTranslation";
import CodeEditor from "@/features/editor/CodeEditor.vue";
import { sleep } from "@/lib/utils";
import "prism-code-editor/prism/languages/javascript";
import { ref, useTemplateRef } from "vue";
import { loadCode, runTest, saveCode } from "../puzzle.service";
import type { Puzzle } from "../puzzle.types";
import TestCaseButton from "./TestCaseButton.vue";

type State = "success" | "fail" | "undefined";

const { puzzle, disableSave } = defineProps<{
	puzzle: Puzzle;
	disableSave?: boolean;
}>();

const { t } = useTranslation();
const testCaseButtonRefs = useTemplateRef("test-case-buttons");
const userCodeRef = ref(loadCode(puzzle.id) ?? puzzle.code);
const outputRef = ref("");
const stateRef = ref<State>("undefined");
const expectedRef = ref("");

// using `style` because tailwind with clsx lags
const stateStyleMap: Record<State, string> = {
	success: "var(--color-emerald-500)",
	fail: "var(--color-red-500)",
	undefined: "var(--color-gray-500)",
};

function reset() {
	testCaseButtonRefs.value?.forEach((button) => {
		button?.setState(undefined);
	});
	stateRef.value = "undefined";
	outputRef.value = "";
	expectedRef.value = "";
}

async function handleRunAllTests() {
	reset();
	saveCode(puzzle.id, userCodeRef.value);
	for (let i = 0; i < puzzle.tests.length; i++) {
		const popRate = 1 + i / puzzle.tests.length;
		const passed = handleRunTest(i, popRate, false);
		if (!passed) break;
		await sleep(Math.max(80, 200 - i * 30));
	}
}

function handleRunTest(index: number, popRate = 1, save = true) {
	const test = puzzle.tests[index];
	const editorButton = testCaseButtonRefs.value?.[index];
	if (!disableSave && save) saveCode(puzzle.id, userCodeRef.value);
	expectedRef.value = "";

	const [output, passed, error] = runTest(test, userCodeRef.value);

	if (passed) {
		stateRef.value = "success";
		editorButton?.setState("success");
	} else {
		stateRef.value = "fail";
		editorButton?.setState("fail");
		expectedRef.value = `${test.expects}`;
	}

	outputRef.value = error ? `Error: ${error.message}` : output;

	editorButton?.pop();
	audio.pop.rate(popRate);
	audio.pop.play();

	return passed;
}
</script>

<template>
	<div
		class="border relative border-neutral-500/15 overflow-hidden rounded-lg shadow"
		@keydown.ctrl.enter.prevent="handleRunAllTests"
	>
		<!-- Code editor -->
		<CodeEditor v-model="userCodeRef" />
		<!-- Status line -->
		<div :style="{ background: stateStyleMap[stateRef] }" class="h-px" />
		<!-- Cases and output -->
		<div
			class="p-5 gap-5 flex items-start justify-evenly *:w-full text-white bg-neutral-950"
		>
			<menu class="overflow-visible gap-2 grid">
				<!-- Run all cases button -->
				<div class="flex items-center">
					<Label>{{ t("Test cases") }}</Label>
					<Button
						@click="handleRunAllTests"
						class="size-fit py-1 text-xs ml-auto"
					>
						{{ t("Run all") }}
					</Button>
				</div>
				<TestCaseButton
					v-for="test, i in puzzle.tests"
					@click.stop="() => handleRunTest(i)"
					ref="test-case-buttons"
				>
					{{ t("Case") }} {{ test.input }}
					<Play class="bg-neutral-800 rounded p-1 size-6" />
				</TestCaseButton>
			</menu>

			<div class="group overflow-x-auto">
				<span
					class="text-white/40 group-hover:text-white/80 transition font-mono text-xs font-light"
				>
					{{ t("Output") }}
				</span>

				<div class="font-mono whitespace-break-spaces">
					{{ outputRef }}
					<div v-if="expectedRef">
						<br>{{ t("Expected") }}:<br>{{ expectedRef }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
