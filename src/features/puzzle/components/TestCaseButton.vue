<script setup lang="ts">
import type { ClassValue } from "clsx";
import { useTemplateRef } from "vue";
import { merge } from "@/lib/utils";

const button = useTemplateRef("button");
const props = defineProps<{
	class?: ClassValue;
	state?: "success" | "fail" | undefined;
}>();

function setState(state: "success" | "fail" | undefined) {
	if (!button.value) return;
	switch (state) {
		case "success":
			button.value.style.background = "var(--vp-c-success-3)";
			button.value.style.color = "var(--vp-c-white)";
			break;
		case "fail":
			button.value.style.background = "var(--vp-c-danger-3)";
			button.value.style.color = "var(--vp-c-white)";
			break;
		default:
			button.value.style.background = "var(--vp-button-alt-bg)";
			button.value.style.color = "var(--vp-button-alt-text)";
			break;
	}
}

defineExpose({ setState });
</script>

<template>
	<button
		type="button"
		ref="button"
		:class="merge(`
  grid grid-flow-col justify-between items-center
  text-(--vp-button-alt-text) text-left text-sm
  px-3 py-2
  border border-(--vp-button-alt-border) rounded
  bg-(--vp-button-alt-bg)
  active:bg-(--vp-button-alt-active-bg)
  active:border-(--vp-button-alt-active-border)
  active:text-(--vp-button-alt-active-text)
  hover:bg-(--vp-button-alt-hover-bg)
  hover:border-(--vp-button-alt-hover-border)
  hover:text-(--vp-button-alt-hover-text)
`, props.class)"
	>
		<slot />
	</button>
</template>
