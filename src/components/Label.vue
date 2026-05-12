<script setup lang="ts">
import { merge } from "@/lib/utils";

const props = defineProps<{
	class?: string;
}>();
</script>
<template>
	<span
		:class="merge('whitespace-nowrap font-semibold text-neutral-500 text-xs', props.class)"
	>
		<slot />
	</span>
</template>
