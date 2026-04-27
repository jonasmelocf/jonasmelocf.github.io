<script setup lang="ts" generic="T extends string">
import Button from "@/components/Button.vue";

const model = defineModel<T>({ required: true });

defineProps<{
  options: { label: string; value: T }[];
}>();
</script>

<template>
  <div class="grid gap-1">
    <div class="flex gap-2 p-2 rounded-xl justify-between w-fit bg-neutral-950 border border-neutral-800">
      <Button v-for="option in options" :key="option.value" :class="{ 'opacity-50': model !== option.value }"
        @click="model = option.value">
        {{ option.label }}
      </Button>
    </div>
    <slot />
  </div>
</template>
