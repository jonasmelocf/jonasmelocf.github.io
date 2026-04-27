<script setup>
import puzzlesJSON from "@/puzzles.json";
import { defineClientComponent } from "vitepress";
const PuzzleGenerator = defineClientComponent(() => import('@/features/puzzle/components/PuzzleGenerator.vue'));
const puzzles = Object.values(puzzlesJSON);
</script>

# Puzzle Generator

<PuzzleGenerator :puzzles />
