<script setup lang="ts">
import { usePuzzleMaker } from '../composables/usePuzzleMaker';
import PuzzleEditor from './PuzzleEditor.vue';
import TestAttributes from './TestAttributes.vue';
import Input from "@/components/Input.vue";
import Label from "@/components/Label.vue";
import Button from "@/components/Button.vue";
import ImportPuzzleForm from "./ImportPuzzleForm.vue";
import { defineClientComponent } from 'vitepress';

const ClipboardCopyButton = defineClientComponent(() => import('@/components/ClipboardCopyButton.vue'));

const { puzzle, addTest, removeTest } = usePuzzleMaker();

const stringify = (data: unknown) => {
  try {
    return JSON.stringify(data, null, 2);
  } catch (e) {
    return undefined;
  }
};
</script>

<template>
  <div :class="[`
  grid gap-3
  mt-12 mb-8 p-8
  bg-linear-to-br from-neutral-900 to-neutral-950
  border border-neutral-700 rounded 
  text-neutral-100
`]">
    <ImportPuzzleForm @import="(importedPuzzle) => puzzle = importedPuzzle" />

    <hr />

    <div>
      <Label class="block mb-3">Puzzle ID</Label>
      <Input v-model="puzzle.id" type="text" />
    </div>

    <hr />

    <div class="flex gap-6 items-center">
      <Label>Test Cases</Label>
      <Button class="w-fit aspect-square text-lg" @click="addTest">+</Button>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <TestAttributes v-for="test, i in puzzle.tests" :test="test" @click:close="() => removeTest(i)" />
    </div>

    <PuzzleEditor :disableSave="true" :puzzle="puzzle" />

    <!-- Generated -->
    <div
      class="relative whitespace-break-spaces border border-neutral-800 bg-neutral-950 inset-shadow-xs inset-shadow-black p-4 rounded text-sm">
      <ClipboardCopyButton label="Copy" class="absolute top-2 right-2" :content="stringify(puzzle)" />
      {{ stringify(puzzle) ?? "Invalid JSON" }}
    </div>
  </div>
</template>
