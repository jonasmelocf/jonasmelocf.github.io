<script setup lang="ts">
import Button from "@/components/Button.vue";
import Label from "@/components/Label.vue";
import { useTranslation } from "@/composables/useTranslation";
import type { TestCase } from "../puzzle.types";
import TestCaseForm from "./TestCaseForm.vue";

defineProps<{
  tests: TestCase[];
}>();

const emit = defineEmits<{
  add: [];
  remove: [index: number];
}>();

const { t } = useTranslation();
</script>

<template>
  <div class="grid gap-3">
    <div class="flex gap-6 items-center">
      <Label>{{ t("Test cases") }}</Label>
      <Button class="w-fit aspect-square text-lg" @click="emit('add')">+</Button>
    </div>
    <div class="grid gap-3 grid-cols-2 mb-4">
      <TestCaseForm v-for="(test, i) in tests" :key="i" :test="test" @click:close="() => emit('remove', i)" />
    </div>
  </div>
</template>
