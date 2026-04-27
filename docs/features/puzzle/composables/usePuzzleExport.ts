import { computed, type Ref } from "vue";
import { stringify } from "@/lib/utils";
import type { Puzzle } from "../puzzle.types";

export function usePuzzleExport(puzzle: Ref<Puzzle>, puzzles: Puzzle[]) {
	const puzzleJson = computed(() => stringify(puzzle.value) ?? "Invalid JSON");

	const allPuzzlesJson = computed(() => {
		const map: Record<string, Puzzle> = {};

		for (const p of puzzles) {
			map[p.id] = p;
		}

		// Current puzzle overwrites any existing entry with the same ID
		map[puzzle.value.id] = puzzle.value;

		return stringify(map) ?? "Invalid JSON";
	});

	return { puzzleJson, allPuzzlesJson };
}
