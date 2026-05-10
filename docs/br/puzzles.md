<script setup>
import {defineClientComponent} from "vitepress";
import puzzles from "@/assets/puzzles.json";

const LocalPuzzleTrial = defineClientComponent(() => {
  return import("@/features/puzzle/components/LocalPuzzleTrial.vue")
});
</script>

# Quebra-cabeças

Use **JavaScript** para solucionar os quebra-cabeças.
Procure pela entrada e pela saída esperada de cada caso de teste e descubra o que fazer.

Para executar os casos de teste, use o botão `Executar todos` ou aperte `ctrl+enter`.
Boa sorte!

---

<LocalPuzzleTrial />
