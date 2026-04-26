// https://vitepress.dev/reference/site-config
// https://vitepress.dev/reference/default-theme-config

import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitepress";
import { brtheme } from "../lib/brtheme.ts";
import routes from "../routes.json";

const logo = "https://avatars.githubusercontent.com/u/48167880?v=4";

export default defineConfig({
	title: "Jonas de Melo",
	description: "Fullstack Web Developer",
	head: [["link", { rel: "icon", href: logo }]],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "../"),
			},
		},
	},

	themeConfig: {
		logo,
		socialLinks: [
			{ icon: "github", link: "https://github.com/DJJJonas" },
			{ icon: "linkedin", link: "https://linkedin.com/in/ojonasdemelo" },
		],
	},

	locales: {
		br: {
			label: "Português do Brasil",
			lang: "br",
			themeConfig: {
				sidebar: routes.sidebar.map((item) => ({
					text: item.br,
					items: item.items?.map((subItem) => ({
						text: subItem.text,
						link: `/br/${subItem.link}`,
					})),
					link: `/br/${item.link}`,
				})),
				...brtheme,
			},
		},
		en: {
			label: "English",
			lang: "en",
			themeConfig: {
				sidebar: routes.sidebar.map((item) => ({
					text: item.en,
					items: item.items?.map((subItem) => ({
						text: subItem.text,
						link: `/en/${subItem.link}`,
					})),
					link: `/en/${item.link}`,
				})),
			},
		},
	},
});
