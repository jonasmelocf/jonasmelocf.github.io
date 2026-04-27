<script setup lang="ts">
import { X } from "@lucide/vue";
import { ref } from 'vue';
import Input from "@/components/Input.vue";
import Label from "@/components/Label.vue";
import TextArea from '@/components/TextArea.vue';
import type { TestCase } from '../puzzle.types';

const { test } = defineProps<{
  test: TestCase;
}>();

const emit = defineEmits(["click:close"]);

const inputRef = ref(JSON.stringify(test.input));
const inputErrorRef = ref("");

function validateInput() {
  const data = inputRef.value.trim();
  inputErrorRef.value = '';
  try {
    const json = JSON.parse(data);
    if (!Array.isArray(json)) throw null;
    test.input = json;
  } catch {
    inputErrorRef.value = 'invalid json array';
  }
}

</script>

<template>
  <div
    class="group/main relative grid gap-4 bg-linear-to-br from-neutral-800 to-neutral-900 border border-neutral-800 rounded-xl p-6 text-xs text-white">
    <button type="button" @click="e => emit('click:close', e)" class="absolute top-2 right-2">
      <X :class="[`
  group-hover/main:opacity-70
  transition
  opacity-0 group-hover:opacity-100
  hover:opacity-100
  text-neutral-500
  size-4 rounded-full
  p-0.5
  bg-neutral-800/60
`]" />
    </button>
    <!-- Input field -->
    <div class="group grid gap-2.5">
      <Label class="transition group-hover:text-neutral-400">Input</Label>
      <Input v-model="inputRef" @change="validateInput" />
      <Label v-if="inputErrorRef" class="text-red-500">{{ inputErrorRef }}</Label>
    </div>
    <!-- Expects field -->
    <div class="group grid gap-2.5">
      <Label class="transition group-hover:text-neutral-400">Expects</Label>
      <TextArea v-model="test.expects" />
    </div>
  </div>
</template>
