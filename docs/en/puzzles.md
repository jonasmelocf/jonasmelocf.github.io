<script setup>
import {defineClientComponent} from "vitepress";
import puzzles from "@/assets/puzzles.json";

const PuzzleIDE = defineClientComponent(() => {
  return import('@/features/puzzle/components/PuzzleIDE.vue')
});

</script>

# Puzzles

Here you will find problems that need to be solved using JavaScript.

The information given to solve the puzzles is intentionally minimal. Use logic to understand what needs to be done and learn from your mistakes.

When you are confident in your solution, use the `Run all` button or press `ctrl+enter`.

## Add two numbers

Given two positive integers `x` and `y`, show their sum.

<PuzzleIDE :puzzle="puzzles['add-two-numbers']" />

## Factorial

Given a positive integer `n`, show its factorial.

<PuzzleIDE :puzzle="puzzles['factorial']" />

## Prime

Given a positive integer `n`, show `true` if it is a prime number, otherwise, `false`.

<PuzzleIDE  :puzzle="puzzles['prime']" />

## Triangle

Given a positive integer `n`, show a right triangle that follows the following pattern:

```text
*
**
***
```

<PuzzleIDE  :puzzle="puzzles['triangle']" />

## Hypotenuse

Given two positive integers `x` and `y` representing the legs of a right triangle, show the hypotenuse.

<PuzzleIDE :puzzle="puzzles['hypotenuse']"/>
