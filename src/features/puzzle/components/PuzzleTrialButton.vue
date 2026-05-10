<script setup lang="ts">
import { Check, Lock, LockOpen } from "@lucide/vue";
import { useTemplateRef } from "vue";
import Button from "@/components/Button.vue";
import type { Puzzle, PuzzleProgress } from "../puzzle.types";

const props = withDefaults(
	defineProps<{
		active?: boolean;
	}>(),
	{
		active: false,
	},
);

const puzzle = defineModel<Puzzle>("puzzle", { required: true });
const progress = defineModel<PuzzleProgress>("progress", { required: true });

const button = useTemplateRef("button");

defineExpose({
	puzzle,
	progress,
	getButtonElement: () => button.value?.el,
});
</script>

<template>
	<Button
		ref="button"
		:disabled="progress?.puzzleState === 'locked'"
		:title="puzzle.id"
		:variant="progress.puzzleState === 'locked' ? 'secondary' : progress.puzzleState === 'unlocked' ? 'yellow' : 'green'"
		size="icon-circle-xl"
		:class="{ 'brightness-128': active }"
	>
		<Lock v-if="progress.puzzleState === 'locked'" />
		<LockOpen v-if="progress.puzzleState === 'unlocked'" />
		<Check v-if="progress.puzzleState === 'done'" />
	</Button>
</template>
