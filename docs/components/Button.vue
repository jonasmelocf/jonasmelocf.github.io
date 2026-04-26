<script setup lang="ts">
import { merge } from '@/lib/utils';

const props = defineProps<{
  class?: string;
}>();

</script>
<template>
  <button type="button" :class="merge(`
border
border-neutral-700/15
bg-neutral-900
hover:bg-neutral-900/80
active:bg-neutral-950
active:shadow-none
active:inset-shadow-xs
active:inset-shadow-black
active:translate-y-px
rounded-lg
font-medium
text-sm
shadow-md
px-2 py-0.5
`, props.class)">
    <slot />
  </button>
</template>
