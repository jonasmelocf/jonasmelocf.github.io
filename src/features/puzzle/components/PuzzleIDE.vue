<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import Button from "@/components/Button.vue";
import Label from "@/components/Label.vue";
import { useTranslation } from "@/composables/useTranslation";
import { playPop } from "@/features/animations/pop";
import CodeEditor from "@/features/editor/CodeEditor.vue";
import { sleep } from "@/lib/utils";
import { runTest, type TestResult } from "../puzzle.service";
import type { Puzzle, TestCase } from "../puzzle.types";
import TestCaseButton from "./TestCaseButton.vue";

const props = withDefaults(
	defineProps<{
		puzzle: Puzzle;
		getPopInterval?: (index: number) => number;
	}>(),
	{
		getPopInterval: (i: number) => Math.max(40, 200 * 0.99 ** i),
	},
);

const code = defineModel<string>("code", {
	default: "",
});

const { t } = useTranslation();
const testCaseButtons = useTemplateRef("test-case-buttons");
const output = ref("");
const expected = ref("");

const emit = defineEmits<{
	success: [];
	test: [result: TestResult, isRunningAll: boolean];
}>();

defineExpose({
	onRunAll,
	onRunTest,
	reset,
});

function reset() {
	testCaseButtons.value?.forEach((button) => {
		button?.setState(undefined);
	});
	output.value = "";
	expected.value = "";
}

function renderTestResult(i: number, [testOutput, passed, error]: TestResult) {
	const test = props.puzzle.tests[i];
	const button = testCaseButtons.value?.[i];

	if (passed) {
		button?.setState("success");
		expected.value = "";
	} else {
		button?.setState("fail");
		expected.value = `${test.expects}`;
	}

	if (error) {
		output.value = `Error: ${error.message}`;
	} else {
		output.value = testOutput;
	}
}

async function onRunAll() {
	if (!testCaseButtons.value) {
		return;
	}

	reset();
	const testAmount = props.puzzle.tests.length;
	for (let i = 0; i < testAmount; i++) {
		const test = props.puzzle.tests[i];
		const button = testCaseButtons.value[i];
		const el: HTMLButtonElement = button?.$el;

		const result = runTest(test, code.value);
		emit("test", result, true);
		renderTestResult(i, result);

		el.scrollIntoView({ block: "center", behavior: "smooth" });
		playPop(el, {
			audioRate: 1 + i / testAmount,
			brightness: 1 + i / testAmount,
		});
		if (result[1] === false) {
			// test failed
			return;
		}
		await sleep(props.getPopInterval(i));
	}
	emit("success");
}

function onRunTest(i: number, test: TestCase) {
	const result = runTest(test, code.value);
	emit("test", result, false);

	const button = testCaseButtons.value?.[i];
	renderTestResult(i, result);

	if (button) {
		const el: HTMLButtonElement = button.$el;
		playPop(el);
	}
}
</script>

<template>
	<div
		class="relative rounded-lg bg-(--vp-c-bg-alt)"
		@keydown.ctrl.enter.capture.stop.prevent="onRunAll"
	>
		<!-- Code editor -->
		<CodeEditor class="rounded px-1 pt-1" v-model="code" />

		<div class="flex flex-col sm:flex-row *:w-full px-5 pt-5 pb-1 gap-5">
			<!-- Test cases -->
			<menu class="grid gap-2">
				<!-- Run all button -->
				<div class="flex items-center justify-between px-2">
					<Label>{{ t("Test cases") }}</Label>
					<Button @click="onRunAll" class="size-fit py-1 text-xs">
						{{ t("Run all") }}
					</Button>
				</div>
				<!-- Test case buttons -->
				<div class="flex flex-col gap-2 h-48 px-2 pb-4 overflow-y-auto">
					<TestCaseButton
						ref="test-case-buttons"
						v-for="test, i in props.puzzle.tests"
						:test
						@click.stop="() => onRunTest(i, test)"
					>
						{{ t("Case") }} {{ test.input }}
					</TestCaseButton>
				</div>
			</menu>
			<!-- Output -->
			<div class="overflow-auto">
				<Label>{{ t("Output") }}</Label>
				<div class="font-mono whitespace-break-spaces">
					{{ output }}
					<div v-if="expected"><br>{{ t("Expected") }}:<br>{{ expected }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
