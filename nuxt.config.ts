import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  head: {
    title: "Trivia! Trivia!",
  },
  buildModules: ["@nuxtjs/tailwindcss"],
});
