<script setup lang="ts">
import { ref, watch } from "vue";
import { getDefaultPuzzles } from "../puzzle.service";
import {
	saveLocalProgressMap,
	syncLocalProgressMap,
} from "../puzzle-progress.service";
import PuzzleTrial from "./PuzzleTrial.vue";

const puzzles = getDefaultPuzzles();
const progressMap = ref(syncLocalProgressMap(puzzles));

//biome-ignore format: biome formats this to single line
watch(
	progressMap,
	() => saveLocalProgressMap(progressMap.value),
	{ deep: true },
);
</script>

<template>
	<PuzzleTrial :puzzles :progressMap />
</template>
