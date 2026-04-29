<script setup>
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;

import { useData } from "vitepress";
import Terminal from "@/features/terminal/Terminal.vue";

const { frontmatter } = useData();
</script>

<template>
	<Layout>
		<template #home-hero-image>
			<Terminal :intro="frontmatter.hero.intro" />
		</template>
	</Layout>
</template>
