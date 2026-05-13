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
import Field from "@/components/Field.vue";

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
	'before-test': [{ test: TestCase, code: string, isRunningAll: boolean }];
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

		const ctx = { test, code: code.value, isRunningAll: true };
		emit('before-test', ctx);
		const result = runTest(ctx.test, ctx.code);
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
	const ctx = { test, code: code.value, isRunningAll: false };
	emit('before-test', ctx);
	const result = runTest(ctx.test, ctx.code);
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
	<div class="relative rounded-lg bg-(--vp-c-bg-alt)" @keydown.ctrl.enter.capture.stop.prevent="onRunAll">
		<!-- Code editor -->
		<CodeEditor class="rounded px-1 pt-1" v-model="code" />

		<div class="grid grid-flow-row sm:grid-cols-2 px-5 pt-5 pb-1 gap-5 h-63">
			<!-- Test cases -->
			<menu class="flex flex-col gap-2">
				<!-- Run all button -->
				<div class="flex justify-between px-2">
					<Label>{{ t("Test cases") }}</Label>
					<menu class="flex gap-0.5">
						<slot name="test-case-menu" />
						<Button size="sm" @click="onRunAll"> {{ t("Run all") }} </Button>
					</menu>
				</div>
				<!-- Test case buttons -->
				<div class="flex flex-col gap-2 h-48 px-2 pb-4 overflow-y-auto">
					<TestCaseButton ref="test-case-buttons" v-for="test, i in props.puzzle.tests" :test
						@click.stop="() => onRunTest(i, test)">
						{{ t("Case") }} {{ test.input }}
					</TestCaseButton>
				</div>
			</menu>
			<!-- Output -->
			<menu :class="['grid gap-2 overflow-hidden', { 'grid-rows-2': expected }]">
				<Field :label="t('Output')">
					<div class="font-mono overflow-auto whitespace-pre-wrap">
						{{ output }}
					</div>
				</Field>
				<Field :label="t('Expected')" v-if="expected">
					<div class="font-mono overflow-auto whitespace-pre-wrap">{{ expected }}</div>
				</Field>
			</menu>
		</div>
	</div>
</template>
