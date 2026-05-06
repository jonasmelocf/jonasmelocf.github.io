<script setup lang="ts">
import { merge } from "@/lib/utils";

const props = defineProps<{
	class?: string;
}>();

const model = defineModel();
</script>

<template>
	<select
		v-model="model"
		:class="merge(`
    py-0.5 px-2
    border rounded
    border-(--vp-input-border-color)
    bg-(--vp-input-bg-color)
    cursor-pointer
  `, props.class)"
	>
		<slot />
	</select>
</template>
