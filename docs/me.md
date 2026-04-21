<script setup>
import { ref, useTemplateRef } from "vue";
import { Play, Pause } from "@lucide/vue";
const year = new Date().getFullYear();
const thingsILikeRef = useTemplateRef("thingsILike");
const isThingsILikePlaying = ref(true);
const playThingsILike = () => isThingsILikePlaying.value = true;
const stopThingsILike = () => isThingsILikePlaying.value = false;
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
setInterval(() => {
  if (!thingsILikeRef.value || !isThingsILikePlaying.value) return;
  const i = Math.random() * thingsILike.length | 0;
  thingsILikeRef.value.value = thingsILike[i];
}, 3000);
</script>

# Sobre mim

## Introdução

Sou desenvolvedor **Full stack** com cerca de {{ year - 2017 }} anos de experiência programando e 2 anos de experiência profissional.

Trabalho principalmente com desenvolvimento **web**.

Sou autodidata e aprendo rápido.

<div class="flex items-center">
Gosto de <select ref="thingsILike" class="shadow ml-2 mr-0.5 cursor-pointer border border-gray-500/20 rounded-md px-2"><option v-for="t in thingsILike">{{t}}</option></select>.
<menu class="ml-2 opacity-15 hover:opacity-50 transition-opacity *:active:size-3.5 *:size-4 *:transition-all cursor-pointer">
  <Play v-if="!isThingsILikePlaying" @click="playThingsILike" /> 
  <Pause v-if="isThingsILikePlaying" @click="stopThingsILike" />
</menu>
</div>

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

::: details AI

:::

## Contato

Entre em contato comigo pelo email djjjonas02@gmail.com.

[LinkedIn](https://linkedin.com/in/ojonasdemelo).

_Não possuo outras redes como Facebook, Instagram ou Twitter._
