<script setup lang="ts">
import Label from "@/components/Label.vue";
import { merge } from "@/lib/utils";

const { label, inline = false } = defineProps<{
	label: string;
	inline?: boolean;
}>();
</script>

<template>
	<div
		:class="merge({ 'flex items-center gap-2': inline, 'flex flex-col gap-3': !inline })"
	>
		<Label>{{ label }}</Label>
		<slot />
	</div>
</template>
