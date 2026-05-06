<script setup lang="ts">
import type { ClassValue } from "clsx";
import { useTemplateRef } from "vue";
import { merge } from "@/lib/utils";

const buttonRef = useTemplateRef("button");
const props = defineProps<{
	class?: ClassValue;
	state?: "success" | "fail" | undefined;
}>();

function pop(brightnessModifier = 0) {
	buttonRef.value?.animate(
		[
			{ transform: "scale(1)", filter: "brightness(1)" },
			{
				transform: "scale(1.05)",
				filter: `brightness(${1 + brightnessModifier / 10})`,
			},
			{ transform: "scale(1)", filter: "brightness(1)" },
		],
		{
			duration: 300,
			easing: "ease-out",
		},
	);
}

function setState(state: "success" | "fail" | undefined) {
	if (!buttonRef.value) return;
	switch (state) {
		case "success":
			buttonRef.value.style.background = "var(--vp-c-success-3)";
			buttonRef.value.style.color = "var(--vp-c-white)";
			break;
		case "fail":
			buttonRef.value.style.background = "var(--vp-c-danger-3)";
			buttonRef.value.style.color = "var(--vp-c-white)";
			break;
		default:
			buttonRef.value.style.background = "var(--vp-button-alt-bg)";
			buttonRef.value.style.color = "var(--vp-button-alt-text)";
			break;
	}
	buttonRef.value.style.background =
		state === "success"
			? "var(--vp-c-success-3)"
			: state === "fail"
				? "var(--vp-c-danger-3)"
				: "var(--vp-button-alt-bg)";
}

defineExpose({ pop, setState });
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
