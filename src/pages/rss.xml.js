import rss from "@astrojs/rss";
import { getVisiblePosts } from "../lib/posts";
import { siteConfig } from "../site.config";

export async function GET(context) {
  const posts = await getVisiblePosts();
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const site = new URL(base, context.site);

  return rss({
    title: siteConfig.name,
    description: siteConfig.rss.description,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: [post.data.category, ...post.data.tags],
      link: `posts/${post.slug}/`
    }))
  });
}
