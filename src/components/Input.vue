<script setup lang="ts">
import { merge } from "@/lib/utils";

const props = defineProps<{
	class?: string;
}>();

const model = defineModel();
</script>

<template>
	<input
		v-model="model"
		:class="merge(`
    w-full h-7 p-2
    text-neutral-200
    bg-neutral-900
    border border-neutral-800 rounded
    inset-shadow-xs inset-shadow-black
    text-base
    disabled:bg-neutral-800
    disabled:text-neutral-500
  `, props.class)"
	>
</template>
