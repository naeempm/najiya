import React from "react";
import { Blob, Icon } from "./ui.jsx";
import { LANDING_PAGES } from "./content/landingPages.js";
import { PAGE_PATHS, blogPostPath } from "./site.js";

export default function LandingPage({ page, therapist, posts, linkTo, whatsappLink }) {
  const otherAreas = LANDING_PAGES.filter((item) => item.id !== page.id);
  // Only link to posts that are actually published
  const related = (posts || []).filter((post) => page.relatedPosts.includes(post.slug));
  const [headingStart, headingEnd] = page.heading;

  return (
    <article className="page-section landing-page">
      <div className="section-wrap">
        <nav className="breadcrumbs reveal" aria-label="Breadcrumb">
          <a {...linkTo("/")}>Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{page.navLabel}</span>
        </nav>

        <header className="section-head landing-head reveal">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {page.eyebrow}
          </span>
          <h1 className="page-main-heading">
            {headingStart} <em>{headingEnd}</em>
          </h1>
          <p className="lead">{page.intro}</p>
          <div className="hero-cta-group">
            <a className="primary-btn" {...linkTo(PAGE_PATHS.appointment)}>
              <span>Book a consultation</span>
              <Icon name="arrowRight" size={18} className="btn-arrow" />
            </a>
            <a className="whatsapp-btn" href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </header>

        <div className="landing-layout">
          <div className="landing-body">
            {page.sections.map((section) => (
              <section className="landing-section reveal" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((text) => (
                  <p key={text.slice(0, 40)}>{text}</p>
                ))}
                {section.points && (
                  <ul>
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="landing-section reveal">
              <h2>Explore further</h2>
              <p>
                See the full list of conditions we treat on our{" "}
                <a {...linkTo(PAGE_PATHS.services)}>services page</a>, or read more{" "}
                <a {...linkTo(PAGE_PATHS.about)}>about {therapist.name}</a>.
              </p>
              <p className="landing-areas">
                <span>Other areas we serve:</span>
                {otherAreas.map((item) => (
                  <a key={item.id} className="area-chip" {...linkTo(item.path)}>
                    {item.navLabel}
                  </a>
                ))}
              </p>
            </section>
          </div>

          <aside className="landing-aside" aria-label="About your therapist">
            <div className="landing-card reveal">
              <span className="icon-badge small tint-0">
                <Icon name="award" size={18} />
              </span>
              <h2>{therapist.name}</h2>
              <p className="landing-card-role">
                {therapist.degrees} · {therapist.role}
              </p>
              <ul className="landing-card-facts">
                <li>
                  <Icon name="check" size={16} /> {therapist.council}
                </li>
                <li>
                  <Icon name="check" size={16} /> {therapist.crr}
                </li>
                <li>
                  <Icon name="video" size={16} /> Live online sessions in English
                </li>
                <li>
                  <Icon name="clock" size={16} /> Monday to Saturday, flexible timings
                </li>
              </ul>
              <a className="primary-btn" {...linkTo(PAGE_PATHS.appointment)}>
                Book a consultation
              </a>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section-wrap landing-related" aria-labelledby="related-title">
          <h2 className="section-title reveal" id="related-title">
            Helpful <em>reading</em>
          </h2>
          <div className="blog-grid">
            {related.map((post) => (
              <a key={post.slug} className="blog-card reveal" {...linkTo(blogPostPath(post.slug))}>
                {post.category && <span className="blog-card-category">{post.category}</span>}
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="blog-card-more">
                  Read article <Icon name="arrowRight" size={16} />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="faq-section" aria-labelledby="landing-faq-title">
        <div className="section-wrap faq-grid">
          <div className="section-head faq-head reveal">
            <span className="eyebrow">Common questions</span>
            <h2 className="section-title" id="landing-faq-title">
              Questions from <em>families</em>
            </h2>
            <p className="lead">
              Can't find your answer? Message us on WhatsApp and we will get back to you.
            </p>
          </div>
          <div className="faq-list">
            {page.faqs.map((item, idx) => (
              <details className="faq-item reveal" key={item.q} open={idx === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <Icon name="chevronDown" size={18} />
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap cta-section">
        <div className="cta-band reveal">
          <Blob variant={2} className="cta-blob" />
          <div className="cta-band-text">
            <h2>
              Ready to take the <em>first step?</em>
            </h2>
            <p>
              Tell us a little about your concerns and we will arrange an initial
              consultation at a time that suits you.
            </p>
          </div>
          <div className="cta-band-actions">
            <a className="primary-btn" {...linkTo(PAGE_PATHS.appointment)}>
              Book an appointment
            </a>
            <a className="secondary-btn" href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
