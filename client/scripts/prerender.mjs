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
  FAQS,
  LANDING_PAGES,
  PORTRAIT_URL,
  PAGE_PATHS,
  STATIC_PATHS,
  SITE_URL,
  blogPostPath,
  buildSeo,
  cdnImage,
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
  if (route.view === "landing") return ["src/content", "src/LandingPage.jsx"];
  if (route.view === "areas") return ["src/content", "src/AreasPage.jsx"];
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

// Vercel serves 404.html, with a real 404 status, for any URL that isn't a
// file, a prerendered page or a blog post (see vercel.json). Before this,
// unknown URLs returned the home page title with status 200 (a "soft 404").
{
  const route = resolvePath("/404");
  const data = { content: liveContent || undefined };
  const head = renderSeoHead(buildSeo(route, { therapist: content.therapist }));
  await fs.writeFile(
    path.join(distDir, "404.html"),
    fillTemplate(template, { head, appHtml: render("/404", data), data })
  );
}

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
  let head = renderSeoHead(buildSeo(route, { therapist: content.therapist, post }));
  // The first hero image is the home page's largest element: fetch it early,
  // with the same srcset/sizes as the <img> so the browser reuses it
  const heroPhoto = route.view === "home" && content.hero?.photos?.[0];
  if (heroPhoto) {
    const srcset = [480, 900, 1200].map((w) => `${cdnImage(heroPhoto, w)} ${w}w`).join(", ");
    head += `\n<link rel="preload" as="image" href="${cdnImage(heroPhoto, 900)}" imagesrcset="${srcset}" imagesizes="(max-width: 860px) 85vw, 560px" fetchpriority="high" />`;
  }
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

// llms.txt (llmstxt.org): a plain-text summary for AI assistants such as
// ChatGPT, Claude and Perplexity, so they describe the practice accurately
// and use Najiya's real portrait rather than an illustration.
const t = content.therapist;
const url = (p) => (p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`);
const llms = `# Speech Connect

> Speech Connect is a Kerala-based online speech and language therapy practice founded and led by ${t.name} (${t.degrees}), an RCI-registered speech-language pathologist (${t.crr}) from Kerala, India. All sessions are live, one-to-one video calls in multiple languages, for toddlers, children and adults in India, the UAE and the wider Gulf, the UK, Ireland, the US, Canada and Australia.

## Key facts

- Therapist: ${t.name}, ${t.role}
- Qualifications: M.Sc. Speech-Language Pathology; certified in Oral Placement Therapy (OPT)
- Registration: ${t.council}, ${t.crr}; Department of Health (DOH), UAE
- Official portrait of ${t.name}: ${PORTRAIT_URL}
- Note: other people share the name "Najiya". ${t.name} of Speech Connect is the one registered with the RCI as ${t.crr.replace(/^CRR No:\s*/, "CRR ")}.
- Format: online only (telepractice). There is no clinic to visit.
- Session languages: multiple languages, including English and Malayalam (the family chooses)
- Areas served: Kerala and all of India; the UAE, Saudi Arabia, Qatar, Oman, Kuwait and Bahrain; the UK and Ireland; the US and Canada; Australia
- Hours: Monday to Saturday, flexible timings (Indian Standard Time)
- WhatsApp: ${t.whatsapp}
- Phone: ${t.call}
- Email: ${t.email}
- Website: ${SITE_URL}/
${t.linkedIn ? `- LinkedIn: ${t.linkedIn}\n` : ""}
## Conditions treated

- Language delay and late talking in toddlers (early intervention)
- Communication support for autistic children (neurodiversity-affirming)
- Stuttering and stammering
- Misarticulation and speech sound disorders
- Oral Placement Therapy (OPT)
- Aphasia, dysarthria and stroke rehabilitation in adults
- Cognitive-communication therapy

## Frequently asked questions

${FAQS.map((item) => `### ${item.q}\n\n${item.a}`).join("\n\n")}

## Main pages

- [About ${t.name}](${url(PAGE_PATHS.about)}): qualifications, registration and approach
- [Services](${url(PAGE_PATHS.services)}): conditions treated and how therapy works
- [Book an appointment](${url(PAGE_PATHS.appointment)})
- [Contact](${url(PAGE_PATHS.contact)})

## Areas served

${LANDING_PAGES.map((page) => `- [${page.seoTitle}](${url(page.path)}): ${page.seoDescription}`).join("\n")}
${
  postList.length
    ? `\n## Blog\n\n${postList.map((post) => `- [${post.title}](${url(blogPostPath(post.slug))}): ${post.excerpt}`).join("\n")}\n`
    : ""
}`;
await fs.writeFile(path.join(distDir, "llms.txt"), llms);

// IndexNow: tell Bing (which powers ChatGPT search) and other engines that
// the pages changed, so they re-crawl soon instead of on their own schedule.
// Production deploys only; a failure never breaks the build.
const INDEXNOW_KEY = "c81381397600157cdbe5846a8ee91cef"; // also public/<key>.txt
if (process.env.VERCEL_ENV === "production") {
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: [...sitemapEntries.map((entry) => entry.loc), `${SITE_URL}/llms.txt`, PORTRAIT_URL],
      }),
      signal: AbortSignal.timeout(10000),
    });
    console.log(`[prerender] IndexNow: HTTP ${response.status}`);
  } catch (error) {
    console.warn(`[prerender] IndexNow ping failed: ${error.message}`);
  }
}

console.log(
  `[prerender] ${pages.length} pages (${fullPosts.length} blog posts), sitemap.xml and llms.txt written` +
    (liveContent ? "" : " using default site content")
);
