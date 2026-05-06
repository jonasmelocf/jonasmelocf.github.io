<script setup>
import { ref } from "vue";
import PuzzleDisplay from "@/features/puzzle/components/PuzzleDisplay.vue";
import { getQueryParam } from "@/lib/utils";

const b64puzzle = getQueryParam("puzzle");
const puzzle = JSON.parse(decodeURIComponent(atob(b64puzzle)));
</script>

<PuzzleDisplay :puzzle />
