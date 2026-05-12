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

## 草稿预览

本地开发模式会显示 `draft: true` 的草稿文章，并带草稿标识；生产构建会自动隐藏草稿。

## 文章封面

文章可以在 frontmatter 中配置封面图：

```md
cover: "/images/covers/post.svg"
coverAlt: "封面图描述"
```

本地图片建议放在 `public/images/covers/`，也可以填写 `https://` 开头的远程图片地址。新建文章脚本也支持 `--cover` 和 `--cover-alt` 参数。

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
- `robots.txt`

## 搜索

站内搜索页面：

```text
https://xiaoluban-sudo.github.io/personal-blog/search/
```

搜索范围包括文章标题、正文、简介、分类和标签。

## 暗色模式

站点支持亮色 / 暗色模式切换，并会记住当前浏览器里的选择。

## 文章目录

文章页会根据 Markdown 标题自动生成目录。

## 阅读体验

站点还包含这些阅读功能：

- 阅读时间估算
- 字数统计
- 上一篇 / 下一篇
- 文章归档页
- 自定义 404 页面
- 复制文章链接
- 返回顶部
- 分类 / 标签总览页

## Markdown 样式

文章页优化了常见 Markdown 内容的显示，包括：

- 代码块和行内代码
- 引用块
- 列表
- 表格
- 分割线
- 图片

## 移动端导航

小屏幕下顶部导航会折叠成菜单按钮，避免链接过多时挤在一起。
