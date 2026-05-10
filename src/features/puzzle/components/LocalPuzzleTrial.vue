<script setup lang="ts">
import { ref, watch } from "vue";
import { getDefaultPuzzles } from "../puzzle.service";
import {
	savePuzzleProgressMap,
	syncPuzzleProgress,
} from "../puzzle-progress.service";
import PuzzleTrial from "./PuzzleTrial.vue";

const puzzles = getDefaultPuzzles();
const progressMap = ref(syncPuzzleProgress(puzzles));

watch(
	progressMap.value,
	() => {
		savePuzzleProgressMap(progressMap.value);
	},
	{ deep: true },
);
</script>

<template>
	<PuzzleTrial :puzzles :progressMap />
</template>
