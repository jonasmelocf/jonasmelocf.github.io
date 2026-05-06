<script setup>
import {defineClientComponent} from "vitepress";
import puzzles from "@/assets/puzzles.json";

const PuzzleDisplay = defineClientComponent(() => {
  return import("@/features/puzzle/components/PuzzleDisplay.vue")
});
</script>

# Puzzles

To solve the puzzles, you will need to create a program using **JavaScript** that will receive a specified input, throught the `input` function, and need to show a specified output, through `console.log`. Each puzzle contains examples of input and expected output.

When you are confident in your solution, use the `Run all` button or press `ctrl+enter`.

## Sum

<PuzzleDisplay :puzzle="puzzles['add-two-numbers']" />

## Factorial

<PuzzleDisplay :puzzle="puzzles['factorial']" />

## Prime

<PuzzleDisplay  :puzzle="puzzles['prime']" />

## Triangle

<PuzzleDisplay  :puzzle="puzzles['triangle']" />

## Hypotenuse

<PuzzleDisplay :puzzle="puzzles['hypotenuse']"/>

## Fibonacci

<PuzzleDisplay :puzzle="puzzles['fibonacci']"/>

## Square

<PuzzleDisplay :puzzle="puzzles['square']"/>
