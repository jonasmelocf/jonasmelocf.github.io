<script setup lang="ts">
import Button, { type ButtonVariants } from "./Button.vue";

const props = withDefaults(
	defineProps<{
		trueColor?: ButtonVariants;
		falseColor?: ButtonVariants;
	}>(),
	{
		trueColor: "primary",
		falseColor: "secondary",
	},
);

const model = defineModel<boolean>({ default: false });

const emit = defineEmits<{
	toggle: [state: boolean];
}>();

function onClick() {
	model.value = !model.value;
	emit("toggle", model.value);
}
</script>

<template>
	<Button
		:variant="model ? props.trueColor : props.falseColor"
		@click="onClick"
	>
		<slot />
	</Button>
</template>
