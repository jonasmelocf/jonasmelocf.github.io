<script setup>
import puzzlesJSON from "@/assets/puzzles.json";
import { defineClientComponent } from "vitepress";
const PuzzleGenerator = defineClientComponent(() => import('@/features/puzzle/components/PuzzleGenerator.vue'));
const puzzles = Object.values(puzzlesJSON);
</script>

# Gerador de quebra-cabeças

<PuzzleGenerator :puzzles />
