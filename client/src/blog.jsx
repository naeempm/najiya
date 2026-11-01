import React from "react";
import { Icon } from "./ui.jsx";
import { Markdown, readingMinutes } from "./markdown.jsx";
import { PAGE_PATHS, blogPostPath, cdnImage } from "./site.js";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

function formatDate(value) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? dateFormat.format(date) : "";
}

function BlogCard({ post, linkTo, headingLevel: Heading = "h2" }) {
  return (
    <a className="blog-card reveal" {...linkTo(blogPostPath(post.slug))}>
      {post.coverImage && (
        <img
          className="blog-card-image"
          src={cdnImage(post.coverImage, 640)}
          alt=""
          loading="lazy"
        />
      )}
      {post.category && <span className="blog-card-category">{post.category}</span>}
      <Heading>{post.title}</Heading>
      <p>{post.excerpt}</p>
      <span className="blog-card-meta">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span className="blog-card-more">
          Read <Icon name="arrowRight" size={16} />
        </span>
      </span>
    </a>
  );
}

export function BlogIndex({ posts, linkTo }) {
  return (
    <section className="page-section blog-page">
      <div className="section-wrap">
        <div className="section-head centered reveal">
          <span className="eyebrow">Blog</span>
          <h1 className="page-main-heading">
            Guides for <em>parents and families</em>
          </h1>
          <p className="lead">
            Practical, evidence-based advice on speech and language development,
            from first words to stroke recovery.
          </p>
        </div>

        {posts === null ? (
          <p className="blog-status" role="status">
            Loading articles…
          </p>
        ) : posts.length === 0 ? (
          <p className="blog-status">New articles are on the way. Please check back soon.</p>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} linkTo={linkTo} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function relatedPosts(post, posts) {
  const others = (posts || []).filter((item) => item.slug !== post.slug);
  const sameCategory = others.filter((item) => item.category && item.category === post.category);
  const rest = others.filter((item) => !sameCategory.includes(item));
  return [...sameCategory, ...rest].slice(0, 3);
}

// post: undefined while loading, null if not found
export function BlogPost({ post, posts, therapist, linkTo, whatsappLink }) {
  if (post === undefined) {
    return (
      <section className="page-section blog-page">
        <p className="section-wrap blog-status" role="status">
          Loading article…
        </p>
      </section>
    );
  }

  if (post === null) {
    return (
      <section className="page-section blog-page">
        <div className="section-wrap section-head centered">
          <span className="eyebrow">Blog</span>
          <h1 className="page-main-heading">Article not found</h1>
          <p className="lead">This article may have moved or is no longer available.</p>
          <a className="primary-btn" {...linkTo(PAGE_PATHS.blog)}>
            See all articles
          </a>
        </div>
      </section>
    );
  }

  const published = formatDate(post.publishedAt);
  const updated = formatDate(post.updatedAt);
  const related = relatedPosts(post, posts);

  return (
    <article className="page-section blog-page">
      <div className="section-wrap blog-article">
        <nav className="breadcrumbs reveal" aria-label="Breadcrumb">
          <a {...linkTo("/")}>Home</a>
          <span aria-hidden="true">/</span>
          <a {...linkTo(PAGE_PATHS.blog)}>Blog</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.title}</span>
        </nav>

        <header className="blog-article-head reveal">
          {post.category && <span className="eyebrow">{post.category}</span>}
          <h1 className="page-main-heading">{post.title}</h1>
          {post.excerpt && <p className="lead">{post.excerpt}</p>}
          <p className="blog-byline">
            By{" "}
            <a {...linkTo(PAGE_PATHS.about)}>
              {therapist.name}, {therapist.degrees}
            </a>
            {published && (
              <>
                {" · "}
                <time dateTime={post.publishedAt}>{published}</time>
              </>
            )}
            {updated && updated !== published && (
              <>
                {" · Updated "}
                <time dateTime={post.updatedAt}>{updated}</time>
              </>
            )}
            {" · "}
            {readingMinutes(post.content)} min read
          </p>
        </header>

        {post.coverImage && (
          <img
            className="blog-cover reveal"
            src={cdnImage(post.coverImage, 1200)}
            alt={post.coverAlt || ""}
          />
        )}

        <div className="prose">
          <Markdown source={post.content} linkTo={linkTo} />
        </div>

        <aside className="blog-note">
          <p>
            This article is general information, not a diagnosis. Every child and
            adult is different; if you are worried, an assessment with a qualified
            speech-language pathologist is the best next step.
          </p>
        </aside>

        <div className="blog-author reveal">
          {therapist.photo && (
            <img src={cdnImage(therapist.photo, 160)} alt={therapist.name} className="blog-author-photo" />
          )}
          <div>
            <strong>{therapist.name}</strong>
            <span>
              {therapist.degrees} · {therapist.council} ({therapist.crr})
            </span>
            <p>
              Founder of Speech Connect, offering online speech therapy from Thrissur,
              Kerala, for families across India and abroad.
            </p>
          </div>
        </div>

        <div className="blog-cta reveal">
          <h2>Worried about speech or language?</h2>
          <p>Book an online consultation or send us a message on WhatsApp.</p>
          <div className="hero-cta-group">
            <a className="primary-btn" {...linkTo(PAGE_PATHS.appointment)}>
              Book a consultation
            </a>
            <a className="whatsapp-btn" href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section-wrap landing-related" aria-labelledby="more-title">
          <h2 className="section-title reveal" id="more-title">
            More <em>articles</em>
          </h2>
          <div className="blog-grid">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} linkTo={linkTo} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export function NotFound({ linkTo }) {
  return (
    <section className="page-section">
      <div className="section-wrap section-head centered">
        <span className="eyebrow">404</span>
        <h1 className="page-main-heading">
          Page <em>not found</em>
        </h1>
        <p className="lead">The page you're looking for doesn't exist or has moved.</p>
        <a className="primary-btn" {...linkTo("/")}>
          Back to home
        </a>
      </div>
    </section>
  );
}
