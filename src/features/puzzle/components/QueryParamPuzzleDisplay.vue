<script setup lang="ts">
import { getQueryParam } from "@/lib/utils";
import type { Puzzle } from "../puzzle.types";
import LocalPuzzleIDE from "./LocalPuzzleIDE.vue";

const b64puzzle = getQueryParam("puzzle");
const puzzle =
	b64puzzle !== null &&
	(JSON.parse(decodeURIComponent(atob(b64puzzle))) as Puzzle);
</script>

<template>
	<LocalPuzzleIDE v-if="puzzle" :puzzle />
	<h1 v-if="!puzzle">error</h1>
</template>
