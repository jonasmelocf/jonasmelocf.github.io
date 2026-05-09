import { tryOr } from "@/lib/utils";
import type { PuzzleProgress, PuzzleProgressMap } from "./puzzle.types";

export function getPuzzleProgressMap(): PuzzleProgressMap {
	const item = localStorage.getItem("puzzle-progress-map");
	if (!item) return {};
	const parsed = tryOr(() => JSON.parse(item), undefined);
	return parsed;
}

export function getPuzzleProgress(puzzleId: string) {
	const map = getPuzzleProgressMap();
	const progress = map[puzzleId];
	if (progress) return progress;
	return savePuzzleProgress({ puzzleId, puzzleState: "locked" });
}

export function savePuzzleProgress(progress: PuzzleProgress): PuzzleProgress {
	const map = getPuzzleProgressMap();
	map[progress.puzzleId] = progress;
	localStorage.setItem("puzzle-progress-map", JSON.stringify(map));
	return progress;
}
