import { ref } from "vue";
import type { Puzzle } from "../puzzle.types";

export function usePuzzleMaker() {
  const puzzle = ref<Puzzle>({
    id: 'example-id',
    code: 'const [msg] = input();\nconsole.log(msg);',
    tests: [{
      input: ['example'],
      expects: 'example',
    }]
  });

  function addTest() {
    puzzle.value.tests.push({
      input: [],
      expects: "",
    });
  }

  function removeTest(index: number) {
    puzzle.value.tests.splice(index, 1);
  }

  return {
    puzzle,
    addTest,
    removeTest,
  }
}
