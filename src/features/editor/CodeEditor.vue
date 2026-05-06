<script setup lang="ts">
import type { ClassValue } from "clsx";
import { useData } from "vitepress";
import { onMounted, useTemplateRef, watch } from "vue";
import { merge } from "@/lib/utils";
import { usePrismEditor } from "./usePrismEditor";

type Props = {
	class?: ClassValue;
};

const p = defineProps<Props>();
const model = defineModel<string>({ default: "" });

const { isDark } = useData();
const codeEditorContainer = useTemplateRef("code-editor-container");
const editor = usePrismEditor({
	code: model.value,
	onUpdate: (code) => (model.value = code),
	containerRef: codeEditorContainer,
});

watch(isDark, () =>
	editor.setTheme(isDark.value ? "github-dark" : "github-light"),
);

onMounted(() => {
	editor.setCode(model.value);
});
</script>

<template>
	<div
		ref="code-editor-container"
		:class="merge('grid min-h-64 text-sm', p.class)"
	/>
</template>
