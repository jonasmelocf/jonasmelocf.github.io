<script setup lang="ts">
import PuzzleDisplay from "@/features/puzzle/components/PuzzleDisplay.vue";
import { getQueryParam } from "@/lib/utils";
import type { Puzzle } from "../puzzle.types";

const b64puzzle = getQueryParam("puzzle");
const puzzle =
	b64puzzle !== null &&
	(JSON.parse(decodeURIComponent(atob(b64puzzle))) as Puzzle);
</script>

<template>
	<PuzzleDisplay v-if="puzzle" :puzzle />
	<h1 v-if="!puzzle">error</h1>
</template>
