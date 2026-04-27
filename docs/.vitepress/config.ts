// https://vitepress.dev/reference/site-config
// https://vitepress.dev/reference/default-theme-config

import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitepress";
import { brtheme } from "../lib/brtheme.ts";
import routes from "../routes.json";

export default defineConfig({
	title: "Jonas de Melo",
	description: "Fullstack Web Developer",
	head: [["link", { rel: "icon", href: "/favicon.ico" }]],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "../"),
			},
		},
	},

	themeConfig: {
		logo: "https://avatars.githubusercontent.com/u/48167880?v=4",
		socialLinks: [
			{ icon: "github", link: "https://github.com/DJJJonas" },
			{ icon: "linkedin", link: "https://linkedin.com/in/ojonasdemelo" },
		],
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
