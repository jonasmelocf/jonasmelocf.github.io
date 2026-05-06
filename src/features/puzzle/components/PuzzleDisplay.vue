<script setup lang="ts">
import Field from "@/components/Field.vue";
import { useTranslation } from "@/composables/useTranslation";
import type { Puzzle } from "../puzzle.types";
import PuzzleIDE from "./PuzzleIDE.vue";

const {
	puzzle,
	exampleAmount = 3,
	exampleStartFrom = 0,
} = defineProps<{
	puzzle: Puzzle;
	exampleAmount?: number;
	exampleStartFrom?: number;
}>();

const { t } = useTranslation();
</script>
<template>
	<div class="grid gap-1">
		<div class="flex gap-1 justify-between p-1 bg-(--vp-c-bg-elv) rounded-lg">
			<div
				v-for="test in puzzle.tests.slice(exampleStartFrom, exampleStartFrom + exampleAmount)"
				class="flex flex-col grow rounded-lg p-3 bg-(--vp-c-bg-alt) gap-4"
			>
				<Field :label="t('Input')">
					<span class="font-mono">{{ test.input }}</span>
				</Field>
				<Field :label="t('Expects')" class="whitespace-break-spaces">
					<span class="font-mono">{{ test.expects }}</span>
				</Field>
			</div>
		</div>
		<PuzzleIDE :puzzle />
	</div>
</template>
