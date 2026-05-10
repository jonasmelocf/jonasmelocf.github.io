<script setup lang="ts">
import type { ClassValue } from "clsx";
import { useData } from "vitepress";
import { useTemplateRef, watch } from "vue";
import { merge } from "@/lib/utils";
import { useEditor } from "./useEditor";

type Props = {
	class?: ClassValue;
};

const p = defineProps<Props>();
const model = defineModel<string>({ default: "" });

const { isDark } = useData();
const codeEditorContainer = useTemplateRef("code-editor-container");
const editor = useEditor({
	code: model.value,
	// when the editor change, also change model.value
	onUpdate: (code) => (model.value = code),
	containerRef: codeEditorContainer,
});

watch(
	isDark,
	() => editor.setTheme(isDark.value ? "vs-dark" : "vs"),
	// let `watch` handle the current theme
	{ immediate: true },
);
watch(model, () => {
	// if model.value was changed but not by the editor
	if (model.value !== editor.getCode()) {
		editor.setCode(model.value);
	}
});

// Vitepress has a css rule called ".vp-doc a"
// which adds the following css rules to ALL <a>:
// font-weight: 500;
// text-decoration: underline;
// text-underline-offset: 2px;
// transition: color 0.25s, opacity 0.25s;
//
// This variable has tailwind classes to revert
// theses rules so the editor doesn't look weird when opening
// the context menu (ctrl+space) or the commands menu (F1)
const revertVpDocA = `
[&_a]:no-underline!
[&_a]:transition-none!
[&_a]:font-normal!
`;
</script>

<template>
	<div
		ref="code-editor-container"
		:class="merge(`min-h-96 ${revertVpDocA}`, p.class)"
	/>
</template>
