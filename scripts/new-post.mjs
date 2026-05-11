import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const postsDir = path.join(process.cwd(), "src", "content", "posts");

function printHelp() {
  console.log(`Create a new blog post.

Usage:
  pnpm new:post "文章标题" [options]

Options:
  --category <name>      Post category, default: 随记
  --tags <list>          Comma-separated tags, example: Astro,部署
  --description <text>   Post description, default: 暂无简介。
  --date <yyyy-mm-dd>    Publish date, default: today
  --draft                Create as a draft
  --dry-run              Print the target path without writing a file
`);
}

function parseArgs(argv) {
  const args = {
    title: "",
    category: "随记",
    tags: [],
    description: "暂无简介。",
    date: new Date().toISOString().slice(0, 10),
    draft: false,
    dryRun: false
  };

  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === "--help" || value === "-h") {
      args.help = true;
    } else if (value === "--draft") {
      args.draft = true;
    } else if (value === "--dry-run") {
      args.dryRun = true;
    } else if (value === "--category" || value === "-c") {
      args.category = readOptionValue(argv, index, value);
      index += 1;
    } else if (value === "--tags" || value === "-t") {
      args.tags = readOptionValue(argv, index, value)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      index += 1;
    } else if (value === "--description" || value === "-d") {
      args.description = readOptionValue(argv, index, value);
      index += 1;
    } else if (value === "--date") {
      args.date = readOptionValue(argv, index, value);
      index += 1;
    } else if (value.startsWith("-")) {
      throw new Error(`Unknown option: ${value}`);
    } else {
      positional.push(value);
    }
  }

  args.title = positional.join(" ").trim();
  return args;
}

function readOptionValue(argv, index, optionName) {
  const value = argv[index + 1];

  if (!value || value.startsWith("-")) {
    throw new Error(`${optionName} requires a value.`);
  }

  return value.trim();
}

function toSlug(input) {
  const slug = input
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "post";
}

function escapeYaml(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatYamlArray(values) {
  return `[${values.map((value) => `"${escapeYaml(value)}"`).join(", ")}]`;
}

function uniqueFilePath(slug) {
  let candidate = path.join(postsDir, `${slug}.md`);
  let suffix = 2;

  while (existsSync(candidate)) {
    candidate = path.join(postsDir, `${slug}-${suffix}.md`);
    suffix += 1;
  }

  return candidate;
}

function validateDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error("--date must use yyyy-mm-dd format.");
  }
}

try {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.title) {
    printHelp();
    throw new Error("Missing post title.");
  }

  validateDate(args.date);

  const filePath = uniqueFilePath(toSlug(args.title));
  const content = `---
title: "${escapeYaml(args.title)}"
description: "${escapeYaml(args.description)}"
category: "${escapeYaml(args.category)}"
tags: ${formatYamlArray(args.tags)}
pubDate: "${args.date}"
draft: ${args.draft}
---

从这里开始写正文。
`;

  if (args.dryRun) {
    console.log(filePath);
    process.exit(0);
  }

  mkdirSync(postsDir, { recursive: true });
  writeFileSync(filePath, content, "utf8");

  console.log(`Created ${filePath}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
