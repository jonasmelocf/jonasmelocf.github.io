<script setup lang="ts">
import { FlaskConical, FlaskConicalOff, RefreshCcw, Repeat } from "@lucide/vue";
import { ref, useTemplateRef } from "vue";
import Button from "@/components/Button.vue";
import ToggleButton from "@/components/ToggleButton.vue";
import { sleep } from "@/lib/utils";
import { getDefaultPuzzles, type TestResult } from "../puzzle.service";
import type { Puzzle } from "../puzzle.types";
import { syncProgressMap } from "../puzzle-progress.service";
import PuzzleTrial from "./PuzzleTrial.vue";

const puzzles = ref(getDefaultPuzzles());

const progressMap = ref(syncProgressMap(puzzles.value, {}));
const isCheating = ref(false);
const isRunningOnUnlock = ref(false);
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
	if (isRunningOnUnlock.value) {
		await sleep(128);
		puzzleTrial.value?.puzzleIde?.onRunAll();
	}
}
</script>
<template>
	<div>
		<menu class="p-2 flex gap-1 rounded-t bg-(--vp-c-bg-alt)">
			<Button size="icon" title="Reset" @click="reset"> <RefreshCcw /> </Button>
			<ToggleButton size="icon" title="Cheat" v-model="isCheating">
				<FlaskConical v-if="isCheating" />
				<FlaskConicalOff v-else />
			</ToggleButton>
			<ToggleButton
				size="icon"
				title="Run after unlock"
				v-model="isRunningOnUnlock"
			>
				<Repeat />
			</ToggleButton>
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
