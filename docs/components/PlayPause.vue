<script setup lang="ts">
import { Pause, Play } from "@lucide/vue";

const { isPlaying = true } = defineProps<{
  isPlaying: boolean
}>();

const emit = defineEmits(["click"]);

</script>

<template>
  <menu @click="(e) => emit('click', e)"
    class="inline *:inline ml-1 opacity-15 hover:opacity-50 transition-opacity *:active:size-3.5 *:size-4 *:transition-all cursor-pointer">
    <Play v-if="!isPlaying" />
    <Pause v-if="isPlaying" />
  </menu>
</template>
