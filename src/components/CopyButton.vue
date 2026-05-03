<script setup lang="ts">
import Button from "@/components/Button.vue";

const { content, label } = defineProps<{
	content: string;
	label: string;
}>();

function copyToClipboard() {
	navigator.clipboard.writeText(content);
}
</script>

<template>
	<Button @click="copyToClipboard"> {{ label }} </Button>
</template>
