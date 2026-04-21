import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

const icon = "https://avatars.githubusercontent.com/u/48167880?v=4";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: icon,
    nav: [
      // { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: "Sobre mim",
        link: "/me",
      },
      {
        text: "Artigos",
        items: [
          {
            text: "Why coding feels magical",
            link: "/articles/why-coding-feels-magical"
          }
        ],
      },
      {
        text: "Tutoriais",
        items: [
          {
            text: "AstroNvim",
            link: "/tutorial-astronvim"
          }
        ]
      }
    ],
    returnToTopLabel: "Voltar ao começo",
    outline: {
      label: "Nessa página",
    },
    docFooter: {
      next: "Próxima página",
      prev: "Página anterior"
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


    socialLinks: [
      { icon: 'github', link: 'https://github.com/DJJJonas' },
      { icon: "linkedin", link: "https://linkedin.com/in/ojonasdemelo" }
    ]
  },
  locales: {
    root: {
      label: "Português do Brasil",
      lang: "br",
    },
    en: {
      label: "English",
      lang: "en",
      themeConfig: {
        sidebar: [
          {
            text: "About me",
            link: "/en/me",
          },
          {
            text: "Articles",
            items: [
              {
                text: "Why coding feels magical",
                link: "/en/articles/why-coding-feels-magical.md"
              }
            ],
          },
          {
            text: "Tutorials",
            items: [
              {
                text: "AstroNvim",
                link: "/en/tutorial-astronvim"
              }
            ]
          }
        ],
      }
    },
  },

  title: "Jonas de Melo",
  description: "Fullstack Web Developer",
  head: [["link", { rel: "icon", href: icon }]],
  vite: {
    plugins: [tailwindcss()],
  },
})
