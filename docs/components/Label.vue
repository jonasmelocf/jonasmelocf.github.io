<script setup lang="ts">
import { merge } from "@/lib/utils";

const props = defineProps<{
  class?: string;
}>();
</script>
<template>
  <span :class="merge('text-xs font-semibold text-neutral-500', props.class)">
    <slot />
  </span>
</template>
