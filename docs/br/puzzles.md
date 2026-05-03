<script setup>
import {defineClientComponent} from "vitepress";
import puzzles from "@/assets/puzzles.json";

const PuzzleIDE = defineClientComponent(() => {
  return import('@/features/puzzle/components/PuzzleIDE.vue')
});

</script>

# Quebra-cabeças

Aqui você vai encontrar problemas que precisam ser resolvidos usando JavaScript.

As informações dadas para resolver os quebra-cabeças são poucas propositalmente. Use a lógica para entender o que deve ser feito e aprenda com os erros.

Quando estiver confiante da sua solução, use o botão `Executar todos` ou aperte `ctrl+enter`.

## Some dois números

Dados dois inteiros positivos `x` e `y`, mostre a soma deles.

<PuzzleIDE :puzzle="puzzles['add-two-numbers']" />

## Fatorial

Dado um inteiro positivo `n`, mostre seu fatorial.

<PuzzleIDE :puzzle="puzzles['factorial']" />

## Primo

Dado um inteiro positivo `n`, mostre `true` se for um número primo, se não, `false`.

<PuzzleIDE :puzzle="puzzles['prime']" />

## Triangulo

Dado um inteiro positivo `n`, mostre um triângulo retângulo que segue o seguinte padrão:

```text
*
**
***
```

<PuzzleIDE :puzzle="puzzles['triangle']" />

## Hipotenusa

Dados dois inteiros positivos `x` e `y` representando os catetos de um triângulo retângulo, mostre a hipotenusa.

<PuzzleIDE :puzzle="puzzles['hypotenuse']"/>
