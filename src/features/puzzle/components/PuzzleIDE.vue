<script setup lang="ts">
import { Play } from "@lucide/vue";
import { ref, useTemplateRef } from "vue";
import Button from "@/components/Button.vue";
import Label from "@/components/Label.vue";
import { useTranslation } from "@/composables/useTranslation";
import { playPop } from "@/features/animations/pop";
import CodeEditor from "@/features/editor/CodeEditor.vue";
import { clamp, nanToZero, sleep } from "@/lib/utils";
import { runTest } from "../puzzle.service";
import type { Puzzle } from "../puzzle.types";
import TestCaseButton from "./TestCaseButton.vue";

const {
	puzzle,
	minPopTime = 40,
	getPopTime = (i) => 200 - i * 8,
} = defineProps<{
	puzzle: Puzzle;
	minPopTime?: number;
	getPopTime?: (index: number) => number;
}>();

const { t } = useTranslation();
const testCaseButtonRefs = useTemplateRef("test-case-buttons");
const outputRef = ref("");
const expectedRef = ref("");

const code = defineModel<string>("code", {
	default: "",
});

const emit = defineEmits<(e: "success") => void>();

defineExpose({
	runSingleTest,
	runAllTests,
});

function reset() {
	testCaseButtonRefs.value?.forEach((button) => {
		button?.setState(undefined);
	});
	outputRef.value = "";
	expectedRef.value = "";
}

async function runAllTests() {
	reset();
	let passed = false;
	for (let i = 0; i < puzzle.tests.length; i++) {
		passed = runSingleTest(i, {
			audioRate: 1 + i / puzzle.tests.length,
			center: true,
			brightnessModifier: i,
		});
		if (!passed) break;
		const popTime = nanToZero(getPopTime(i));
		await sleep(Math.max(minPopTime, popTime));
	}
	if (passed) {
		emit("success");
	}
}

type HandleRunTestOpts = Partial<{
	audioRate: number;
	center: boolean;
	brightnessModifier: number;
}>;
function runSingleTest(index: number, opts: HandleRunTestOpts = {}) {
	opts.center ??= false;
	opts.brightnessModifier ??= 0;

	const test = puzzle.tests[index];
	const editorButton = testCaseButtonRefs.value?.[index];
	expectedRef.value = "";

	const [testOutput, passed, error] = runTest(test, code.value);

	if (passed) {
		editorButton?.setState("success");
	} else {
		editorButton?.setState("fail");
		expectedRef.value = `${test.expects}`;
	}

	outputRef.value = error ? `Error: ${error.message}` : testOutput;

	if (editorButton) {
		const el: HTMLButtonElement = editorButton.$el;
		if (opts.center) {
			el.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
		playPop(el, {
			brightness: 1 + clamp(opts.brightnessModifier / 10, -1, 8),
			audioRate: opts.audioRate,
		});
	}

	return passed;
}
</script>

<template>
	<div class="relative rounded-lg shadow bg-(--vp-c-bg-alt)" @keydown.ctrl.enter.capture.stop.prevent="runAllTests">
		<!-- Code editor -->
		<CodeEditor class="rounded px-1 pt-1" v-model="code" />

		<div class="p-5 gap-5 flex items-start justify-evenly *:w-full">
			<!-- Test cases -->
			<menu class="overflow-visible gap-2 grid">
				<div class="flex items-center">
					<Label>{{ t("Test cases") }}</Label>
					<Button @click="runAllTests" class="size-fit py-1 text-xs ml-auto">
						{{ t("Run all") }}
					</Button>
				</div>
				<TestCaseButton ref="test-case-buttons" v-for="test, i in puzzle.tests" @click.stop="() => runSingleTest(i)">
					{{ t("Case") }} {{ test.input }}
					<Play class="rounded p-1 size-6" />
				</TestCaseButton>
			</menu>
			<!-- Output -->
			<div class="overflow-auto">
				<Label>{{ t("Output") }}</Label>
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
