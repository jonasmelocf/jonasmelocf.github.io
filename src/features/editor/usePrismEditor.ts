import type { PrismEditor } from "prism-code-editor";
import {
	autoComplete,
	completeFromList,
	fuzzyFilter,
	registerCompletions,
} from "prism-code-editor/autocomplete";
import {
	completeKeywords,
	jsCompletion,
	jsContext,
	jsDocCompletion,
	jsSnipets,
} from "prism-code-editor/autocomplete/javascript";
import { basicEditor } from "prism-code-editor/setups";
import type { EditorTheme as Theme } from "prism-code-editor/themes";
import { insertText } from "prism-code-editor/utils";
import { nextTick, onMounted, type Ref, ref } from "vue";

type Editor = PrismEditor<{ theme: Theme }>;
type Fn<T> = (arg: T) => void;

type Opts = {
	code?: string;
	onUpdate?: (code: string) => void;
	containerRef: Ref<HTMLElement | null | undefined>;
	theme?: Theme;
};
export function usePrismEditor(opts: Opts) {
	const { code, onUpdate, containerRef: container } = opts;

	const editorRef = ref<Editor>();

	const using = (f: Fn<Editor>) => editorRef.value && f(editorRef.value);
	const size = () => getCode().length;
	const getCode = () => using((editor) => editor.value) ?? "";
	const setCode = (code = "") => using((e) => insertText(e, code, 0, size()));
	const setTheme = (theme: Theme) => using((e) => e.setOptions({ theme }));

	onMounted(() => {
		if (!container.value) return;

		const editor = basicEditor(container.value, {
			theme: opts.theme ?? "github-dark",
			language: "js",
			lineNumbers: true,
			value: code,
		});
		editorRef.value = editor;

		if (onUpdate) editor.on("update", onUpdate);

		editor.addExtensions(autoComplete({ filter: fuzzyFilter }));

		registerCompletions(["javascript", "js"], {
			context: jsContext,
			sources: [
				jsCompletion(window),
				jsDocCompletion,
				completeKeywords,
				completeFromList(jsSnipets),
			],
		});

		nextTick(() => {
			const shadowRoot = container.value?.shadowRoot;
			if (!shadowRoot) return;

			const stylesheets = ["/autocomplete.css", "/autocomplete-icons.css"];

			stylesheets.forEach((href) => {
				const link = document.createElement("link");
				link.rel = "stylesheet";
				link.href = href;
				shadowRoot.appendChild(link);
			});
		});
	});

	return { getCode, setCode, setTheme };
}
