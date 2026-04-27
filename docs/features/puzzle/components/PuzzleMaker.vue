<script setup lang="ts">
import { toRaw } from "vue";
import Button from "@/components/Button.vue";
import ClipboardCopyButton from '@/components/ClipboardCopyButton.vue';
import Input from "@/components/Input.vue";
import Label from "@/components/Label.vue";
import { stringify } from "@/lib/utils";
import { usePuzzleMaker } from '../composables/usePuzzleMaker';
import type { Puzzle } from "../puzzle.types";
import ImportPuzzleForm from "./ImportPuzzleForm.vue";
import OpenPuzzleForm from './OpenPuzzleForm.vue';
import PuzzleEditor from './PuzzleEditor.vue';
import TestAttributes from './TestAttributes.vue';

const { puzzle, addTest, removeTest, editorId } = usePuzzleMaker();
const { puzzles = [] } = defineProps<{
  puzzles: Puzzle[]
}>();

const copy = (puzzle: Puzzle) => structuredClone(toRaw(puzzle));
</script>

<template>
  <div :class="[`
  grid gap-3
  mt-12 mb-8 p-8
  bg-linear-to-br from-neutral-900 to-neutral-950
  border border-neutral-700 rounded 
  text-neutral-100
`]">
    <!-- Top Actions -->
    <div class="flex gap-16">
      <OpenPuzzleForm v-if="puzzles.length" :puzzles="puzzles" @puzzle-select="opened => puzzle = copy(opened)" />
      <ImportPuzzleForm class="grow" @import="(imported) => puzzle = copy(imported)" />
    </div>

    <hr />

    <!-- Puzzle Inspector -->
    <div class="grid gap-8">
      <div class="grid gap-3">
        <Label>Puzzle ID</Label>
        <Input v-model="puzzle.id" type="text" />
      </div>

      <div class="grid gap-3">
        <div class="flex gap-6 items-center">
          <Label>Test Cases</Label>
          <Button class="w-fit aspect-square text-lg" @click="addTest">+</Button>
        </div>

        <div class="grid gap-3 grid-cols-2 mb-4">
          <TestAttributes v-for="test, i in puzzle.tests" :key="`${test.input.join() + test.expects}`" :test="test"
            @click:close="() => removeTest(i)" />
        </div>
      </div>

      <div class="grid gap-3">
        <Label>Initial code</Label>
        <div class="grid text-sm min-h-64" :id="editorId" />
      </div>
    </div>

    <hr />

    <!-- Puzzle Preview -->
    <div class="grid gap-3">
      <Label>Preview</Label>
      <PuzzleEditor :disableSave="true" :puzzle="puzzle" />
    </div>

    <hr />

    <!-- Generated JSON -->
    <div class="grid gap-3">
      <Label>Generated JSON</Label>
      <div
        class="relative whitespace-break-spaces border border-neutral-800 bg-neutral-950 inset-shadow-xs inset-shadow-black p-4 rounded text-sm">
        <ClipboardCopyButton label="Copy" class="absolute top-2 right-2" :content="stringify(puzzle) ?? ''" />
        {{ stringify(puzzle) ?? "Invalid JSON" }}
      </div>
    </div>
  </div>
</template>
