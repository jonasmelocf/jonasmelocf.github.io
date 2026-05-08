<script setup lang="ts">
import { X } from "@lucide/vue";
import { onMounted, ref, useTemplateRef } from "vue";
import Input from "@/components/Input.vue";
import Label from "@/components/Label.vue";
import TextArea from "@/components/TextArea.vue";
import { useTranslation } from "@/composables/useTranslation";
import type { TestCase } from "../puzzle.types";

const { test } = defineProps<{
	test: TestCase;
}>();

const emit = defineEmits(["click:close"]);

const inputRef = ref(JSON.stringify(test.input));
const inputErrorRef = ref("");
const textArea = useTemplateRef("text-area");

const { t } = useTranslation();

function validateInput() {
	const data = inputRef.value.trim();
	inputErrorRef.value = "";
	try {
		const json = JSON.parse(data);
		if (!Array.isArray(json)) throw null;
		test.input = json.map(String);
		inputRef.value = JSON.stringify(test.input);
	} catch {
		inputErrorRef.value = "invalid json array";
	}
}

onMounted(() => validateInput());

defineExpose({
	focusTextArea: () => textArea.value?.$el.focus(),
});
</script>

<template>
	<div
		class="group/main relative grid gap-4 bg-(--vp-c-bg) rounded p-6 text-xs"
	>
		<button
			type="button"
			@click="e => emit('click:close', e)"
			class="absolute top-2 right-2 group-hover/main:opacity-70 transition opacity-0 group-hover:opacity-100 hover:opacity-100 rounded-full p-0.5 bg-(--vp-button-alt-bg)"
		>
			<X class="size-3.5" />
		</button>
		<!-- Input field -->
		<div class="group grid gap-2.5">
			<Label>{{ t("Input") }}</Label>
			<Input class="font-mono" v-model="inputRef" @change="validateInput" />
			<Label v-if="inputErrorRef" class="text-(--vp-c-danger-1)"
				>{{ inputErrorRef }}</Label
			>
		</div>
		<!-- Expects field -->
		<div class="group grid gap-2.5">
			<Label class="transition group-hover:text-neutral-400"
				>{{ t("Expects") }}</Label
			>
			<TextArea ref="text-area" class="font-mono" v-model="test.expects" />
		</div>
	</div>
</template>
