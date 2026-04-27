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
import type { EditorTheme } from "prism-code-editor/themes";
import { nextTick, onMounted, ref, useId } from "vue";

export function useEditor(code: string, onUpdate?: (code: string) => void) {
	const editorId = useId();
	const editor = ref<PrismEditor<{ theme: EditorTheme }>>();

	onMounted(() => {
		editor.value = basicEditor(`#${editorId}`, {
			theme: "github-dark",
			language: "js",
			lineNumbers: true,
			value: code,
		});

		if (onUpdate) editor.value.on("update", onUpdate);

		editor.value.addExtensions(
			autoComplete({
				filter: fuzzyFilter,
				closeOnBlur: true,
			}),
		);

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
			const div = document.querySelector(`#${editorId}`);
			if (!div) return;

			const shadowRoot = div.shadowRoot;
			if (!shadowRoot) return;

			// Wait for the next tick to ensure the shadow root is created
			nextTick(() => {
				// Find the editor element
				const editorElement = document.querySelector(`#${editorId}`);
				if (!editorElement) return;

				// Access the shadow root
				const shadowRoot = editorElement.shadowRoot;
				if (!shadowRoot) return;

				// List of CSS files to inject
				const stylesheets = ["/autocomplete.css", "/autocomplete-icons.css"];

				// Create and append a <link> tag for each stylesheet
				stylesheets.forEach((href) => {
					const link = document.createElement("link");
					link.rel = "stylesheet";
					link.href = href;
					shadowRoot.appendChild(link);
				});
			});
		});
	});

	return { getCode: () => editor.value?.value ?? "", editorId };
}
export type Editor = ReturnType<typeof useEditor>;
