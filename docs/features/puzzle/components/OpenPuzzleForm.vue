<script setup lang="ts">
import { ref } from "vue";
import Label from "@/components/Label.vue";
import Select from "@/components/Select.vue";
import { useTranslation } from "@/composables/useTranslation";
import type { Puzzle } from "../puzzle.types";

const { t } = useTranslation();

const props = defineProps<{
  puzzles: Puzzle[];
}>();

const emit = defineEmits<(e: 'puzzle-select', puzzle: Puzzle) => void>();

const selected = ref<Puzzle>();

function handlePuzzleSelected() {
  if (selected.value) emit("puzzle-select", selected.value);
}
</script>

<template>
  <div>
    <Label class="block mb-3">{{ t("Open") }}</Label>
    <Select v-model="selected" @change="handlePuzzleSelected">
      <option v-for="puzzle in props.puzzles" :key="puzzle.id" :value="puzzle">{{ puzzle.id }}</option>
    </Select>
  </div>
</template>
