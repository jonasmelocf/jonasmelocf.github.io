export type Puzzle = {
	id: string;
	code: string;
	tests: TestCase[];
};
export type TestCase = {
	input: unknown[];
	expects: string;
};

export type PuzzleProgressMap = Record<string, PuzzleProgress>;

export type PuzzleProgress = {
	puzzleId: string;
	puzzleState: PuzzleState;
	lastCode?: string;
};

export type PuzzleState = "locked" | "unlocked" | "done";
