<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";
import { merge } from "@/lib/utils";

const props = defineProps<{
	class?: string;
	type?: InputHTMLAttributes["type"];
}>();

const model = defineModel();
</script>

<template>
	<input
		v-model="model"
		:type="props.type"
		:class="merge(`h-8 w-full min-w-0 rounded-lg border border-(--vp-input-border-color) bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-(--vp-text-3) placeholder:text-(--vp-text-2) focus-visible:border-(--vp-c-border) focus-visible:ring-3 focus-visible:ring-(--vp-c-border)/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-(--vp-input-bg-color)/50 disabled:opacity-50 aria-invalid:border-(--vp-c-red-3) aria-invalid:ring-3 aria-invalid:ring-(--vp-c-red-3)/20 md:text-sm dark:bg-(--vp-input-bg-color)/30 dark:disabled:bg-(--vp-input-bg-color)/80 dark:aria-invalid:border-(--vp-c-red-3)/50 dark:aria-invalid:ring-(--vp-c-red-3)/40 `, props.class)"
	>
</template>
