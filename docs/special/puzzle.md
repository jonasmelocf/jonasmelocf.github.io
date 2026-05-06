<script setup>
import {defineClientComponent} from "vitepress"

const QueryParamPuzzleDisplay = defineClientComponent(() => import("@/features/puzzle/components/QueryParamPuzzleDisplay.vue"))
</script>

<QueryParamPuzzleDisplay />
