<script setup lang="ts">
import { Play } from "@lucide/vue";
import type { ClassValue } from "clsx";
import { ref } from "vue";
import Button from "@/components/Button.vue";
import { merge } from "@/lib/utils";

const props = defineProps<{
	class?: ClassValue;
	state?: "success" | "fail" | undefined;
}>();

const variant = ref<"secondary" | "green" | "red">("secondary");

defineExpose({ setState });

function setState(state: "success" | "fail" | undefined) {
	if (state === "success") {
		variant.value = "green";
	} else if (state === "fail") {
		variant.value = "red";
	} else {
		variant.value = "secondary";
	}
}
</script>

<template>
	<Button
		size="lg"
		:class="merge('h-auto min-h-9 justify-between whitespace-normal', props.class)"
		:variant
	>
		<slot />
		<Play class="rounded p-1 size-6" />
	</Button>
</template>
