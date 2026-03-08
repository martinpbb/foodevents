import React from "react";
import { Link } from "react-router-dom";
import Section from "../ui/Section.jsx";
import partnersData from "../../data/partners.json";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll.js";

export default function PartnersSection() {
  const { ref, revealed } = useRevealOnScroll({ threshold: 0.15 });
  const partners = Array.isArray(partnersData.items) ? partnersData.items : [];

  return (
    <Section id="partners" kicker="Spolupracujeme" title="Znacky a tymy, se kterymi tvorime akce">
      <div ref={ref} data-cy="partners-grid" className={`grid3 reveal ${revealed ? "isIn" : ""}`}>
        {partners.map((partner) => (
          <Link data-cy="partner-card" key={partner.id} to={`/partneri/${partner.slug}`} className="card partnerCard">
            <div className="partnerLogoWrap">
              {partner.logo?.src ? (
                <img src={partner.logo.src} alt={partner.logo.alt || partner.title} loading="lazy" />
              ) : (
                <div className="logoPlaceholder" aria-hidden="true" />
              )}
            </div>
            <div className="partnerTitle">{partner.title}</div>
            <div className="muted">{partner.summary}</div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
