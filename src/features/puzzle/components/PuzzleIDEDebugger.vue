<script setup lang="ts">
import {
	BrushCleaning,
	Dices,
	FlaskConical,
	FlaskConicalOff,
	RotateCcw,
} from "@lucide/vue";
import { computed, ref, useTemplateRef } from "vue";
import lorem from "@/assets/lorem.txt?raw";
import Button from "@/components/Button.vue";
import Field from "@/components/Field.vue";
import Input from "@/components/Input.vue";
import Label from "@/components/Label.vue";
import ToggleButton from "@/components/ToggleButton.vue";
import { random, safeSolve, tryOr } from "@/lib/utils.ts";
import { getDefaultPuzzles, type TestResult } from "../puzzle.service";
import type { Puzzle } from "../puzzle.types";
import PuzzleIDE from "./PuzzleIDE.vue";

const defaultPopInterval = "200 * 0.99 ** i";
const defaultPuzzles = getDefaultPuzzles();

const wordAmount = ref(1);
const testCaseAmount = ref(32);
const wordsRegex = computed(() =>
	Array(wordAmount.value).fill("\\w+").join(".*?"),
);
const loremWords = computed(
	() => lorem.match(new RegExp(wordsRegex.value, "g")) ?? [],
);

const popInterval = ref(defaultPopInterval);
const popIntervalSteps = computed(() => {
	if (!popInterval.value) {
		return "";
	}

	let text = "";
	for (let i = 0; i < 5; i++) {
		const step = safeSolve(popInterval.value, { i });
		if (step === null) {
			return "";
		}

		const formatted = step | 0;
		text += `${formatted}ms, `;
	}
	return `${text} ...`;
});
const getPopInterval = computed<((i: number) => number) | undefined>(() =>
	popInterval.value
		? tryOr(
				// biome-ignore format: getPopTime function
				() => new Function("i", `return Number(${popInterval.value});`) as (i: number) => number,
				() => 1,
			)
		: undefined,
);

const code = ref("console.log(input()[0]);");
const puzzle = computed(() => ({
	id: "lorem",
	code: "console.log(input()[0])",
	tests: loremWords.value
		.map((word) => ({
			input: [word],
			expects: word,
		}))
		.slice(0, testCaseAmount.value),
}));

const randomPuzzle = ref<Puzzle>();
const isCheating = ref(false);

const ide = useTemplateRef("puzzle-ide");

function onPopIntervalReset() {
	popInterval.value = defaultPopInterval;
}

function onRandomPuzzle() {
	const puzzle = random(defaultPuzzles);
	randomPuzzle.value = puzzle;
	code.value = puzzle.code;
}

function onLorem() {
	randomPuzzle.value = undefined;
	code.value = "console.log(input()[0]);";
}

function onResetStates() {
	ide.value?.reset();
}

function onTest(result: TestResult) {
	if (isCheating.value) {
		result[1] = true;
	}
}
</script>

<template>
	<div class="flex flex-col  bg-(--vp-c-bg-alt)">
		<menu
			class="grid grid-cols-1 sm:grid-cols-2 items-start p-2 gap-3 rounded-t"
		>
			<Field inline label="Test case amount">
				<Input type="range" :min="1" :max="127" v-model="testCaseAmount" />
				<code>{{ testCaseAmount }}</code>
			</Field>

			<Field inline label="Word amount">
				<Input type="range" :min="1" :max="15" v-model.number="wordAmount" />
				<code>{{ wordAmount }}</code>
			</Field>

			<Field label="Pop interval calculation">
				<div class="flex gap-0.5">
					<Input placeholder="200 * 0.99 ** i" v-model="popInterval" />
					<Button size="icon" @click="onPopIntervalReset">
						<RotateCcw />
					</Button>
				</div>
				<Label> {{ popIntervalSteps || "..." }} </Label>
			</Field>

			<Field label="Actions">
				<menu>
					<Button title="Random puzzle" size="icon" @click="onRandomPuzzle">
						<Dices />
					</Button>
					<Button title="Set puzzle to lorem" size="icon" @click="onLorem">
						<RotateCcw />
					</Button>
				</menu>
			</Field>
		</menu>

		<PuzzleIDE
			ref="puzzle-ide"
			class="rounded-t-none"
			v-model:code="code"
			:puzzle="randomPuzzle ?? puzzle"
			:getPopInterval
			@test="onTest"
		>
			<template #test-case-menu>
				<ToggleButton title="Cheat" size="icon-sm" v-model="isCheating">
					<FlaskConical v-if="isCheating" />
					<FlaskConicalOff v-else />
				</ToggleButton>

				<Button title="Reset test cases" size="icon-sm" @click="onResetStates">
					<BrushCleaning />
				</Button>
			</template>
		</PuzzleIDE>
	</div>
</template>
