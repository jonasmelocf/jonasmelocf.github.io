<script setup lang="ts">
import { Lock } from "@lucide/vue";
import Button from "./Button.vue";
import Field from "./Field.vue";
import Input from "./Input.vue";

// biome-ignore format: input types
const buttonVariants = [
	"primary", "secondary", "sponsor",
	"gray", "indigo", "purple",
	"green", "yellow", "red",
] as const;
const buttonSizes = ["lg", "default", "sm", "xs"] as const;

// biome-ignore format: input types
const buttonIconSizes = [
	"icon-circle-xl", "icon-lg",
	"icon", "icon-sm", "icon-xs",
] as const;

// biome-ignore format: input types
const inputTypes = [
	"button", "number",
	"checkbox", "color",
	"date", "datetime-local",
	"email", "file",
	"hidden", "month",
	"password", "radio",
	"range", "reset",
	"search", "tel",
	"url", "week",
] as const;

const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);
</script>
<template>
	<div class="flex flex-col gap-4 *:w-fit">
		<h2>Buttons</h2>

		<Button>Default button</Button>

		<div class="flex gap-2 flex-wrap">
			<Button v-for="variant in buttonVariants" :variant>
				{{ capitalize(variant) }}
			</Button>
		</div>

		<div
			v-for="variant in buttonVariants"
			class="flex gap-1 flex-wrap items-end"
		>
			<Button v-for="size in buttonSizes" :variant :size>
				{{ variant }} {{ size }}
			</Button>
		</div>

		<div
			v-for="variant in buttonVariants"
			class="flex gap-1 flex-wrap items-end"
		>
			<Button
				v-for="size in buttonIconSizes"
				:variant
				:size
				:title="`${variant} ${size}`"
			>
				<Lock />
			</Button>
		</div>

		<h2>Inputs</h2>

		<Field v-for="type in inputTypes" :label="type" inline>
			<Input
				:type
				:value="type === 'file' ? undefined : type"
				class="min-w-16"
			/>
		</Field>
	</div>
</template>
