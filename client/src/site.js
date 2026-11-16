import { LANDING_PAGES } from "./content/landingPages.js";

export const SITE_URL = "https://www.speechconnect.in";

// Najiya's portrait, served from our own domain (not Cloudinary) at one
// fixed, descriptive URL. Every page, the share tags and the schema use this
// same file, so search engines and AI assistants (ChatGPT etc.) learn that
// this is her photo. To change it, replace the file under public/images.
export const PORTRAIT_PATH = "/images/najiya-p-m-speech-language-pathologist.jpg";
export const SITE_NAME = "Speech Connect";

// Suggestions for the country field; visitors can type any country
export const COUNTRY_OPTIONS = [
  "India",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Kuwait",
  "Bahrain",
  "United Kingdom",
  "Ireland",
  "United States",
  "Canada",
  "Australia",
];

const getApiUrl = () => {
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168."));
  if (isLocal) {
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl && (envUrl.includes("localhost") || envUrl.includes("127.0.0.1"))) {
      let clean = envUrl.replace(/\/$/, "");
      return clean.endsWith("/api") ? clean : `${clean}/api`;
    }
    return "http://127.0.0.1:5001/api";
  }
  let url = import.meta.env.VITE_API_URL || "https://najiya.vercel.app";
  url = url.replace(/\/$/, "");
  return url.endsWith("/api") ? url : `${url}/api`;
};

export const API_URL = getApiUrl();

// Cloudinary serves a resized, auto-format (WebP/AVIF) copy when a
// transformation sits before the version segment. Other URLs pass through.
export function cdnImage(url, width) {
  if (typeof url !== "string") return url;
  return url.replace(
    /(res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?=v\d+\/)/,
    `$1f_auto,q_auto,c_limit,w_${width}/`
  );
}

// Every page with its own URL. Landing pages and blog posts are added below.
export const PAGE_PATHS = {
  home: "/",
  about: "/about",
  services: "/services",
  appointment: "/appointment",
  contact: "/contact",
  blog: "/blog",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  areas: "/areas-we-serve",
};

// Old #section links (from the previous sitemap) map onto the new pages
const LEGACY_HASHES = {
  "#about": "/about",
  "#services": "/services",
  "#appointment": "/appointment",
  "#contact": "/contact",
  "#faq": "/",
};

export function legacyHashPath(hash) {
  return LEGACY_HASHES[hash] || null;
}

export function blogPostPath(slug) {
  return `/blog/${slug}`;
}

export function normalisePath(pathname = "/") {
  const clean = pathname.split(/[?#]/)[0].replace(/\/+$/, "");
  return clean || "/";
}

// Turns a URL path into what the app should show
export function resolvePath(pathname) {
  const path = normalisePath(pathname);

  const page = Object.entries(PAGE_PATHS).find(([, pagePath]) => pagePath === path);
  if (page) return { view: page[0], path };

  const landing = LANDING_PAGES.find((item) => item.path === path);
  if (landing) return { view: "landing", path, landing };

  const post = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (post) return { view: "post", path, slug: post[1] };

  return { view: "notFound", path };
}

// Paths known at build time, for prerendering and the sitemap
export const STATIC_PATHS = [
  ...Object.values(PAGE_PATHS),
  ...LANDING_PAGES.map((item) => item.path),
];
