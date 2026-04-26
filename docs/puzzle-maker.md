<script setup>
import puzzlesJSON from "@/puzzles.json";
import { defineClientComponent } from "vitepress";
const PuzzleMaker = defineClientComponent(() => import('@/features/puzzle/components/PuzzleMaker.vue'));
const puzzles = Object.values(puzzlesJSON);
</script>

# Puzzle maker

<PuzzleMaker :puzzles />
