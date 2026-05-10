<script setup lang="ts">
import { ref } from "vue";
import type { Puzzle } from "../puzzle.types";
import {
	getPuzzleProgress,
	savePuzzleProgress,
} from "../puzzle-progress.service";
import PuzzleExamples from "./PuzzleExamples.vue";
import PuzzleIDE from "./PuzzleIDE.vue";

const props = defineProps<{
	puzzle: Puzzle;
}>();
const code = ref(
	getPuzzleProgress(props.puzzle.id).lastCode ?? props.puzzle.code,
);

function saveProgress() {
	savePuzzleProgress({
		puzzleId: props.puzzle.id,
		puzzleState: "done",
		lastCode: code.value,
	});
}
</script>
<template>
	<div class="grid gap-1">
		<PuzzleExamples :puzzle />
		<PuzzleIDE :puzzle :code @success="saveProgress" />
	</div>
</template>
