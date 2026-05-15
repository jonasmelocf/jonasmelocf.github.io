<script setup lang="ts">
import type { ClassValue } from "clsx";
import { merge } from "@/lib/utils";

const props = defineProps<{
	class?: ClassValue;
}>();
</script>
<template>
	<span
		:class="merge('whitespace-nowrap font-semibold text-neutral-500 text-xs', props.class)"
	>
		<slot />
	</span>
</template>
