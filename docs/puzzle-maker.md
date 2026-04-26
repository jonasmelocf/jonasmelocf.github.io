<script setup>
import { defineClientComponent } from "vitepress";
const PuzzleMaker = defineClientComponent(() => import('@/features/puzzle/components/PuzzleMaker.vue'));
</script>

# Puzzle maker

<PuzzleMaker />
