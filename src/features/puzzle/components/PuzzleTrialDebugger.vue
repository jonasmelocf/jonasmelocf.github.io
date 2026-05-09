<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import Button from "@/components/Button.vue";
import { getDefaultPuzzles } from "../puzzle.service";
import { syncPuzzleProgress } from "../puzzle-progress.service";
import PuzzleTrial from "./PuzzleTrial.vue";

const puzzles = getDefaultPuzzles();
syncPuzzleProgress(puzzles);

const progressMap = ref(syncPuzzleProgress(puzzles, false));
const puzzleTrial = useTemplateRef("puzzle-trial");

reset();

function reset() {
	progressMap.value = syncPuzzleProgress(puzzles, false);
	progressMap.value["add-two-numbers"].lastCode =
		"console.log(input().reduce((a,b)=>a- -b))";
	puzzleTrial.value?.setPuzzle(0);
}

function runAll() {
	puzzleTrial.value?.puzzleIde?.runAllTests();
}

function resetRunAll() {
	reset();
	runAll();
}
</script>
<template>
	<menu class="flex gap-1">
		<Button @click="reset">reset</Button>
		<Button @click="runAll">run all</Button>
		<Button @click="resetRunAll">reset run all</Button>
	</menu>
	<PuzzleTrial :puzzles :progressMap ref="puzzle-trial" />
</template>
