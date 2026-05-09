<script setup lang="ts">
import { Check, Lock, LockOpen } from "@lucide/vue";
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

defineExpose({ puzzle, progress });
</script>

<template>
	<Button
		ref="progress-buttons"
		:disabled="progress?.puzzleState === 'locked'"
		:title="puzzle.id"
		:class="['size-10 *:p-0.5 *:mx-auto rounded-full p-0 text-(--vp-c-white)!', {
		'bg-(--vp-c-success-1)': progress?.puzzleState === 'done',
		'bg-(--vp-c-yellow-1)': progress?.puzzleState === 'unlocked',
		'shadow-black': active,
	}]"
	>
		<Lock v-if="progress.puzzleState === 'locked'" />
		<LockOpen v-if="progress.puzzleState === 'unlocked'" />
		<Check v-if="progress.puzzleState === 'done'" />
	</Button>
</template>
