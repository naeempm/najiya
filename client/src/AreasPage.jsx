import React from "react";
import { Icon } from "./ui.jsx";
import { AREA_REGIONS, LANDING_PAGES } from "./content/landingPages.js";

// /areas-we-serve: every country and region page, grouped by region
export default function AreasPage({ linkTo }) {
  return (
    <section className="page-section blog-page">
      <div className="section-wrap">
        <div className="section-head centered reveal">
          <span className="eyebrow">Areas we serve</span>
          <h1 className="page-main-heading">
            Online speech therapy, <em>wherever you live</em>
          </h1>
          <p className="lead">
            Live, one-to-one sessions in multiple languages for families
            across India and around the world. Choose your country to learn about
            timings and how sessions work where you are.
          </p>
        </div>

        {AREA_REGIONS.map((region) => {
          const pages = LANDING_PAGES.filter((page) => page.region === region);
          if (!pages.length) return null;
          return (
            <section className="areas-region" key={region} aria-labelledby={`region-${region}`}>
              <h2 className="section-title reveal" id={`region-${region}`}>
                {region}
              </h2>
              <div className="blog-grid">
                {pages.map((page) => (
                  <a key={page.id} className="blog-card reveal" {...linkTo(page.path)}>
                    <span className="blog-card-category">{page.eyebrow}</span>
                    <h3>{page.heading.join(" ")}</h3>
                    <p>{page.seoDescription}</p>
                    <span className="blog-card-more">
                      Learn more <Icon name="arrowRight" size={16} />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
