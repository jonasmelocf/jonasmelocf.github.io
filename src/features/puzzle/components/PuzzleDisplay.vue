<script setup lang="ts">
import type { Puzzle } from "../puzzle.types";
import { getPuzzleProgress } from "../puzzle-progress.service";
import PuzzleExamples from "./PuzzleExamples.vue";
import PuzzleIDE from "./PuzzleIDE.vue";

const props = defineProps<{
	puzzle: Puzzle;
}>();
const code = getPuzzleProgress(props.puzzle.id).lastCode ?? props.puzzle.code;
</script>
<template>
	<div class="grid gap-1">
		<PuzzleExamples :puzzle />
		<PuzzleIDE :puzzle :code />
	</div>
</template>
