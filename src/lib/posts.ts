import { getCollection } from "astro:content";

export const showDrafts = import.meta.env.DEV;

export async function getVisiblePosts() {
  return (await getCollection("posts"))
    .filter((post) => showDrafts || !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
