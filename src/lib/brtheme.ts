import type { DefaultTheme } from "vitepress";

export const brtheme: DefaultTheme.Config = {
	returnToTopLabel: "Voltar ao começo",
	outline: {
		label: "Nessa página",
	},
	docFooter: {
		next: "Próxima página",
		prev: "Página anterior",
	},
	lastUpdated: {
		text: "Última atualização",
	},
	darkModeSwitchLabel: "Aparência",
	darkModeSwitchTitle: "Mudar para o tema escura",
	lightModeSwitchTitle: "Mudar para o tema claro",
	skipToContentLabel: "Pular para o conteúdo",
	notFound: {
		linkLabel: "voltar para a home",
		code: "404",
		title: "PÁGINA NÃO ENCONTRADA",
		quote: "Não há nada aqui",
		linkText: "Ir para a home",
	},
};
