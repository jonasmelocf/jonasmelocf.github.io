<script setup lang="ts">
import type { ClassValue } from "clsx";
import Field from "@/components/Field.vue";
import { useTranslation } from "@/composables/useTranslation";
import { merge } from "@/lib/utils";
import type { Puzzle } from "../puzzle.types";

const props = withDefaults(
	defineProps<{
		puzzle: Puzzle;
		amount?: number;
		start?: number;
		class?: ClassValue;
	}>(),
	{
		amount: 3,
		start: 0,
	},
);

const { t } = useTranslation();
</script>

<template>
	<div
		:class="merge('flex justify-between gap-1 rounded-lg bg-(--vp-c-bg-elv) p-1', props.class)"
	>
		<div
			v-for="test in props.puzzle.tests.slice(props.start, props.start + props.amount)"
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
</template>
