<script setup lang="ts">
import type { ClassValue } from "clsx";
import { onMounted, useTemplateRef } from "vue";
import { merge } from "@/lib/utils";
import { usePrismEditor } from "./usePrismEditor";

type Props = {
	class?: ClassValue;
};

const p = defineProps<Props>();
const model = defineModel<string>({ default: "" });

const codeEditorContainer = useTemplateRef("code-editor-container");
const editor = usePrismEditor({
	code: model.value,
	onUpdate: (code) => (model.value = code),
	containerRef: codeEditorContainer,
});

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
