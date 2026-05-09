<script setup lang="ts">
import { Lock, LockOpen } from "@lucide/vue";
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
const progress = defineModel<PuzzleProgress>("progress");

defineExpose({ puzzle, progress });
</script>

<template>
	<Button
		ref="progress-buttons"
		:disabled="progress?.puzzleState === 'locked'"
		:title="puzzle.id"
		:class="['size-10 rounded-full p-0 text-(--vp-c-white)!', {
		'bg-(--vp-c-success-3)': progress?.puzzleState === 'done',
		'shadow-black': active,
	}]"
	>
		<Lock
			v-if="!progress || progress.puzzleState === 'locked'"
			class="p-0.5 mx-auto"
		/>
		<LockOpen v-else class="p-0.5 mx-auto" />
	</Button>
</template>
