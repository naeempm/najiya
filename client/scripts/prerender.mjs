// Writes a fully rendered HTML file for every page, so search engines get
// the text, title, meta tags and JSON-LD without running JavaScript.
// Runs after `vite build` and `vite build --ssr` (see package.json).
//
// Blog posts and admin-edited content are fetched from the API at build time.
// Set PRERENDER_API_URL to point at a different API (defaults to VITE_API_URL,
// then the production API). If the API can't be reached, the build still
// succeeds with the default content and no blog posts.
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const {
  STATIC_PATHS,
  SITE_URL,
  blogPostPath,
  buildSeo,
  render,
  renderSeoHead,
  resolvePath,
  siteContent,
} = await import(pathToFileURL(ssrEntry).href);

function apiBase() {
  const url = (process.env.PRERENDER_API_URL || process.env.VITE_API_URL || "https://najiya.vercel.app").replace(/\/$/, "");
  return url.endsWith("/api") ? url : `${url}/api`;
}

async function fetchJson(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn(`[prerender] Could not fetch ${url}: ${error.message}`);
    return null;
  }
}

// Last commit date of the files behind a page, for the sitemap's <lastmod>.
// Returns null when git history isn't available (the tag is then omitted).
function lastCommitDate(files) {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return date || null;
  } catch {
    return null;
  }
}

function sourceFilesFor(route) {
  if (route.view === "landing") return ["src/content/landingPages.js", "src/LandingPage.jsx"];
  if (route.view === "privacy" || route.view === "terms") return ["src/legal.jsx"];
  if (route.view === "blog") return ["src/blog.jsx"];
  return ["src/App.jsx", "src/content"];
}

function embedJson(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function fillTemplate(template, { head, appHtml, data }) {
  const start = template.indexOf("<!--seo:start-->");
  const end = template.indexOf("<!--seo:end-->");
  if (start === -1 || end === -1) throw new Error("index.html is missing the <!--seo:start/end--> markers");

  let html = template.slice(0, start) + head + template.slice(end + "<!--seo:end-->".length);
  const dataScript = data ? `<script>window.__PRERENDER_DATA__=${embedJson(data)}</script>` : "";
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>${dataScript}`);
  return html;
}

async function writePage(urlPath, html) {
  const file =
    urlPath === "/" ? path.join(distDir, "index.html") : path.join(distDir, urlPath.slice(1), "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
}

const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");
const api = apiBase();

const liveContent = await fetchJson(`${api}/content`);
const content = siteContent(liveContent);
const fullPosts = (await fetchJson(`${api}/blog?include=content`)) || [];
// Lists embedded in pages don't need each article's full text
const postList = fullPosts.map(({ content: _text, ...meta }) => meta);

// Fallback for URLs that aren't prerendered (e.g. a post published since the
// last build). It renders client-side, so it carries no page-specific tags.
await fs.writeFile(path.join(distDir, "app-shell.html"), template);

const pages = [
  ...STATIC_PATHS.map((urlPath) => ({ urlPath })),
  ...fullPosts.map((post) => ({ urlPath: blogPostPath(post.slug), post })),
];

const sitemapEntries = [];

for (const { urlPath, post } of pages) {
  const route = resolvePath(urlPath);
  const needsPosts = ["blog", "landing", "post"].includes(route.view);
  const data = {
    content: liveContent || undefined,
    posts: needsPosts ? postList : undefined,
    post: post || undefined,
  };

  const appHtml = render(urlPath, data);
  const head = renderSeoHead(buildSeo(route, { therapist: content.therapist, post }));
  await writePage(urlPath, fillTemplate(template, { head, appHtml, data }));

  const lastmod = post
    ? (post.updatedAt || post.publishedAt || "").slice(0, 10)
    : lastCommitDate(sourceFilesFor(route));
  sitemapEntries.push({ loc: urlPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${urlPath}`, lastmod });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    ({ loc, lastmod }) =>
      `  <url>\n    <loc>${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}  </url>`
  )
  .join("\n")}
</urlset>
`;
await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap);

console.log(
  `[prerender] ${pages.length} pages (${fullPosts.length} blog posts) and sitemap.xml written` +
    (liveContent ? "" : " using default site content")
);
