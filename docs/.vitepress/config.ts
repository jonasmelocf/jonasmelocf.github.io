// https://vitepress.dev/reference/site-config
// https://vitepress.dev/reference/default-theme-config

import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitepress";
import routes from "../routes.json";
import { brtheme } from "../../src/lib/brtheme.ts";

export default defineConfig({
	title: "Jonas de Melo",
	description: "Fullstack Web Developer",
	head: [["link", { rel: "icon", href: "/favicon.ico" }]],
	vite: {
		publicDir: path.resolve(__dirname, "../../public/"),
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "../../src/"),
			},
		},
		build: {
			chunkSizeWarningLimit: 10 * 1024, // monaco
		},
	},

	themeConfig: {
		logo: "https://avatars.githubusercontent.com/u/48167880?v=4",
		socialLinks: [
			{ icon: "github", link: "https://github.com/DJJJonas" },
			{ icon: "linkedin", link: "https://linkedin.com/in/ojonasdemelo" },
		],
		sidebar: {
			"/debug/": getDebugSidebarItems()
		}
	},

	locales: {
		br: {
			label: "Português do Brasil",
			lang: "pt-BR", // html lang attribute
			themeConfig: {
				sidebar: getSidebarItems("br"),
				...brtheme,
			},
		},
		en: {
			label: "English",
			lang: "en",
			themeConfig: {
				sidebar: getSidebarItems("en"),
			},
		},
	},
});

function getSidebarItems(lang: "en" | "br") {
	return routes.sidebar.map((item) => ({
		text: item[lang],
		link: item.link ? `/${lang}${item.link}` : undefined,
		items: item.items?.map((subItem) => ({
			text: subItem.text,
			link: subItem.link ? `/${lang}${subItem.link}` : undefined,
		})),
	}));
}

function getDebugSidebarItems() {
	return routes.debugSidebar.map((item) => ({
		text: item.text,
		link: `/debug${item.link}`,
	}))
}
