// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "server",

  integrations: [tailwind()],

  adapter: node({
    mode: "standalone",
  }),
});
