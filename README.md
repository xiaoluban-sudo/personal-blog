# Personal Blog

一个用 Astro 和 Markdown 搭起来的个人博客。

## 常用命令

```bash
pnpm dev
pnpm build
pnpm preview
```

## 新建文章

```bash
pnpm new:post "我的第二篇文章" --category 技术 --tags Astro,部署 --description "记录一次博客迭代。"
```

文章会生成在 `src/content/posts/` 目录下。可选参数：

- `--category <name>`：文章分类，默认 `随记`
- `--tags <list>`：文章标签，用英文逗号分隔，例如 `Astro,部署`
- `--description <text>`：文章简介
- `--date <yyyy-mm-dd>`：发布日期，默认今天
- `--draft`：创建为草稿
- `--dry-run`：只预览将要生成的文件路径

## RSS

订阅地址：

```text
https://xiaoluban-sudo.github.io/personal-blog/rss.xml
```

## Sitemap

站点地图：

```text
https://xiaoluban-sudo.github.io/personal-blog/sitemap-index.xml
```

## SEO

页面会自动生成基础 SEO 信息，包括：

- `description`
- `canonical`
- Open Graph
- Twitter card
- RSS 自动发现链接
