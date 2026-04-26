<script setup lang="ts">
import { merge } from "@/lib/utils";

const props = defineProps<{
  class?: string;
}>();

const model = defineModel();
</script>

<template>
  <select v-model="model" :class="merge(`
    py-0.5 px-2
    text-neutral-100
    bg-neutral-900
    border border-neutral-800 rounded
    inset-shadow-xs inset-shadow-black
    text-base
    cursor-pointer
  `, props.class)">
    <slot />
  </select>
</template>
