import React from "react";
import site from "../../data/site.json";
import Container from "../ui/Container.jsx";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll.js";

export default function Hero() {
  const { ref, revealed } = useRevealOnScroll({ threshold: 0.2 });

  const scrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - 82;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const stats = Array.isArray(site.hero?.stats) ? site.hero.stats : [];
  const bullets = Array.isArray(site.hero?.card?.bullets) ? site.hero.card.bullets : [];

  return (
    <section className="hero" data-cy="hero-section">
      <div className="heroBg" aria-hidden="true" />
      <Container>
        <div ref={ref} className={`heroInner reveal ${revealed ? "isIn" : ""}`}>
          <div className="heroCopy">
            <div className="eyebrow">{site.hero?.kicker || "Catering a event produkce"}</div>
            <h1 className="h1" data-cy="hero-headline">{site.hero?.title || "Street food pro akce vsech velikosti"}</h1>
            <p className="lead">{site.hero?.subtitle || "Kompletni realizace bez backendu a bez komplikaci."}</p>

            <div className="heroCtas">
              <button className="btn primary" data-cy="hero-cta-events" type="button" onClick={() => scrollTo("events")}>
                Prozkoumat akce
              </button>
              <button className="btn ghost" data-cy="hero-cta-contact" type="button" onClick={() => scrollTo("contact")}>
                Kontakt
              </button>
            </div>

            <div className="heroStats" aria-label="Rychla fakta">
              {stats.map((item) => (
                <div className="stat" key={item.label}>
                  <div className="statValue">{item.value}</div>
                  <div className="statLabel">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="heroVisual card">
            {site.hero?.image?.src ? (
              <img
                className="heroImage"
                data-cy="hero-image"
                src={site.hero.image.src}
                alt={site.hero.image.alt || "Hero image"}
                loading="eager"
              />
            ) : null}
            <div className="heroCard">
              <div className="heroCardTitle">{site.hero?.card?.title || "Co dodavame"}</div>
              <ul className="checkList">
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
