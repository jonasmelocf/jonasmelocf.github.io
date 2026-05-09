<script setup>
import { defineClientComponent } from "vitepress";

const PuzzleTrialDebugger = defineClientComponent(() => import("@/features/puzzle/components/PuzzleTrialDebugger.vue"))
</script>

# Puzzle trial

<!-- <PuzzleTrialDebugMenu /> -->
<PuzzleTrialDebugger />
