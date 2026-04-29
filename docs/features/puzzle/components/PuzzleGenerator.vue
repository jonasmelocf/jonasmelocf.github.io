<script setup lang="ts">
import { ref } from "vue";
import Field from "@/components/Field.vue";
import Input from "@/components/Input.vue";
import Tabs from "@/components/Tabs.vue";
import { useTranslation } from "@/composables/useTranslation";
import { copy } from "@/lib/utils";
import { usePuzzleExport } from "../composables/usePuzzleExport";
import { usePuzzleGenerator } from "../composables/usePuzzleGenerator";
import type { Puzzle } from "../puzzle.types";
import ImportPuzzleForm from "./ImportPuzzleForm.vue";
import JsonBlock from "./JsonBlock.vue";
import OpenPuzzleForm from "./OpenPuzzleForm.vue";
import PuzzleEditor from "./PuzzleEditor.vue";
import TestCaseEditor from "./TestCaseEditor.vue";

const { puzzles = [] } = defineProps<{
	puzzles?: Puzzle[];
}>();

const { puzzle, addTest, removeTest, editorId } = usePuzzleGenerator();
const { puzzleJson, allPuzzlesJson } = usePuzzleExport(puzzle, puzzles);
const { t } = useTranslation();

type JsonView = "json" | "puzzle.json";
const jsonView = ref<JsonView>("json");

const JSON_VIEW_OPTIONS: { label: string; value: JsonView }[] = [
	{ label: "JSON", value: "json" },
	{ label: "puzzles.json", value: "puzzle.json" },
];
</script>

<template>
	<div
		class="grid gap-3 mt-12 mb-8 p-8 bg-linear-to-br from-neutral-900 to-neutral-950 border border-neutral-700 rounded text-neutral-100"
	>
		<!-- Top Actions -->
		<div class="flex gap-16">
			<OpenPuzzleForm
				v-if="puzzles.length"
				:puzzles="puzzles"
				@puzzle-select="(opened) => (puzzle = copy(opened))"
			/>
			<ImportPuzzleForm
				class="grow"
				@import="(imported) => (puzzle = copy(imported))"
			/>
		</div>

		<hr>

		<!-- Puzzle Inspector -->
		<div class="grid gap-8">
			<Field :label="t('Puzzle ID')">
				<Input v-model="puzzle.id" type="text" />
			</Field>

			<TestCaseEditor
				:tests="puzzle.tests"
				@add="addTest"
				@remove="removeTest"
			/>

			<Field :label="t('Initial code')">
				<div class="grid text-sm min-h-64" :id="editorId" />
			</Field>
		</div>

		<hr>

		<!-- Puzzle Preview -->
		<Field :label="t('Preview')">
			<PuzzleEditor disableSave :puzzle="puzzle" />
		</Field>

		<hr>

		<!-- Generated JSON -->
		<Field :label="t('Generated')">
			<Tabs
				class="*:max-h-100 *:overflow-auto"
				v-model="jsonView"
				:options="JSON_VIEW_OPTIONS"
			>
				<JsonBlock v-if="jsonView === 'json'" :content="puzzleJson" />
				<JsonBlock
					v-if="jsonView === 'puzzle.json'"
					:content="allPuzzlesJson"
				/>
			</Tabs>
		</Field>
	</div>
</template>
