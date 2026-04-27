import { ref } from "vue";
import type { Puzzle } from "../puzzle.types";
import { useEditor } from "./useEditor";

export function usePuzzleGenerator() {
	const initialCode = "const [n] = input();\nconsole.log(n);";
	const { editorId, getCode } = useEditor(initialCode, updatePuzzleCode);

	const puzzle = ref<Puzzle>({
		id: "example-id",
		code: initialCode,
		tests: [
			{
				input: ["example"],
				expects: "example",
			},
		],
	});

	function updatePuzzleCode(newCode: string) {
		puzzle.value.code = newCode;
	}

	function addTest() {
		puzzle.value.tests.push({
			input: [],
			expects: "",
		});
	}

	function removeTest(index: number) {
		puzzle.value.tests.splice(index, 1);
	}

	return {
		editorId,
		getCode,
		puzzle,
		addTest,
		removeTest,
	};
}
