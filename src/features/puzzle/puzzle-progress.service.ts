import { tryOr } from "@/lib/utils";
import type { Puzzle, PuzzleProgress, PuzzleProgressMap } from "./puzzle.types";

export function syncPuzzleProgress(puzzles: Puzzle[], save = true) {
	const map = getPuzzleProgressMap();
	for (const puzzle of puzzles) {
		if (map[puzzle.id] === undefined) {
			map[puzzle.id] = {
				puzzleId: puzzle.id,
				puzzleState: "locked",
				lastCode: undefined,
			};
		}
	}

	const firstPuzzle = puzzles[0];
	if (firstPuzzle) {
		const firstProgress = map[firstPuzzle.id];
		if (firstProgress.puzzleState === "locked") {
			firstProgress.puzzleState = "unlocked";
		}
	}

	if (save) {
		savePuzzleProgressMap(map);
	}
	return map;
}

export function getPuzzleProgressMap(): PuzzleProgressMap {
	const item = localStorage.getItem("puzzle-progress-map");
	if (!item) return {};
	const parsed = tryOr(() => JSON.parse(item), {});
	return parsed;
}

export function getPuzzleProgress(puzzleId: string) {
	const map = getPuzzleProgressMap();
	const progress = map[puzzleId];
	if (progress) return progress;
	return savePuzzleProgress({ puzzleId, puzzleState: "locked" });
}

export function savePuzzleProgressMap(map: PuzzleProgressMap) {
	localStorage.setItem("puzzle-progress-map", JSON.stringify(map));
}

export function savePuzzleProgress(progress: PuzzleProgress): PuzzleProgress {
	const map = getPuzzleProgressMap();
	map[progress.puzzleId] = progress;
	localStorage.setItem("puzzle-progress-map", JSON.stringify(map));
	return progress;
}

export function deletePuzzleProgressMap() {
	localStorage.removeItem("puzzle-progress-map");
}
