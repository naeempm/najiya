// Server entry used only by scripts/prerender.mjs at build time
import React from "react";
import { renderToString } from "react-dom/server";
import App, { DEFAULT_CONTENT, mergeContent } from "./App.jsx";

export { buildSeo, renderSeoHead } from "./seo.js";
export { STATIC_PATHS, SITE_URL, blogPostPath, resolvePath } from "./site.js";

export function siteContent(liveContent) {
  return liveContent ? mergeContent(DEFAULT_CONTENT, liveContent) : DEFAULT_CONTENT;
}

export function render(path, initialData) {
  return renderToString(
    <React.StrictMode>
      <App initialPath={path} initialData={initialData} />
    </React.StrictMode>
  );
}
