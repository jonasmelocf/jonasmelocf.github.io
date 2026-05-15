<script setup lang="ts">
import { ref } from "vue";
import type { TestResult } from "../puzzle.service";
import type { Puzzle } from "../puzzle.types";
import {
	getLocalProgress,
	saveLocalProgress,
} from "../puzzle-progress.service";
import PuzzleIDE from "./PuzzleIDE.vue";

const props = defineProps<{
	puzzle: Puzzle;
}>();

const code = ref(
	getLocalProgress(props.puzzle.id).lastCode ?? props.puzzle.code,
);

function onSuccess() {
	saveLocalProgress({
		puzzleId: props.puzzle.id,
		puzzleState: "done",
		lastCode: code.value,
	});
}

function onTest([_, passed]: TestResult, isRunningAll: boolean) {
	if (!passed || !isRunningAll) {
		const progress = getLocalProgress(props.puzzle.id);
		progress.lastCode = code.value;
		saveLocalProgress(progress);
	}
}
</script>
<template>
	<div class="grid gap-1">
		<PuzzleIDE :puzzle :code @success="onSuccess" @test="onTest" />
	</div>
</template>
