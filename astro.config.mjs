import { defineConfig } from "astro/config";

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

export default defineConfig({
  site: "https://xiaoluban-sudo.github.io",
  base: isGitHubPages ? "/personal-blog" : "/"
});
