<script setup lang="ts">
import { RefreshCcw } from "@lucide/vue";
import { ref, useTemplateRef } from "vue";
import Button from "@/components/Button.vue";
import { sleep } from "@/lib/utils";
import { getDefaultPuzzles, type TestResult } from "../puzzle.service";
import type { Puzzle } from "../puzzle.types";
import { syncProgressMap } from "../puzzle-progress.service";
import PuzzleTrial from "./PuzzleTrial.vue";

const puzzles = ref(getDefaultPuzzles());

const progressMap = ref(syncProgressMap(puzzles.value, {}));
const isCheating = ref(false);
const isRunContinuously = ref(false);
const puzzleTrial = useTemplateRef("puzzle-trial");

reset();

function reset() {
	progressMap.value = syncProgressMap(puzzles.value, {});
	puzzleTrial.value?.setPuzzle(0);
}

function onTest(result: TestResult) {
	if (isCheating.value) {
		result[1] = true;
		result[2] = undefined;
	}
}

async function onUnlock(_puzzle: Puzzle) {
	if (isRunContinuously.value) {
		await sleep(128);
		puzzleTrial.value?.puzzleIde?.runAllTests();
	}
}
</script>
<template>
	<div>
		<menu class="p-2 flex gap-1 rounded-t bg-(--vp-c-bg-alt)">
			<Button size="icon" label="Reset" @click="reset"> <RefreshCcw /> </Button>
			<Button
				:variant="isCheating ? 'primary' : 'secondary'"
				@click="() => isCheating = !isCheating"
			>
				Cheat{{ isCheating ? "ing" : "" }}
			</Button>
			<Button
				:variant="isRunContinuously ? 'primary' : 'secondary'"
				@click="() => isRunContinuously = !isRunContinuously"
			>
				Run{{ isRunContinuously ? 'ning' : '' }}
				on unlock
			</Button>
		</menu>

		<PuzzleTrial
			ref="puzzle-trial"
			class="rounded-t-none"
			:puzzles
			:progressMap
			@test="onTest"
			@unlock="onUnlock"
		/>
	</div>
</template>
