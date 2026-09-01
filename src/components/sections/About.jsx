import React from "react";
import site from "../../data/site.json";
import Section from "../ui/Section.jsx";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll.js";

export default function About() {
    const { ref, revealed } = useRevealOnScroll({ threshold: 0.2 });

    const team = Array.isArray(site.team?.items) ? site.team.items : [];
    const steps = Array.isArray(site.about?.steps) ? site.about.steps : [];
    const body = Array.isArray(site.about?.body) ? site.about.body : [];

    return (
        <Section
            id="about"
            kicker={site.about?.kicker || "Kdo jsme"}
            title={site.about?.title || "Naše zázemí"}
        >
            <div
                ref={ref}
                className={`grid2 reveal ${revealed ? "isIn" : ""}`}
            >
                <div className="card">
                    <p className="lead">
                        {site.about?.lead || "Jsme event catering tým."}
                    </p>

                    <div className="stack">
                        {body.length ? (
                            body.map((paragraph, index) => (
                                <p key={index} className="muted">
                                    {paragraph}
                                </p>
                            ))
                        ) : (
                            <p className="muted">
                                Dodáváme kompletní street food servis.
                            </p>
                        )}
                    </div>
                </div>

                <div className="card subtle">
                    <h3 className="h3">
                        {site.about?.servicesTitle || "Co pro vás zajistíme"}
                    </h3>

                    <ol className="steps">
                        {steps.map((step, index) => (
                            <li key={`${step.title}-${index}`}>
                                <div className="stepIndex">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div>
                                    <div className="stepTitle">
                                        {step.title}
                                    </div>

                                    <div className="muted">
                                        {step.text}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {team.length ? (
                <div className="spacer24">
                    <h3 className="h3">
                        {site.about?.teamTitle || "Náš tým"}
                    </h3>

                    <div
                        className="teamGrid"
                        data-cy="team-grid"
                    >
                        {team.map((person) => (
                            <article
                                key={person.id}
                                data-cy="team-card"
                                className="teamCard"
                            >
                                <div className="teamPhotoWrap">
                                    <img
                                        className="teamPhoto"
                                        data-cy="team-image"
                                        src={person.image?.src}
                                        alt={
                                            person.image?.alt ||
                                            person.name
                                        }
                                        loading="lazy"
                                    />
                                </div>

                                <div className="teamMeta">
                                    <div className="teamName">
                                        {person.name}
                                    </div>

                                    <div className="muted">
                                        {person.role}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            ) : null}
        </Section>
    );
}