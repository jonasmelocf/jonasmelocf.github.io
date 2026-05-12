<script setup>
import { defineClientComponent } from "vitepress";

const PuzzleIDEDebugger = defineClientComponent(() => {
  return import('@/features/puzzle/components/PuzzleIDEDebugger.vue')
});
</script>

# Puzzle IDE

<PuzzleIDEDebugger />
