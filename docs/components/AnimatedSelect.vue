<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import PlayPause from "./PlayPause.vue";

// - Props -
const { options } = defineProps<{
	options: string[];
}>();

// - Refs -
const isPlaying = ref(true);

// — Template refs —
const selectRef = useTemplateRef("select");

// - Handlers -
function handleIsPlayingToggle() {
	isPlaying.value = !isPlaying.value;
}

// — Animation —
let animId: NodeJS.Timeout;

onMounted(() => {
	let i = 0;
	animId = setInterval(() => {
		const select = selectRef.value;
		if (!select || !isPlaying.value) return;
		i = (i + 1) % options.length;
		select.value = options[i];
	}, 2000);
});

onUnmounted(() => clearInterval(animId));
</script>

<template>
	<select
		ref="select"
		class="shadow mr-0.5 cursor-pointer border border-gray-500/20 rounded-md px-2"
	>
		<option v-for="t in options">{{ t }}</option>
	</select>
	<PlayPause @click="handleIsPlayingToggle" :isPlaying="isPlaying" />
</template>
