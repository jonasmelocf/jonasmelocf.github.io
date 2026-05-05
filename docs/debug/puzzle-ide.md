<script setup> import {defineClientComponent} from "vitepress";
import { ref, computed } from "vue";
import lorem from "@/assets/lorem.txt?raw";
import { tryOr } from "@/lib/utils.ts"
import Label from "@/components/Label.vue";
import Field from "@/components/Field.vue";
import Input from "@/components/Input.vue";

const PuzzleIDE = defineClientComponent(() => {
  return import('@/features/puzzle/components/PuzzleIDE.vue')
});

const wordAmount = ref(1);
const testCaseAmount = ref(32);
const wordsRegex = computed(() => Array(+wordAmount.value).fill("\\w+").join(".*?"));
const loremWords = computed(() => lorem.match(new RegExp(wordsRegex.value, "g")));

const startingPopTime = ref(200);
const popTimeMultiplier = ref(8);
const minPopTime = ref(40);

const customFunc = ref("");
const STEP_AMOUNT = 5;
const customFuncIncreaseExample = computed((last) => {
  // if(!/i/.test(customFunc.value)) return undefined;
  if (!customFunc.value) return undefined;
  const steps = [];
  for (let i = 0; i < STEP_AMOUNT; i++) {
    const evaluation = tryOr(
      () => (new Function("i", `return Number(${customFunc.value});`)(i)),
      undefined,
    );
    if (evaluation === undefined) return last;
    steps.push(Math.max(evaluation.toFixed(1), minPopTime.value) + "ms");
  }
  return steps.join(", ") + ", ...";
})

const getPopTime = computed(
  () => customFunc.value
    ? tryOr(() => new Function("i", `return Number(${customFunc.value});`), () => 1)
    : (index) => startingPopTime.value - index * popTimeMultiplier.value);

const puzzleForDebug = computed(() => ({
  id: "lorem",
  code: "console.log(input()[0])",
  tests: loremWords.value.map((word) => ({
    input: [word],
    expects: word,
  })).slice(0, testCaseAmount.value),
}));
</script>

# Puzzle ide debug

<div class="flex flex-wrap gap-2 mt-8">
  <div class="flex flex-col gap-3">
    <Field label="Test case amount">
      <input
        type="range"
        :min="1"
        :max="127"
        v-model="testCaseAmount" 
      />
    </Field>

  `{{ testCaseAmount }}` test cases.
  </div>

  <div class="flex flex-col gap-3">
    <Field label="Word amount">
      <input
        type="range"
        :min="1"
        :max="15"
        v-model="wordAmount" 
      />
    </Field>

  `{{ wordAmount }}` words.
  </div>

  <div class="grid grid-cols-2 gap-3">
    <Field label="Starting pop time">
      <Input
        type="number"
        class="w-16"
        :disabled="customFunc.length"
        v-model="startingPopTime" 
      />
    </Field>
    <Field label="Pop time multiplier">
      <Input
        type="number"
        class="w-16"
        :disabled="customFunc.length"
        v-model="popTimeMultiplier" 
      />
    </Field>
    <Field label="Minimum pop time">
      <Input
        type="number"
        class="w-16"
        v-model="minPopTime" 
      />
    </Field>
  </div>

  <Field class="w-full" label="Custom function">
    <Input
      placeholder="200 * 0.97**i"
      v-model="customFunc" 
    />
    <Label v-if="customFuncIncreaseExample">{{ customFuncIncreaseExample }}</Label>
  </Field>
</div>

[go to bottom](######bottom)

<PuzzleIDE :puzzle="puzzleForDebug" :minPopTime :getPopTime />

`ctrl+enter` to repeat

###### bottom

[go to top](#puzzle-ide-debug)
