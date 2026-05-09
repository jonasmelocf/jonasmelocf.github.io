<script setup lang="ts">
const props = defineProps<{
	i: number;
}>();
</script>

<template>
	<div class="flex items-center">
		<div v-if="i !== 0" class="h-0.5 bg-(--vp-c-gray-soft) w-25" />
		<slot />
	</div>
</template>
