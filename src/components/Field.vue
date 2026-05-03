<script setup lang="ts">
import Label from "@/components/Label.vue";

const { label } = defineProps<{
	label: string;
}>();
</script>

<template>
	<div class="grid gap-3">
		<Label>{{ label }}</Label>
		<slot />
	</div>
</template>
