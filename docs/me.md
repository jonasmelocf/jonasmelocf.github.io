<script setup>
import { ref, useTemplateRef } from "vue";
import { Play, Pause } from "@lucide/vue";
const year = new Date().getFullYear();
const thingsILikeRef = useTemplateRef("thingsILike");
const isThingsILikePlaying = ref(true);
const playThingsILike = () => isThingsILikePlaying.value = true;
const stopThingsILike = () => isThingsILikePlaying.value = false;
const thingsILike = [
  "programming",
  "learning",
  "optimizing",
  "customizing",
  "minimalism",
  "linux",
  "team working",
  "listeing to music",
  "puzzles",
  "coffee",
];
setInterval(() => {
  if (!thingsILikeRef.value || !isThingsILikePlaying.value) return;
  const i = Math.random() * thingsILike.length | 0;
  thingsILikeRef.value.value = thingsILike[i];
}, 3000);
</script>

# About Me

## Introduction

I am a **Full-stack** developer with about {{ year - 2017 }} years of programming experience and 2 years of professional experience.

I mainly work with **web** development.

I am self-taught and a fast learner.

<div class="flex items-center">
I like <select ref="thingsILike" class="shadow ml-2 mr-0.5 cursor-pointer border border-gray-500/20 rounded-md px-2"><option v-for="t in thingsILike">{{t}}</option></select>.
<menu class="ml-2 opacity-15 hover:opacity-50 transition-opacity *:active:size-3.5 *:size-4 *:transition-all cursor-pointer">
  <Play v-if="!isThingsILikePlaying" @click="playThingsILike" /> 
  <Pause v-if="isThingsILikePlaying" @click="stopThingsILike" />
</menu>
</div>

## Education

I hold a degree in Systems Analysis and Development from Unileão in Juazeiro do Norte, Ceará.

## Languages

In addition to Portuguese, I am fluent in English.

## Technologies

::: details Linux
My main operating system for {{ year - 2020 }} years. Currently, I use the CachyOS distro. I use **bash** and **zsh** to create automation scripts.
:::

::: details Python & Flask
I use **Python** when I need to create more complex automation scripts that are not as easily done with **bash**.

It was with **Python** that I took my first steps in building **REST API** servers using **Flask**.
:::

::: details Java & Spring Boot
I have used **Java** and **Spring Boot** with **Spring Web** to build **REST API** servers and maintain large-scale web projects using **Gradle** and **Maven**.

I have also used **Java** to create **desktop** applications with **Swing** and Minecraft mods.
:::

::: details NodeJS, NextJS, VueJS & React
**NodeJS** is the technology I use most in my day-to-day work.
Most of my **NodeJS** projects also use **TypeScript**.

When I’m not using **NextJS** for **full-stack** projects, I build **front-end** projects using **Vite**, and I usually use **React**.
I also really like other **front-end** frameworks such as **Svelte** and **Vue**, as they are more developer-friendly than **React**.

On the **back end**, I use **Hono**, which is very similar to **Express**, almost always combined with the **tRPC** library.

For **database** communication, I prefer using **drizzle**, but I am also proficient with **Prisma**.
:::

::: details PostgreSQL, MySQL & MongoDB
I can write **SQL queries** for **PostgreSQL** and **MySQL**. I have more experience with **PostgreSQL**.

I have also used **MongoDB** to maintain large-scale web projects.
:::

::: details Docker & docker-compose
I use **Docker** through **docker-compose** to run **databases** locally.
:::

::: details AI

:::

## Contact

Get in touch with me via email at [djjjonas02@gmail.com](mailto:djjjonas02@gmail.com).

[LinkedIn](https://linkedin.com/in/ojonasdemelo)

*I don’t have other social networks such as Facebook, Instagram, or Twitter.*
