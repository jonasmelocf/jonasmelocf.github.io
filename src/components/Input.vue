<script setup lang="ts">
import { merge } from "@/lib/utils";

const props = defineProps<{
	class?: string;
}>();

const model = defineModel<string>();
</script>

<template>
	<input
		v-model="model"
		:class="merge(`
    outline-none
    h-7 p-2
    border rounded
    border-(--vp-input-border-color)
    bg-(--vp-input-bg-color)
    disabled:bg-neutral-800
    disabled:text-neutral-500
  `, props.class)"
	>
</template>
