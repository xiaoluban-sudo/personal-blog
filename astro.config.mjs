import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

export default defineConfig({
  site: "https://xiaoluban-sudo.github.io",
  base: isGitHubPages ? "/personal-blog" : "/",
  integrations: [sitemap()]
});
