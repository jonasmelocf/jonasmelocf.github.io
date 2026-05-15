<script setup lang="ts">
import { merge } from "@/lib/utils";
import type { ClassValue } from "clsx";

const props = defineProps<{
	class?: ClassValue;
}>();
</script>
<template>
	<span :class="merge('whitespace-nowrap font-semibold text-neutral-500 text-xs', props.class)">
		<slot />
	</span>
</template>
