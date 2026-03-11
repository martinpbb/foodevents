import React from "react";
import { Link } from "react-router-dom";
import Section from "../ui/Section.jsx";
import servicesData from "../../data/services.json";
import site from "../../data/site.json";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll.js";

export default function ServicesSection() {
  const { ref, revealed } = useRevealOnScroll({ threshold: 0.15 });
  const services = Array.isArray(servicesData.items) ? servicesData.items : [];

  return (
    <Section
      id="services"
      kicker="Catering + půjčovna"
      title="Půjčovna party nábytku a gastro vybavení"
    >
      <div ref={ref} data-cy="services-grid" className={`grid3 reveal ${revealed ? "isIn" : ""}`}>
        {services.map((service) => (
          <article data-cy="service-card" className="card serviceCard" key={service.id}>
            {service.image?.src ? (
              <img
                className="eventCardMedia serviceCardMedia"
                src={service.image.src}
                alt={service.image.alt || service.title}
                loading="lazy"
              />
            ) : null}

            <div className="serviceTop">
              <div className="h3">{service.title}</div>
              <div className="pill">{service.priceNote || "Cena na dotaz"}</div>
            </div>

            <p className="muted">{service.summary}</p>

            {Array.isArray(service.specs) && service.specs.length ? (
              <ul className="bullets">
                {service.specs.slice(0, 4).map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            ) : null}

            <div className="row">
              <Link data-cy="service-detail-link" className="btn primary" to={`/sluzby/${service.slug}`}>
                Detail
              </Link>
              <a
                data-cy="service-mailto-link"
                className="btn ghost"
                href={service.mailto || `mailto:${site.contact?.email || "hello@northdock.events"}`}
              >
                Poptat
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
