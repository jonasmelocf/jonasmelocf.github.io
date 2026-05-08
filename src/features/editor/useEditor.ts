import "./userWorker";

import * as monaco from "monaco-editor";
import { onMounted, onUnmounted, type Ref } from "vue";

monaco.typescript.javascriptDefaults.addExtraLib(
	"declare function input(): string[]",
);

type Editor = monaco.editor.IStandaloneCodeEditor;

type Opts = {
	code?: string;
	onUpdate?: (code: string) => void;
	containerRef: Ref<HTMLElement | null | undefined>;
	theme?: string;
};
export function useEditor(opts: Opts) {
	const { code, onUpdate, containerRef } = opts;

	let editor: Editor | undefined;

	const getCode = () => editor?.getValue() ?? "";
	const setCode = (code = "") => void editor?.setValue(code);
	let setTheme: (theme: string) => void = () => {};

	onMounted(async () => {
		if (!containerRef.value) return;

		setTheme = monaco.editor.setTheme;

		editor = monaco.editor.create(containerRef.value, {
			value: code,
			language: "javascript",
			theme: "vs-dark",
			automaticLayout: true,
			wordBasedSuggestions: "currentDocument",
		});

		if (onUpdate) editor.onDidChangeModelContent(() => onUpdate(getCode()));
	});

	onUnmounted(() => {
		editor?.dispose();
	});

	return { getCode, setCode, setTheme };
}
