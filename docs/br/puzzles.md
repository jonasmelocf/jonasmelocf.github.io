<script setup>
import {defineClientComponent} from "vitepress";
import puzzles from "@/assets/puzzles.json";

const PuzzleDisplay = defineClientComponent(() => {
  return import("@/features/puzzle/components/PuzzleDisplay.vue")
});
</script>

# Quebra-cabeças

Para resolver os quebra-cabeças, você precisará criar um programa usando **JavaScript** que receberá uma determinada entrada, através da função `input`, e mostrará uma determinada saída, através da função `console.log`. Cada quebra-cabeça contém exemplos de entrada e saída esperada.

Quando estiver confiante da sua solução, use o botão `Executar todos` ou aperte `ctrl+enter`.

## Soma

<PuzzleDisplay :puzzle="puzzles['add-two-numbers']" />

## Fatorial

<PuzzleDisplay :puzzle="puzzles['factorial']" />

## Primo

<PuzzleDisplay :puzzle="puzzles['prime']" />

## Triangulo

<PuzzleDisplay :puzzle="puzzles['triangle']" />

## Hipotenusa

<PuzzleDisplay :puzzle="puzzles['hypotenuse']"/>

## Fibonacci

<PuzzleDisplay :puzzle="puzzles['fibonacci']"/>

## Quadrado

<PuzzleDisplay :puzzle="puzzles['square']"/>
