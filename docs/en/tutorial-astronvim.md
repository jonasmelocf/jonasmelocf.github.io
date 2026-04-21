# AstroNvim

## Introdução

Eu 💚 neovim, mas odeio configurar. Por isso uso o [AstroNvim](https://astronvim.com/). Com ele, posso deixar meu neovim pronto para programar em qualquer linguagem com o mínimo de configuração possível.

![sample](https://astronvim.com/_astro/astrodark.CdHFd1a7_2kNCug.webp)

## Requisitos

- uma [nerd font](https://nerdfonts.com/)
- neovim (v0.11+)
- git
- um compilador de C (preinstalado em várias distros linux)

## Instalação

Execute os seguintes comandos no terminal do seu sistema.

::: code-group

```sh [Linux/Mac]
git clone --depth 1 https://github.com/AstroNvim/template ~/.config/nvim
rm -rf ~/.config/nvim/.git
nvim
```

```sh [Windows]
git clone --depth 1 https://github.com/AstroNvim/template $env:LOCALAPPDATA\nvim
Remove-Item $env:LOCALAPPDATA\nvim\.git -Recurse -Force
nvim
```

:::

- O primeiro comando usa o `git` para clonar o template de configuração do AstroNvim.
- O segundo comando remove a pasta `.git`, pois ela é desnecessária.
- O terceiro comando inicia o `nvim` e instala as dependências base.

## Configuração

Use o neovim para acessar o arquivo de plugins da comunidade.

::: code-group

```sh [Linux]
nvim ~/.config/nvim/lua/community.lua
```

```sh [Windows]
nvim $env:LOCALAPPDATA\nvim\lua\community.lua
```

:::

Nesse arquivo você vai encontrar o seguinte código escrito em Lua.
Apague a primeira linha que está destacada.

```lua{1}
if true then return {} end -- WARN: REMOVE THIS LINE TO ACTIVATE THIS FILE

-- AstroCommunity: import any community modules here
-- We import this file in `lazy_setup.lua` before the `plugins/` folder.
-- This guarantees that the specs are processed before any user plugins.

---@type LazySpec
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.lua" },
  -- import/override with your plugins folder
}
```

Dentro da tabela que está sendo retornada, você pode colocar os packs de configuração criados pela comunidade e eles serão instalados automaticamente na próxima vez que você abrir o neovim.

Por exemplo, o meu arquivo `community.lua` tem os seguintes packs

```lua
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.java" },
  { import = "astrocommunity.pack.json" },
  { import = "astrocommunity.pack.html-css" },
  { import = "astrocommunity.pack.tailwindcss" },
  { import = "astrocommunity.pack.typescript" },
  { import = "astrocommunity.pack.vue" },
}
```

Para ver todos os packs, acesse o repositório `astrocommunity` clicando [aqui](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack).

## Mapeamento

Tabela com os atalhos do teclado traduzidos para português.

_Original: https://docs.astronvim.com/mappings ._

| Ação                           | Mapeamentos    |
| ------------------------------ | -------------- |
| Tecla Leader                   | `Space`        |
| Tecla Local Leader             | `,`            |
| Redimensionar para cima        | `Ctrl + Up`    |
| Redimensionar para baixo       | `Ctrl + Down`  |
| Redimensionar para a esquerda  | `Ctrl + Left`  |
| Redimensionar para a direita   | `Ctrl + Right` |
| Janela acima                   | `Ctrl + k`     |
| Janela abaixo                  | `Ctrl + j`     |
| Janela à esquerda              | `Ctrl + h`     |
| Janela à direita               | `Ctrl + l`     |
| Salvar arquivo                 | `Ctrl + s`     |
| Fechar janela                  | `Ctrl + q`     |
| Novo arquivo                   | `Leader + n`   |
| Renomear arquivo atual         | `Leader + R`   |
| Fechar buffer                  | `Leader + c`   |
| Próxima aba (aba real do vim)  | `]t`           |
| Aba anterior (aba real do vim) | `[t`           |
| Divisão horizontal             | `\`            |
| Divisão vertical               | `` ` ``        |

### Buffers

| Ação                                                                  | Mapeamentos    |
| --------------------------------------------------------------------- | -------------- |
| Próximo buffer                                                        | `]b`           |
| Buffer anterior                                                       | `[b`           |
| Mover buffer para a direita                                           | `>b`           |
| Mover buffer para a esquerda                                          | `<b`           |
| Navegar para aba de buffer com seletor interativo                     | `Leader + bb`  |
| Fechar todos os buffers exceto o atual                                | `Leader + bc`  |
| Fechar todos os buffers                                               | `Leader + bC`  |
| Excluir aba de buffer com seletor interativo                          | `Leader + bd`  |
| Fechar todos os buffers à esquerda do atual                           | `Leader + bl`  |
| Ir para o buffer anterior                                             | `Leader + bp`  |
| Fechar todos os buffers à direita do atual                            | `Leader + br`  |
| Ordenar buffers por extensão                                          | `Leader + bse` |
| Ordenar buffers por número do buffer                                  | `Leader + bsi` |
| Ordenar buffers por última modificação                                | `Leader + bsm` |
| Ordenar buffers por caminho completo                                  | `Leader + bsp` |
| Ordenar buffers por caminho relativo                                  | `Leader + bsr` |
| Abrir aba de buffer em nova divisão horizontal com seletor interativo | `Leader + b\`  |
| Abrir aba de buffer em nova divisão vertical com seletor interativo   | `Leader + b`   |

### Mapeamentos de Comentário

| Ação                                     | Mapeamentos  |
| ---------------------------------------- | ------------ |
| Alternar comentário da linha atual       | `Leader + /` |
| Inserir comentário abaixo da linha atual | `gco`        |
| Inserir comentário acima da linha atual  | `gcO`        |

### Gerenciamento de Listas

| Ação                            | Mapeamentos   |
| ------------------------------- | ------------- |
| Abrir Lista Quickfix            | `Leader + xq` |
| Próxima entrada Quickfix        | `]q`          |
| Entrada Quickfix anterior       | `[q`          |
| Última entrada Quickfix         | `]Q`          |
| Primeira entrada Quickfix       | `[Q`          |
| Abrir Lista Local               | `Leader + xl` |
| Próxima entrada na Lista Local  | `]l`          |
| Entrada anterior na Lista Local | `[l`          |
| Última entrada na Lista Local   | `]L`          |
| Primeira entrada na Lista Local | `[L`          |

### Melhor Saída (Better Escape)

| Ação         | Mapeamentos |
| ------------ | ----------- |
| Tecla Escape | `jj`, `jk`  |

### Autocompletar (Completion)

| Ação                                           | Mapeamentos                                 |
| ---------------------------------------------- | ------------------------------------------- |
| Abrir menu de autocompletar                    | `Ctrl + Space`                              |
| Selecionar autocompletar                       | `Enter`                                     |
| Próxima localização do snippet                 | `Tab`                                       |
| Localização anterior do snippet                | `Shift + Tab`                               |
| Próximo autocompletar                          | `Down`, `Ctrl + n`, `Ctrl + j`, `Tab`       |
| Autocompletar anterior                         | `Up`, `Ctrl + p`, `Ctrl + k`, `Shift + Tab` |
| Cancelar autocompletar                         | `Ctrl + e`                                  |
| Rolar documentação de autocompletar para cima  | `Ctrl + u`                                  |
| Rolar documentação de autocompletar para baixo | `Ctrl + d`                                  |

### Neo-Tree

| Ação             | Mapeamentos  |
| ---------------- | ------------ |
| Alternar Neotree | `Leader + e` |
| Focar Neotree    | `Leader + o` |

### Mapeamentos do Painel (Dashboard)

| Ação            | Mapeamentos  |
| --------------- | ------------ |
| Painel (Início) | `Leader + h` |

### Mapeamentos do Gerenciador de Sessões

| Ação                               | Mapeamentos   |
| ---------------------------------- | ------------- |
| Salvar Sessão                      | `Leader + Ss` |
| Última Sessão                      | `Leader + Sl` |
| Excluir Sessão                     | `Leader + Sd` |
| Excluir Sessão de Diretório        | `Leader + SD` |
| Pesquisar Sessões                  | `Leader + Sf` |
| Pesquisar Sessões de Diretório     | `Leader + SF` |
| Carregar Sessão do Diretório Atual | `Leader + S.` |

### Mapeamentos do Gerenciador de Pacotes

| Ação                              | Mapeamentos   |
| --------------------------------- | ------------- |
| Atualizar Lazy e Mason            | `Leader + pa` |
| Instalar Plugins                  | `Leader + pi` |
| Instalador Mason                  | `Leader + pm` |
| Atualizador Mason                 | `Leader + pM` |
| Status dos Plugins                | `Leader + ps` |
| Sincronizar Plugins               | `Leader + pS` |
| Verificar Atualizações de Plugins | `Leader + pu` |
| Atualizar Plugins                 | `Leader + pU` |

### Mapeamentos LSP

| Ação                          | Mapeamentos                      |
| ----------------------------- | -------------------------------- |
| Informações LSP               | `Leader + li`                    |
| Informações None-ls           | `Leader + lI`                    |
| Inspecionar Documento (Hover) | `K`                              |
| Formatar Documento            | `Leader + lf`                    |
| Esboço de Símbolos            | `Leader + lS`                    |
| Diagnóstico de Linha          | `gl`, `Leader + ld`, `<C-W> + d` |
| Todos os Diagnósticos         | `Leader + lD`                    |
| Diagnósticos do Workspace     | `Leader + lw`                    |
| Ações de Código               | `gra`, `Leader + la`             |
| Ações de Código-Fonte         | `Leader + lA`                    |
| Ajuda de Assinatura           | `Leader + lh`                    |
| Renomear                      | `grn`, `Leader + lr`             |
| Símbolos do Documento         | `Leader + ls`                    |
| Símbolos do Workspace         | `Leader + lG`                    |
| Próximo Diagnóstico           | `]d`                             |
| Diagnóstico Anterior          | `[d`                             |
| Próximo Erro de Diagnóstico   | `]e`                             |
| Erro de Diagnóstico Anterior  | `[e`                             |
| Próximo Aviso de Diagnóstico  | `]w`                             |
| Aviso de Diagnóstico Anterior | `[w`                             |
| Próximo Símbolo de Documento  | `]y`                             |
| Símbolo de Documento Anterior | `[y`                             |
| Símbolo do Documento          | `gO`                             |
| Declaração                    | `gD`                             |
| Definição de Tipo             | `gy`                             |
| Definição                     | `gd`                             |
| Implementação                 | `gri`                            |
| Referências                   | `grr`, `Leader + lR`             |

### Mapeamentos do Depurador (Debugger)

| Ação                              | Mapeamentos                |
| --------------------------------- | -------------------------- |
| Iniciar/Continuar Depurador       | `Leader + dc` ou `<F5>`    |
| Pausar Depurador                  | `Leader + dp` ou `<F6>`    |
| Reiniciar Depurador               | `Leader + dr` ou `<C-F5>`  |
| Executar Depurador até o Cursor   | `Leader + ds`              |
| Fechar Sessão do Depurador        | `Leader + dq`              |
| Encerrar Depurador                | `Leader + dQ` ou `<S-F5>`  |
| Alternar Breakpoint               | `Leader + db` ou `<F9>`    |
| Breakpoint Condicional            | `Leader + dC` ou `<S-F9>`  |
| Limpar Breakpoints                | `Leader + dB`              |
| Step Over                         | `Leader + do` ou `<F10>`   |
| Step Into                         | `Leader + di` ou `<F11>`   |
| Step Out                          | `Leader + dO` ou `<S-F11>` |
| Avaliar Expressão                 | `Leader + dE`              |
| Alternar REPL                     | `Leader + dR`              |
| Alternar Interface do Depurador   | `Leader + du`              |
| Inspecionar com Depurador (Hover) | `Leader + dh`              |

### Mapeamentos do Seletor (Picker)

| Ação                                      | Mapeamentos          |
| ----------------------------------------- | -------------------- |
| Retomar pesquisa anterior                 | `Leader + f + Enter` |
| Marcas                                    | `Leader + f'`        |
| Arquivos de config do AstroNvim           | `Leader + fa`        |
| Buffers                                   | `Leader + fb`        |
| Palavra no cursor                         | `Leader + fc`        |
| Comandos                                  | `Leader + fC`        |
| Encontrar arquivos                        | `Leader + ff`        |
| Encontrar arquivos (incluir ocultos)      | `Leader + fF`        |
| Arquivos rastreados pelo Git              | `Leader + fg`        |
| Tags de Ajuda                             | `Leader + fh`        |
| Mapeamentos de teclas                     | `Leader + fk`        |
| Linhas                                    | `Leader + fl`        |
| Páginas Man                               | `Leader + fm`        |
| Notificações                              | `Leader + fn`        |
| Arquivos Antigos                          | `Leader + fo`        |
| Arquivos Antigos (diretório atual)        | `Leader + fO`        |
| Projetos                                  | `Leader + fp`        |
| Registradores                             | `Leader + fr`        |
| Inteligente (buffers, recentes, arquivos) | `Leader + fs`        |
| Esquemas de cores (Colorschemes)          | `Leader + ft`        |
| Histórico de Desfazer                     | `Leader + fu`        |
| Live Grep                                 | `Leader + fw`        |
| Live Grep (incluir ocultos)               | `Leader + fW`        |
| Branches do Git                           | `Leader + gb`        |
| Commits do Git (repositório)              | `Leader + gc`        |
| Commits do Git (arquivo atual)            | `Leader + gC`        |
| Navegar no Git (abrir)                    | `Leader + go`        |
| Status do Git                             | `Leader + gt`        |
| Stash do Git                              | `Leader + gT`        |
| Símbolos LSP                              | `Leader + ls`        |
| Símbolos LSP do Workspace                 | `Leader + lG`        |

### Mapeamentos de Terminal

| Ação                      | Mapeamentos                                             |
| ------------------------- | ------------------------------------------------------- |
| Abrir Terminal Flutuante  | `Leader + tf`                                           |
| Abrir Terminal Horizontal | `Leader + th`                                           |
| Abrir Terminal Vertical   | `Leader + tv`                                           |
| Alternar Lazygit          | `Leader + tl`                                           |
| Alternar Node             | `Leader + tn`                                           |
| Alternar Python           | `Leader + tp`                                           |
| Alternar btm              | `Leader + tt`                                           |
| Alternar Terminal Atual   | `<F7>` ou `<C-'>` (não suportado em todos os terminais) |

### Mapeamentos de UI/UX

| Ação                                     | Mapeamentos    |
| ---------------------------------------- | -------------- |
| Alternar autopairs                       | `Leader + ua`  |
| Alternar detecção automática de root     | `Leader + uA`  |
| Alternar fundo (background)              | `Leader + ub`  |
| Alternar autocompletar (buffer)          | `Leader + uc`  |
| Alternar autocompletar (global)          | `Leader + uC`  |
| Alternar diagnósticos                    | `Leader + ud`  |
| Dispensar notificações                   | `Leader + uD`  |
| Alternar autoformatação (buffer)         | `Leader + uf`  |
| Alternar autoformatação (global)         | `Leader + uF`  |
| Alternar coluna de sinais (signcolumn)   | `Leader + ug`  |
| Alternar coluna de dobras (foldcolumn)   | `Leader + u>`  |
| Alternar dicas de LSP embutidas (buffer) | `Leader + uh`  |
| Alternar dicas de LSP embutidas (global) | `Leader + uH`  |
| Alternar configuração de recuo (indent)  | `Leader + ui`  |
| Alternar guias de recuo                  | `Leader + u\|` |
| Alternar barra de status (statusline)    | `Leader + ul`  |
| Alternar CodeLens                        | `Leader + uL`  |
| Mudar numeração de linha                 | `Leader + un`  |
| Alternar notificações                    | `Leader + uN`  |
| Alternar modo de colagem                 | `Leader + up`  |
| Alternar destaque de referência          | `Leader + ur`  |
| Alternar verificação ortográfica         | `Leader + us`  |
| Alternar ocultação (conceal)             | `Leader + uS`  |
| Alternar linha de abas (tabline)         | `Leader + ut`  |
| Alternar destaque de URL                 | `Leader + uu`  |
| Alternar texto virtual de diagnósticos   | `Leader + uv`  |
| Alternar linhas virtuais de diagnósticos | `Leader + uV`  |
| Alternar quebra de linha (wrap)          | `Leader + uw`  |
| Alternar destaque de sintaxe (buffer)    | `Leader + uy`  |
| Alternar tokens semânticos LSP (buffer)  | `Leader + uY`  |
| Alternar destaque de cores               | `Leader + uz`  |
| Alternar modo zen                        | `Leader + uZ`  |
