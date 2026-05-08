import type {} from "monaco-editor"; // to get auto-complete

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker.js?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker.js?worker";

self.MonacoEnvironment = {
	async getWorker(_, label) {
		if (label === "typescript" || label === "javascript") {
			return new tsWorker();
		}
		return new editorWorker();
	},
};
