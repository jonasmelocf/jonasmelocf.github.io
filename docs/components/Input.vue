<script setup lang="ts">
import { merge } from "@/lib/utils";

const props = defineProps<{
  class?: string;
}>();

const model = defineModel();
</script>

<template>
  <input v-model="model" :class="merge(`
    w-full h-7 p-2
    bg-neutral-900
    border border-neutral-800 rounded
    inset-shadow-xs inset-shadow-black
    text-base
  `, props.class)" />
</template>
