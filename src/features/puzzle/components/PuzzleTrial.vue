<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useTemplateRef } from "vue";
import { playLockOpen } from "@/features/animations/lock-open";
import { playPop } from "@/features/animations/pop";
import { sleep } from "@/lib/utils";
import type { Puzzle, PuzzleProgressMap } from "../puzzle.types";
import PuzzleExamples from "./PuzzleExamples.vue";
import PuzzleIDE from "./PuzzleIDE.vue";
import PuzzleTrialButton from "./PuzzleTrialButton.vue";
import PuzzleTrialMenu from "./PuzzleTrialMenu.vue";
import PuzzleTrialMenuEntry from "./PuzzleTrialMenuEntry.vue";

const props = defineProps<{
	puzzles: Puzzle[];
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

defineExpose({ setPuzzle, puzzleIde });

async function onSuccess() {
	const currentId = currentPuzzle.value?.id;
	if (!currentId) {
		return;
	}

	const nextIndex = puzzleIndex.value + 1;
	const nextPuzzle = props.puzzles.at(nextIndex);
	if (!nextPuzzle) {
		return;
	}

	const currentButton = getTrialButton(currentId);
	const nextButton = getTrialButton(nextPuzzle.id);
	if (!nextButton) {
		return;
	}

	const currentEl: HTMLButtonElement = currentButton?.$el;
	const nextEl: HTMLButtonElement = nextButton.$el;
	nextEl.scrollIntoView({
		block: "center",
		inline: "center",
		behavior: "smooth",
	});

	await sleep(2 ** 9 + 2 ** 5);
	progressMap.value[currentId].puzzleState = "done";
	progressMap.value[currentId].lastCode = ideCode.value;
	await playPop(currentEl);

	await sleep(128);
	await playLockOpen(nextEl);
	progressMap.value[nextPuzzle.id].puzzleState = "unlocked";
	await playPop(nextEl, { audio: false });

	await nextTick();
	setPuzzle(nextIndex);
}

function setPuzzle(index: number) {
	if (index < 0 || index >= props.puzzles.length) {
		return;
	}
	puzzleIndex.value = index;
	ideCode.value = currentProgress.value?.lastCode ?? currentPuzzle.value?.code ?? "";
}

onMounted(() => {
	setPuzzle(0);
});
</script>

<template>
	<div class="flex flex-col" v-if="currentPuzzle">
		<PuzzleTrialMenu>
			<PuzzleTrialMenuEntry v-for="puzzle, i in props.puzzles" :i>
				<PuzzleTrialButton ref="trial-buttons" :active="puzzle === currentPuzzle" :puzzle
					:progress="progressMap[puzzle.id]" @click="setPuzzle(i)" />
			</PuzzleTrialMenuEntry>
		</PuzzleTrialMenu>

		<PuzzleExamples class="bg-(--vp-c-bg-alt) rounded-none" :puzzle="currentPuzzle" />
		<PuzzleIDE ref="puzzle-ide" :puzzle="currentPuzzle" v-model:code="ideCode" @success="onSuccess"
			class="rounded-tl-none rounded-tr-none" />
	</div>
</template>
