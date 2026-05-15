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
	let editor: Editor | undefined;

	const getCode = () => editor?.getValue() ?? "";
	const setCode = (code = "") => void editor?.setValue(code);
	const setTheme = monaco.editor.setTheme;

	onMounted(async () => {
		if (!opts.containerRef.value) return;

		editor = monaco.editor.create(opts.containerRef.value, {
			value: opts.code,
			language: "javascript",
			theme: opts.theme,
			automaticLayout: true,
			wordBasedSuggestions: "currentDocument",
			scrollBeyondLastLine: false,
			scrollbar: {
				alwaysConsumeMouseWheel: false,
			},
			minimap: {
				enabled: false,
			},
		});

		if (opts.onUpdate)
			editor.onDidChangeModelContent(() => opts.onUpdate?.(getCode()));
	});

	onUnmounted(() => {
		editor?.dispose();
	});

	return { getCode, setCode, setTheme };
}
