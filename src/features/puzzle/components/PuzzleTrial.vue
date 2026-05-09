<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from "vue";
import { playLockOpen } from "@/features/animations/lock-open";
import type { Puzzle } from "../puzzle.types";
import {
	getPuzzleProgressMap,
	savePuzzleProgress,
} from "../puzzle-progress.service";
import PuzzleExamples from "./PuzzleExamples.vue";
import PuzzleIDE from "./PuzzleIDE.vue";
import PuzzleTrialButton from "./PuzzleTrialButton.vue";
import PuzzleTrialMenu from "./PuzzleTrialMenu.vue";
import PuzzleTrialMenuEntry from "./PuzzleTrialMenuEntry.vue";

const props = defineProps<{
	puzzles: Puzzle[];
}>();

const puzzleIndex = ref(0);
const progresses = ref(getPuzzleProgressMap());
const ideCode = ref("");
const currentPuzzle = computed(() => props.puzzles.at(puzzleIndex.value));
const currentProgress = computed(
	() => currentPuzzle.value && progresses.value[currentPuzzle.value.id],
);
const trialButtons = useTemplateRef("trial-buttons");

const getTrialButton = (puzzleId: string) =>
	trialButtons.value?.find((btn) => btn?.puzzle.id === puzzleId);

function onSuccess() {
	const currentId = currentPuzzle.value?.id;
	if (!currentId) return;

	savePuzzleProgress({
		puzzleId: currentId,
		puzzleState: "done",
		lastCode: ideCode.value,
	});

	const nextIndex = puzzleIndex.value + 1;
	const nextPuzzle = props.puzzles.at(nextIndex);
	if (!nextPuzzle) return;

	// const nextPuzzleProgress = progresses.value[nextPuzzle.id];
	// if (
	// 	!(
	// 		nextPuzzleProgress?.puzzleState === "locked" ||
	// 		nextPuzzleProgress === undefined
	// 	)
	// ) {
	// 	return;
	// }

	const button = getTrialButton(nextPuzzle.id);
	if (!button) return;

	const el: HTMLButtonElement = button.$el;
	el.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
	playLockOpen(el).then(() => {
		savePuzzleProgress({
			puzzleId: nextPuzzle.id,
			puzzleState: "unlocked",
		});
		progresses.value = getPuzzleProgressMap();
		setPuzzle(nextIndex);
	});
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
	<div class="flex flex-col" v-if="currentPuzzle">
		<PuzzleTrialMenu>
			<PuzzleTrialMenuEntry v-for="puzzle, i in props.puzzles" :i>
				<PuzzleTrialButton
					ref="trial-buttons"
					:active="puzzle === currentPuzzle"
					:puzzle
					:progress="progresses[puzzle.id]"
					@click="setPuzzle(i)"
					@click.right.prevent="() => playLockOpen(getTrialButton(puzzle.id)!.$el)"
				/>
			</PuzzleTrialMenuEntry>
		</PuzzleTrialMenu>

		<PuzzleExamples
			class="bg-(--vp-c-bg-alt) rounded-none"
			:puzzle="currentPuzzle"
		/>
		<PuzzleIDE
			:puzzle="currentPuzzle"
			v-model:code="ideCode"
			@success="onSuccess"
			class="rounded-tl-none rounded-tr-none"
		/>
	</div>
</template>
