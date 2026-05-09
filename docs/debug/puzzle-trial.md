<script setup>
import { defineClientComponent } from "vitepress";
import puzzleJson from "@/assets/puzzles.json";

const puzzles = Object.values(puzzleJson);
const PuzzleTrial = defineClientComponent(() => import("@/features/puzzle/components/PuzzleTrial.vue"))
</script>

# Puzzle trial

<PuzzleTrial :puzzles />
