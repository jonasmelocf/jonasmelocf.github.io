<script setup>
import AnimatedSelect from "@/components/AnimatedSelect.vue";
import { ref, useTemplateRef } from "vue";

// — Constants —
const year = new Date().getFullYear();

const thingsILike = [
  "programar",
  "aprender",
  "otimizar",
  "customizar",
  "minimalismo",
  "linux",
  "trabalhar em equipe",
  "ouvir música",
  "quebra-cabeças",
  "café",
];
</script>

# Sobre mim

## Introdução

Sou desenvolvedor **Full stack** com cerca de {{ year - 2017 }} anos de experiência programando e 2 anos de experiência profissional.

Trabalho principalmente com desenvolvimento **web**.

Sou autodidata e aprendo rápido.

Gosto de <AnimatedSelect :options="thingsILike" />

## Formação acadêmica

Sou formado em Análise e Desenvolvimento de Sistemas pela Unileão em Juazeiro do Norte, Ceará.

## Linguas

Além do português, sou fluete em inglês.

## Tecnologias

::: details Linux
Meu sistema operacional principal há {{ year - 2020 }} anos. Atualmente, uso a distro CachyOS. Uso **bash** e **zsh** para criar scripts de automatização.
:::

::: details Python & Flask
Uso **Python** quando preciso fazer scripts de automação mais complexos que não são tão facilmente feitos usando **bash**.

Foi usando **Python** que dei meus primeiros passos na criação de servidores **REST API** usando **Flask**.
:::

::: details Java & Spring Boot
Usei **Java** e **Spring Boot** com **Spring Web** para criar servidores **REST API** e manter projetos web de larga escala usando **Gradle** e **Maven**.

Também usei **Java** para criar aplicações **desktop** usando **Swing** e mods de Minecraft.
:::

::: details NodeJS, NextJS, VueJS & React
**NodeJS** é a tecnologia que mais uso no dia a dia.
A maioria dos meus projetos que usam **NodeJS** também usam **Typescript**.

Quando não estou utilizando **NextJS** para projetos **full stack**, crio projetos **front end** usando **Vite** e, geralmente, utilizo **React**.
Gosto bastante de outros frameworks **front end**, como **Svelte** e **Vue** por serem mais conveniêntes ao desenvolvedor do que **React**.

No **back end**, utilizo **Hono**, que é bastante similar ao **Express**, quase sempre acompanhado da biblioteca **tRPC**.

Para comunicação com o **banco de dados**, gosto de usar o **drizzle**, porém, também domino **Prisma**.
:::

::: details PostgreSQL, MySQL & MongoDB
Consigo escrever **queries SQL** para **PostgreSQL** e **MySQL**. Tenho mais experiência com **PostgreSQL**.

Já utilizei **MongoDB** para na manutenção de projetos web de larga escala.
:::

::: details Docker & docker-compose
Utilizo **Docker** através do **docker-compose** para subir **bancos de dados** localmente.
:::

::: details Agentes de IA
Uso vários **agentes de IA**, incluindo **Claude** e **Copilot**, para:

- Analisar possíveis bugs e otimizações
- Estudar tecnologias e suas documentações
- Gerar códigos previsíveis e planejados
- Organizar estrutura de codigos fonte
:::

## Contato

Entre em contato comigo pelo email jonasmelocf@gmail.com.

[LinkedIn](https://linkedin.com/in/ojonasdemelo).

_Não possuo outras redes como Facebook, Instagram ou Twitter._
