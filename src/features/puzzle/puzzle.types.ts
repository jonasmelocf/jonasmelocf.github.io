export type Puzzle = {
	id: string;
	code: string;
	tests: TestCase[];
};
export type TestCase = {
	input: unknown[];
	expects: string;
};
