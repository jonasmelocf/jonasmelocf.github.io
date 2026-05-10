<script setup lang="ts">
import type { ClassValue } from "clsx";
import { cva, type VariantProps } from "cva";
import { useTemplateRef } from "vue";
import { merge } from "@/lib/utils";

const button = cva({
	base: "group/button inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-clip-padding font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	variants: {
		variant: {
			primary:
				"border-(--vp-button-brand-border) bg-(--vp-button-brand-bg) text-(--vp-button-brand-text) hover:border-(--vp-button-brand-hover-border) hover:bg-(--vp-button-brand-hover-bg) hover:text-(--vp-button-brand-hover-text) active:border-(--vp-button-brand-active-border) active:bg-(--vp-button-brand-active-bg) active:text-(--vp-button-brand-active-text)" as const,
			secondary:
				"border-(--vp-button-alt-border) bg-(--vp-button-alt-bg) text-(--vp-button-alt-text) hover:border-(--vp-button-alt-hover-border) hover:bg-(--vp-button-alt-hover-bg) hover:text-(--vp-button-alt-hover-text) active:border-(--vp-button-alt-active-border) active:bg-(--vp-button-alt-active-bg) active:text-(--vp-button-alt-active-text)" as const,
			sponsor:
				"border-(--vp-button-sponsor-border) bg-(--vp-button-sponsor-bg) text-(--vp-button-sponsor-text) hover:border-(--vp-button-sponsor-hover-border) hover:bg-(--vp-button-sponsor-hover-bg) hover:text-(--vp-button-sponsor-hover-text) active:border-(--vp-button-sponsor-active-border) active:bg-(--vp-button-sponsor-active-bg) active:text-(--vp-button-sponsor-active-text)" as const,
			gray: "bg-(--vp-c-gray-3) hover:bg-(--vp-c-gray-2) active:bg-(--vp-c-gray-1)" as const,
			indigo:
				"border-0 bg-(--vp-c-indigo-3) text-(--vp-c-white) hover:bg-(--vp-c-indigo-2) active:bg-(--vp-c-indigo-1)" as const,
			purple:
				"border-0 bg-(--vp-c-purple-3) text-(--vp-c-white) hover:bg-(--vp-c-purple-2) active:bg-(--vp-c-purple-1)" as const,
			green:
				"border-0 bg-(--vp-c-green-3) text-(--vp-c-white) hover:bg-(--vp-c-green-2) active:bg-(--vp-c-green-1)" as const,
			yellow:
				"border-0 bg-(--vp-c-yellow-3) text-(--vp-c-white) hover:bg-(--vp-c-yellow-2) active:bg-(--vp-c-yellow-1)" as const,
			red: "border-0 bg-(--vp-c-red-3) text-(--vp-c-white) hover:bg-(--vp-c-red-2) active:bg-(--vp-c-red-1)" as const,
		},
		size: {
			default:
				"h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2" as const,
			xs: "h-6 gap-1 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),10px)] px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3" as const,
			sm: "h-7 gap-1 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5" as const,
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2" as const,
			icon: "size-8" as const,
			"icon-xs":
				"size-6 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3" as const,
			"icon-sm":
				"size-7 in-data-[slot=button-group]:rounded-lg rounded-[min(var(--radius-md),12px)]" as const,
			"icon-lg": "size-9" as const,
			"icon-circle-xl":
				"size-10 gap-1.5 rounded-full px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2" as const,
		},
	},
});

type ButtonProps = VariantProps<typeof button>;

const el = useTemplateRef("button");

const props = withDefaults(
	defineProps<{
		class?: ClassValue;
		type?: "button" | "submit" | "reset";
		variant?: ButtonProps["variant"];
		size?: ButtonProps["size"];
	}>(),
	{
		type: "button",
		variant: "secondary",
		size: "default",
	},
);

defineExpose({
	getEl: () => {
		if (!el.value) {
			throw new Error("tried to get undefined button element");
		}
		return el.value;
	},
});
</script>
<template>
	<button
		ref="button"
		:type="props.type"
		:class="merge(button(props), props.class)"
	>
		<slot />
	</button>
</template>
