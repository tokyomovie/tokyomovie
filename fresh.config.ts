import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { Context } from "./types/request.ts";

await Context.init();

export default defineConfig({
  plugins: [tailwind()],
});
