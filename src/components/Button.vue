<script setup lang="ts">
import type { ClassValue } from "clsx";
import { merge } from "@/lib/utils";

const props = defineProps<{
	class?: ClassValue;
}>();
</script>
<template>
	<button
		type="button"
		:class="merge(`
px-2 py-0.5
border rounded-lg
text-sm font-medium
shadow
border-(--vp-button-alt-border)
text-(--vp-button-alt-text)
bg-(--vp-button-alt-bg)
hover:border-(--vp-button-alt-hover-border)
hover:text-(--vp-button-alt-hover-text)
hover:bg-(--vp-button-alt-hover-bg)
active:border-(--vp-button-alt-active-border)
active:text-(--vp-button-alt-active-text)
active:bg-(--vp-button-alt-active-bg)
active:shadow-none
active:inset-shadow-xs
active:inset-shadow-black
active:translate-y-px
`, props.class)"
	>
		<slot />
	</button>
</template>
