<script setup lang="ts">
import type { ClassValue } from "clsx";
import { useTemplateRef } from "vue";
import { merge } from "@/lib/utils";

const buttonRef = useTemplateRef("button");
const props = defineProps<{
	class?: ClassValue;
	state?: "success" | "fail" | undefined;
}>();

function pop() {
	buttonRef.value?.animate(
		[
			{ transform: "scale(1)" },
			{ transform: "scale(1.05)" },
			{ transform: "scale(1)" },
		],
		{
			duration: 300,
			easing: "ease-out",
		},
	);
}

function setState(state: "success" | "fail" | undefined) {
	if (!buttonRef.value) return;
	buttonRef.value.style.background =
		state === "success"
			? "var(--color-emerald-700)"
			: state === "fail"
				? "var(--color-red-700)"
				: "none";
}

defineExpose({ pop, setState });
</script>

<template>
	<button
		type="button"
		ref="button"
		:class="merge(`
  flex justify-between items-center
  
  text-white text-left text-sm
  px-3 py-2

  border border-neutral-500/50 rounded
  hover:border-neutral-500/70
  
  bg-neutral-950
  active:bg-neutral-200/10      
  hover:bg-neutral-900 
`, props.class)"
	>
		<slot />
	</button>
</template>
