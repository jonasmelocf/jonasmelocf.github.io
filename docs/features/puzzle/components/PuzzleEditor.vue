<script setup lang="ts">
import { Play } from "@lucide/vue";
import "prism-code-editor/prism/languages/javascript";
import { useData } from 'vitepress';
import { ref, useTemplateRef } from "vue";
import Label from "@/components/Label.vue";
import { runSandboxedCode, sleep } from "@/lib/utils";
import { useEditor } from "../composables/useEditor";
import type { TestCase } from "../puzzle.types";
import EditorButton from "./EditorButton.vue";

const { puzzle, disableSave } = defineProps<{
  puzzle: {
    id: string;
    code: string;
    tests: TestCase[];
  };
  disableSave?: boolean;
}>();

const { lang } = useData();
const savedCode = localStorage.getItem(`puzzle:${puzzle.id}`);

const { editorId, getCode } = useEditor(disableSave ? puzzle.code : savedCode ?? puzzle.code);
const audio = new Audio("/pop.mp3");
audio.preservesPitch = false;
audio.volume = 0.4;

// - Utils -
const max = Math.max;

// - States -
const editorButtonRefs = useTemplateRef("editorButtonRefs");
const output = ref("");
const state = ref<State>("undefined");
const expected = ref("");

// - Types -
type State = 'success' | 'fail' | 'undefined';

// - Constants -
const stateStyleMap: Record<State, string> = {
  success: 'var(--color-emerald-500)',
  fail: 'var(--color-red-500)',
  undefined: 'var(--color-gray-500)',
};

// - Actions -
function saveCode() {
  if (disableSave) return;
  const userCode = getCode();
  localStorage.setItem(`puzzle:${puzzle.id}`, userCode);
}

function resetTests() {
  puzzle.tests.forEach((_, i) => {
    const editorButton = editorButtonRefs.value?.[i];
    editorButton?.setState(undefined);
  });
  state.value = "undefined";
  output.value = "";
  expected.value = "";
}

async function runAllTests() {
  resetTests();
  for (let i = 0; i < puzzle.tests.length; i++) {
    if (!runTest(i, true)) break;
    await sleep(max(100, 200 - (i * 30)))
  }
}

function runTest(index: number, shiftAudio = false): boolean {
  const test = puzzle.tests[index];
  const editorButton = editorButtonRefs.value?.[index];
  const userCode = getCode();

  expected.value = "";
  saveCode();

  try {
    const input = `const input = () => ${JSON.stringify(test.input)};`;
    const wrappedCode = `${input}\n${userCode}`;

    const result = runSandboxedCode(wrappedCode).join("\n");

    if (result === test.expects) {
      state.value = "success";
      editorButton?.setState("success");
    } else {
      state.value = "fail";
      editorButton?.setState("fail");
      expected.value = `${test.expects}`;
    }

    output.value = result;
  } catch (error) {
    state.value = "fail";
    editorButton?.setState("fail");
    output.value = `Error: ${error instanceof Error ? error.message : String(error)}`;
  }

  editorButton?.pop();
  audio.playbackRate = shiftAudio ? 1 + index / max(1, puzzle.tests.length - 1) : 1;
  audio.currentTime = 0;
  audio.play();

  return state.value === "success";
}

</script>

<template>
  <div class="border relative border-neutral-500/15 overflow-hidden rounded-lg shadow"
    @keydown.ctrl.enter.capture.stop="runAllTests">
    <!-- Code Editor -->
    <div class="grid text-sm min-h-64" :id="editorId" />

    <div :style="{
      background: stateStyleMap[state],
    }" class="h-px" />

    <div class="p-5 gap-5 grid grid-cols-2 text-white bg-neutral-950">
      <menu class="overflow-visible gap-2 grid">
        <!-- Run all cases button -->
        <div class="flex items-center">
          <Label>{{ lang === 'br' ? "Casos de Teste" : "Test Cases" }}</Label>
          <EditorButton @click="runAllTests" class="size-fit py-1 text-xs ml-auto">
            {{ lang === 'br' ? "Executar todos" : "Run all" }}
          </EditorButton>
        </div>
        <!-- Case buttons -->
        <EditorButton v-for="test, i in puzzle.tests" @click="() => runTest(i)" ref="editorButtonRefs">
          {{ lang === 'br' ? "Caso" : "Case" }} {{ test.input }}
          <Play class="bg-neutral-800 rounded p-1 size-6" />
        </EditorButton>
      </menu>

      <div class="group">
        <span class="text-white/40 group-hover:text-white/80 transition font-mono text-xs font-light">
          {{ lang === 'br' ? "Saída" : "Output" }}
        </span>


        <div class="font-mono whitespace-break-spaces">
          {{ output }}
          <div v-if="expected">
            <br />{{ lang === 'br' ? "Esperado" : "Expected" }}:<br />{{ expected }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
