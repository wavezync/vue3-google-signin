// /llms-full.txt: every docs page as Markdown in one file, in sidebar order.
// MDX pages are converted line by line: example files shown with <Code> and
// the <ApiList> tables are inlined, live demos and imports are dropped. A
// component this doesn't know fails the build, so handle it here.
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import * as buttonApi from "../components/button-api";
import { sidebar } from "../sidebar";

// Files that MDX pages import with ?raw, keyed by file name
const rawFiles = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>("../examples/*", {
      query: "?raw",
      import: "default",
      eager: true,
    }),
  ).map(([path, text]) => [path.split("/").pop(), text]),
);

const apiList = (entries: buttonApi.ApiEntry[]) =>
  entries
    .map(({ name, type, default: value, description, gis }) =>
      [
        `- \`${name}\``,
        type.length ? `: \`${type.join(" | ")}\`` : "",
        value ? `, default \`${value}\`` : "",
        `. ${description}`,
        gis ? ` [Google reference](${buttonApi.GIS_REFERENCE}#${gis})` : "",
      ].join(""),
    )
    .join("\n");

function mdxToMarkdown(page: CollectionEntry<"docs">): string {
  const imports = new Map<string, string>(); // local name -> ?raw file name
  const out: string[] = [];
  let fence = ""; // marker of the open code block
  let statement = ""; // import statement spanning several lines
  function fail(line: string): never {
    throw new Error(`llms-full.txt: can't convert "${line}" in ${page.id}`);
  }

  for (const line of (page.body ?? "").split("\n")) {
    const trimmed = line.trim();
    const marker = /^(`{3,}|~{3,})/.exec(trimmed)?.[1];
    if (fence) {
      if (marker?.startsWith(fence) && trimmed === marker) fence = "";
      out.push(line);
      continue;
    }
    if (marker) {
      fence = marker;
      out.push(line);
      continue;
    }
    if (statement || line.startsWith("import ")) {
      statement += `${line} `;
      if (!/["'];?$/.test(trimmed)) continue;
      const raw = /^import (\w+) from "[^"]*\/([^/"]+)\?raw"/.exec(statement);
      if (raw) imports.set(raw[1], raw[2]);
      statement = "";
      continue;
    }
    const tag = /^<\/?([A-Za-z]\w*)(.*?)\/?>$/.exec(trimmed);
    if (!tag) {
      out.push(line);
      continue;
    }
    const [, name, attrs] = tag;
    const attr = (key: string) =>
      new RegExp(`\\b${key}=(?:\\{(\\w+)\\}|"([^"]*)")`)
        .exec(attrs)
        ?.slice(1)
        .find(Boolean);

    if (name === "Code") {
      const text = rawFiles[imports.get(attr("code") ?? "") ?? ""];
      if (text === undefined) fail(trimmed);
      const title = attr("title") ? ` title="${attr("title")}"` : "";
      out.push(`\`\`\`${attr("lang") ?? ""}${title}`, text.trimEnd(), "```");
    } else if (name === "ApiList") {
      const entries = buttonApi[attr("entries") as keyof typeof buttonApi];
      if (!Array.isArray(entries)) fail(trimmed);
      out.push(apiList(entries));
    } else if (name === "TabItem" && attr("label")) {
      out.push(`${attr("label")}:`);
    } else if (
      !/\bclient:/.test(attrs) && // live demos
      !["Tabs", "TabItem", "Steps", "div"].includes(name) // layout only
    ) {
      fail(trimmed);
    }
  }
  return out.join("\n");
}

export const GET: APIRoute = async ({ site }) => {
  const docs = new Map((await getCollection("docs")).map((d) => [d.id, d]));
  const pages = sidebar.flatMap(({ items }) =>
    items.map(({ slug }) => {
      const page = docs.get(slug)!;
      const url = new URL(`${slug}/`, site).href;
      const body = page.filePath?.endsWith(".mdx")
        ? mdxToMarkdown(page)
        : (page.body ?? "");
      return [
        `# ${page.data.title}`,
        `Source: ${url}`,
        `> ${page.data.description}`,
        body
          .trim()
          // Site links (/guide/..., #anchor) become absolute URLs
          .replace(
            /\]\(([/#][^)]*)\)/g,
            (_, path) => `](${new URL(path, url)})`,
          ),
      ].join("\n\n");
    }),
  );
  const text = [
    "# Vue3 Google Sign-in documentation",
    `> Every page of the vue3-google-signin docs as Markdown. The index is at ${new URL("llms.txt", site)}.`,
    pages.join("\n\n---\n\n"),
  ].join("\n\n");
  return new Response(`${text.replace(/\n{3,}/g, "\n\n")}\n`);
};
