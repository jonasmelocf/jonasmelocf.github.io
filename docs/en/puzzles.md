<script setup>
import {defineClientComponent} from "vitepress";
import puzzles from "@/assets/puzzles.json";

const LocalPuzzleTrial = defineClientComponent(() => {
  return import("@/features/puzzle/components/LocalPuzzleTrial.vue")
});
</script>

# Puzzles

Use **JavaScript** to solve the puzzles.
Look for the input and the expected output of each test case and discover what to do.

To run the test cases, use the `Run all` button or press `ctrl+enter`.
Good luck!

---

<LocalPuzzleTrial />
