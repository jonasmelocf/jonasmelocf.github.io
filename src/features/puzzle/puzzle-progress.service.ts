import { tryOr } from "@/lib/utils";
import type { Puzzle, PuzzleProgress, PuzzleProgressMap } from "./puzzle.types";

export function createLockedProgress(puzzleId: string): PuzzleProgress {
	return {
		puzzleId,
		puzzleState: "locked",
		lastCode: undefined,
	};
}

export function syncProgressMap(puzzles: Puzzle[], map: PuzzleProgressMap) {
	for (const puzzle of puzzles) {
		if (map[puzzle.id] === undefined) {
			map[puzzle.id] = createLockedProgress(puzzle.id);
		}
	}

	const firstPuzzle = puzzles[0];
	if (firstPuzzle) {
		const firstProgress = map[firstPuzzle.id];
		if (firstProgress.puzzleState === "locked") {
			firstProgress.puzzleState = "unlocked";
		}
	}

	return map;
}

export function syncLocalProgressMap(puzzles: Puzzle[]) {
	const map = getLocalProgressMap();
	syncProgressMap(puzzles, map);
	saveLocalProgressMap(map);
	return map;
}

export function getLocalProgressMap(): PuzzleProgressMap {
	const item = localStorage.getItem("puzzle-progress-map");
	if (!item) {
		return {};
	}
	const parsed = tryOr(() => JSON.parse(item), {});
	return parsed;
}

export function getLocalProgress(puzzleId: string) {
	const map = getLocalProgressMap();
	const progress = map[puzzleId];

	if (progress) {
		return progress;
	}

	return saveLocalProgress(createLockedProgress(puzzleId));
}

export function saveLocalProgressMap(map: PuzzleProgressMap) {
	localStorage.setItem("puzzle-progress-map", JSON.stringify(map));
}

export function saveLocalProgress(progress: PuzzleProgress): PuzzleProgress {
	const map = getLocalProgressMap();
	map[progress.puzzleId] = progress;
	saveLocalProgressMap(map);
	return progress;
}

export function deleteLocalProgressMap() {
	localStorage.removeItem("puzzle-progress-map");
}
