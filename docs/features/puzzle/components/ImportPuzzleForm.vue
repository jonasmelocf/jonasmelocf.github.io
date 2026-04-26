<script setup lang="ts">
import Input from "@/components/Input.vue";
import Label from "@/components/Label.vue";
import Button from "@/components/Button.vue";
import { Send } from '@lucide/vue';
import { ref } from "vue";
import type { Puzzle } from "../puzzle.types";
import { useData } from 'vitepress';
const { lang } = useData();

const emit = defineEmits<{
  (e: 'import', puzzle: Puzzle): void
}>();
const input = ref('');
const isInvalid = ref(false);

function handleImport() {
  isInvalid.value = false;
  try {
    const data: Puzzle = JSON.parse(input.value);
    emit('import', data);
    input.value = '';
  } catch {
    isInvalid.value = true;
    setTimeout(() => {
      isInvalid.value = false;
    }, 3000);
  }
}

</script>
<template>
  <div>
    <Label class="block mb-3">{{ lang === 'br' ? 'Importar' : 'Import' }}</Label>
    <div class="flex gap-3">
      <Input v-model="input" placeholder='{ "id": "example-id", tests: [{...}]}' />
      <Button @click="handleImport" class="h-full p-1">
        <Send strokeWidth="1" :size="20" />
      </Button>
    </div>
    <Label v-if="isInvalid" class="text-red-500 mt-2">Invalid JSON</Label>
  </div>
</template>
