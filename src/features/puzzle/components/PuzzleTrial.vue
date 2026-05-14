<script setup lang="ts">
import type { ClassValue } from "clsx";
import { computed, nextTick, onMounted, ref, useTemplateRef } from "vue";
import { playLockOpen } from "@/features/animations/lock-open";
import { playPop } from "@/features/animations/pop";
import { merge, sleep } from "@/lib/utils";
import type { TestResult } from "../puzzle.service";
import type { Puzzle, PuzzleProgressMap } from "../puzzle.types";
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

const getTrialButton = (puzzle: Puzzle) =>
	trialButtons.value?.[props.puzzles.indexOf(puzzle)];

const emit = defineEmits<{
	test: [result: TestResult, isRunningAll: boolean];
	success: [puzzle: Puzzle];
	unlock: [puzzle: Puzzle];
}>();

defineExpose({ setPuzzle, completePuzzle, unlockPuzzle, puzzleIde });

async function completePuzzle(puzzle: Puzzle) {
	const currentButton = getTrialButton(puzzle);
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
	progressMap.value[puzzle.id].puzzleState = "done";
	await playPop(currentEl);
	emit("success", puzzle);
}

async function unlockPuzzle(puzzle: Puzzle) {
	const button = getTrialButton(puzzle);
	if (!button) {
		return;
	}

	const el = button?.getButtonElement();
	if (!el) {
		return;
	}

	el.scrollIntoView({
		block: "center",
		inline: "center",
		behavior: "smooth",
	});

	await sleep(128);
	await playLockOpen(el);
	progressMap.value[puzzle.id].puzzleState = "unlocked";
	await playPop(el, { audio: false });

	await nextTick();
	emit("unlock", puzzle);
}

async function onSuccess() {
	const puzzle = currentPuzzle.value;
	if (!puzzle) {
		return;
	}

	progressMap.value[puzzle.id].lastCode = ideCode.value;

	if (currentProgress.value?.puzzleState === "done") {
		emit("success", currentPuzzle.value);
		return;
	}

	await completePuzzle(puzzle);

	const nextIndex = puzzleIndex.value + 1;
	const nextPuzzle = props.puzzles.at(nextIndex);
	if (!nextPuzzle) {
		return;
	}

	const nextProgress = progressMap.value[nextPuzzle.id];
	if (nextProgress.puzzleState !== "locked") {
		return;
	}

	await unlockPuzzle(nextPuzzle);
	setPuzzle(nextIndex);
}

function onTest(test: TestResult, isRunningAll: boolean) {
	emit("test", test, isRunningAll);

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
	puzzleIde.value?.reset();
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
