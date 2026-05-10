<script setup lang="ts">
import type { ClassValue } from "clsx";
import { computed, nextTick, onMounted, ref, useTemplateRef } from "vue";
import { playLockOpen } from "@/features/animations/lock-open";
import { playPop } from "@/features/animations/pop";
import { merge, sleep } from "@/lib/utils";
import type { TestResult } from "../puzzle.service";
import type { Puzzle, PuzzleProgressMap } from "../puzzle.types";
import PuzzleExamples from "./PuzzleExamples.vue";
import PuzzleIDE from "./PuzzleIDE.vue";
import PuzzleTrialButton from "./PuzzleTrialButton.vue";
import PuzzleTrialMenu from "./PuzzleTrialMenu.vue";
import PuzzleTrialMenuEntry from "./PuzzleTrialMenuEntry.vue";

const props = defineProps<{
	puzzles: Puzzle[];
	class?: ClassValue;
}>();

const progressMap = defineModel<PuzzleProgressMap>("progress-map", {
	required: true,
});

const ideCode = ref("");
const puzzleIndex = ref(0);
const currentPuzzle = computed(() => props.puzzles.at(puzzleIndex.value)); // using "at" for type safety as puzzles.length may be 0
const currentProgress = computed(
	() => currentPuzzle.value && progressMap.value[currentPuzzle.value.id],
);
const trialButtons = useTemplateRef("trial-buttons");
const puzzleIde = useTemplateRef("puzzle-ide");

const getTrialButton = (puzzleId: string) =>
	trialButtons.value?.find((btn) => btn?.puzzle.id === puzzleId);

const emit = defineEmits<{
	test: [result: TestResult, isRunningAll: boolean];
	success: [puzzle: Puzzle];
	unlock: [puzzle: Puzzle];
}>();

defineExpose({ setPuzzle, puzzleIde });

async function onSuccess() {
	if (currentProgress.value?.puzzleState === "done") {
		return;
	}

	const currentId = currentPuzzle.value?.id;
	if (!currentId) {
		return;
	}

	const currentButton = getTrialButton(currentId);
	const currentEl = currentButton?.getButtonElement();
	if (!currentEl) {
		return;
	}

	currentEl.scrollIntoView({
		block: "center",
		inline: "center",
		behavior: "smooth",
	});
	await sleep(2 ** 9 + 2 ** 5);
	progressMap.value[currentId].puzzleState = "done";
	progressMap.value[currentId].lastCode = ideCode.value;
	await playPop(currentEl);
	emit("success", currentPuzzle.value);

	const nextIndex = puzzleIndex.value + 1;
	const nextPuzzle = props.puzzles.at(nextIndex);
	if (!nextPuzzle) {
		return;
	}

	const nextProgress = progressMap.value[nextPuzzle.id];
	if (nextProgress.puzzleState !== "locked") {
		return;
	}

	const nextButton = getTrialButton(nextPuzzle.id);
	if (!nextButton) {
		return;
	}

	const nextEl = nextButton?.getButtonElement();
	if (!nextEl) {
		return;
	}
	nextEl.scrollIntoView({
		block: "center",
		inline: "center",
		behavior: "smooth",
	});

	await sleep(128);
	await playLockOpen(nextEl);
	progressMap.value[nextPuzzle.id].puzzleState = "unlocked";
	await playPop(nextEl, { audio: false });

	await nextTick();
	setPuzzle(nextIndex);
	emit("unlock", nextPuzzle);
}

function onTest(test: TestResult, isRunningAll: boolean) {
	const currentId = currentPuzzle.value?.id;
	if (!currentId) {
		return;
	}

	if (test[1] === false || isRunningAll === false) {
		progressMap.value[currentId].lastCode = ideCode.value;
	}
}

function setPuzzle(index: number) {
	if (index < 0 || index >= props.puzzles.length) {
		return;
	}
	puzzleIndex.value = index;
	ideCode.value =
		currentProgress.value?.lastCode ?? currentPuzzle.value?.code ?? "";
}

onMounted(() => {
	setPuzzle(0);
});
</script>

<template>
	<div
		:class="merge('flex flex-col rounded-t bg-(--vp-c-bg-alt)', props.class)"
		v-if="currentPuzzle"
	>
		<PuzzleTrialMenu>
			<PuzzleTrialMenuEntry v-for="puzzle, i in props.puzzles" :i>
				<PuzzleTrialButton
					ref="trial-buttons"
					:active="puzzle === currentPuzzle"
					:puzzle
					:progress="progressMap[puzzle.id]"
					@click="setPuzzle(i)"
				/>
			</PuzzleTrialMenuEntry>
		</PuzzleTrialMenu>

		<PuzzleExamples
			class="bg-(--vp-c-bg-alt) rounded-none"
			:puzzle="currentPuzzle"
		/>
		<PuzzleIDE
			ref="puzzle-ide"
			:puzzle="currentPuzzle"
			v-model:code="ideCode"
			@success="onSuccess"
			@test="onTest"
			class="rounded-t-none"
		/>
	</div>
</template>
