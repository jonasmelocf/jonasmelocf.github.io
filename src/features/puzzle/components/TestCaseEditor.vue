<script setup lang="ts">
import { nextTick, useTemplateRef } from "vue";
import Button from "@/components/Button.vue";
import Label from "@/components/Label.vue";
import { useTranslation } from "@/composables/useTranslation";
import type { TestCase } from "../puzzle.types";
import TestCaseForm from "./TestCaseForm.vue";
import { Plus } from "@lucide/vue";

defineProps<{
	tests: TestCase[];
}>();

const emit = defineEmits<{
	add: [];
	remove: [index: number];
}>();

const { t } = useTranslation();
const testCaseForms = useTemplateRef("test-case-form");

function handleAddTestCase() {
	emit("add");
	nextTick(() => {
		const lastTestcaseform = testCaseForms.value?.at(-1);
		if (!lastTestcaseform) return;
		lastTestcaseform.focusTextArea();
	});
}
</script>

<template>
	<div class="grid gap-3">
		<div class="flex gap-6 items-center">
			<Label>{{ t("Test cases") }}</Label>
			<Button class="p-1 aspect-square" @click="handleAddTestCase">
				<Plus :size="16" />
			</Button>
		</div>
		<div class="grid gap-3 grid-cols-2 mb-4">
			<TestCaseForm
				ref="test-case-form"
				v-for="(test, i) in tests"
				:key="test.input.join()"
				:test="test"
				@click:close="() => emit('remove', i)"
			/>
		</div>
	</div>
</template>
