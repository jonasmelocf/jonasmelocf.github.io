<script setup lang="ts">
import CopyButton from "@/components/CopyButton.vue";

defineProps<{
  content: string;
}>();
</script>

<template>
  <div
    class="relative whitespace-break-spaces border border-neutral-800 bg-neutral-950 inset-shadow-xs inset-shadow-black p-4 rounded text-sm">
    <CopyButton label="Copy" class="absolute top-2 right-2" :content="content" />
    {{ content }}
  </div>
</template>
