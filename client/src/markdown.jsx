// A small Markdown renderer for blog posts. It builds React elements rather
// than HTML strings, so raw HTML in a post is shown as text and can never run.
// Supports: ## headings, paragraphs, - and 1. lists, > quotes, **bold**,
// *italic* and [links](url).
import React from "react";

const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i;

function renderInline(text, linkTo, keyPrefix) {
  const out = [];
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;
    if (match[1]) {
      out.push(<strong key={key}>{match[1]}</strong>);
    } else if (match[2]) {
      out.push(<em key={key}>{match[2]}</em>);
    } else {
      const [, , , label, url] = match;
      if (!SAFE_URL.test(url)) {
        out.push(label);
      } else if (url.startsWith("/") && linkTo) {
        out.push(
          <a key={key} {...linkTo(url)}>
            {label}
          </a>
        );
      } else {
        out.push(
          <a key={key} href={url} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// Groups lines into blocks: headings, lists, quotes and paragraphs
function parseBlocks(markdown) {
  const blocks = [];
  let current = null;
  const flush = () => {
    if (current) blocks.push(current);
    current = null;
  };

  for (const rawLine of markdown.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    const bullet = line.match(/^[-*]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    const quote = line.match(/^>\s?(.*)$/);

    if (heading) {
      flush();
      // The post title is the page's only h1, so # and ## both become h2
      blocks.push({ type: heading[1].length <= 2 ? "h2" : "h3", text: heading[2] });
    } else if (bullet || numbered) {
      const type = bullet ? "ul" : "ol";
      if (current?.type !== type) {
        flush();
        current = { type, items: [] };
      }
      current.items.push((bullet || numbered)[1]);
    } else if (quote) {
      if (current?.type !== "quote") {
        flush();
        current = { type: "quote", lines: [] };
      }
      current.lines.push(quote[1]);
    } else if (current?.type === "p") {
      current.lines.push(line);
    } else {
      flush();
      current = { type: "p", lines: [line] };
    }
  }
  flush();
  return blocks;
}

export function Markdown({ source = "", linkTo }) {
  return parseBlocks(source).map((block, index) => {
    const key = `b${index}`;
    switch (block.type) {
      case "h2":
        return <h2 key={key}>{renderInline(block.text, linkTo, key)}</h2>;
      case "h3":
        return <h3 key={key}>{renderInline(block.text, linkTo, key)}</h3>;
      case "ul":
      case "ol": {
        const List = block.type;
        return (
          <List key={key}>
            {block.items.map((item, i) => (
              <li key={i}>{renderInline(item, linkTo, `${key}-${i}`)}</li>
            ))}
          </List>
        );
      }
      case "quote":
        return (
          <blockquote key={key}>
            <p>{renderInline(block.lines.join(" "), linkTo, key)}</p>
          </blockquote>
        );
      default:
        return <p key={key}>{renderInline(block.lines.join(" "), linkTo, key)}</p>;
    }
  });
}

// Rough reading time for the post header
export function readingMinutes(markdown = "") {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
