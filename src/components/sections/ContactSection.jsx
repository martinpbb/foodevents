import React, { useMemo, useState } from "react";
import Section from "../ui/Section.jsx";
import site from "../../data/site.json";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll.js";

function buildMailto({ to, subject, name, email, message }) {
  const lines = [`Jmeno: ${name || "-"}`, `Email: ${email || "-"}`, "", message || ""];
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export default function ContactSection() {
  const { ref, revealed } = useRevealOnScroll({ threshold: 0.15 });

  const contact = site.contact || {};
  const ui = site.ui || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactEmail = contact.email || "hello@northdock.events";
  const subject = contact.form?.subject || contact.mailSubject || "Poptavka";
  const phoneLabel = contact.phone || "+420 000 000 000";
  const phoneRaw = contact.phoneRaw || phoneLabel.replace(/\s+/g, "");
  const address = contact.address || "Adresa bude doplnena";
  const mapLink = contact.mapLink || "https://maps.google.com";
  const mapEmbedUrl =
    contact.mapEmbedUrl || "https://www.google.com/maps?q=Prague&output=embed";

  const mailtoUrl = useMemo(
    () =>
      buildMailto({
        to: contactEmail,
        subject,
        name,
        email,
        message,
      }),
    [contactEmail, subject, name, email, message]
  );

  const canSend =
    name.trim().length >= 2 && email.trim().includes("@") && message.trim().length >= 10;

  const sectionStyle = {
    "--contact-bg": `url("${ui.contactBackground || "/images/ui/contact-bg.jpg"}")`,
  };

  return (
    <Section
      id="contact"
      className="contactBg"
      style={sectionStyle}
      kicker="Kontakt"
      title="Ozvete se, pripravime navrh reseni"
    >
      <div ref={ref} data-cy="contact-layout" className={`grid2 reveal ${revealed ? "isIn" : ""}`}>
        <div className="card" data-cy="contact-info-card">
          <div className="h3">{site.brand?.name || "North Dock Events"}</div>
          <p className="muted">{contact.note || "Napiste nam termin, misto a pocet hostu."}</p>

          <div className="contactList">
            <a data-cy="contact-phone" className="contactItem" href={`tel:${phoneRaw}`}>
              Telefon: {phoneLabel}
            </a>
            <a data-cy="contact-email" className="contactItem" href={`mailto:${contactEmail}`}>
              Email: {contactEmail}
            </a>
            <div data-cy="contact-address" className="contactItem">Adresa: {address}</div>
          </div>

          <div className="card subtle">
            <div className="h3">Rychla zprava</div>
            <div className="formGrid" aria-label="Kontaktni formular">
              <input
                data-cy="contact-input-name"
                className="input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Jmeno"
                aria-label="Jmeno"
              />
              <input
                data-cy="contact-input-email"
                className="input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                aria-label="Email"
              />
              <textarea
                data-cy="contact-input-message"
                className="input"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Zprava (termin, misto, pocet hostu, rozpocet)"
                aria-label="Zprava"
              />

              <div className="row">
                <a
                  data-cy="contact-mailto-submit"
                  className={`btn primary ${!canSend ? "disabled" : ""}`}
                  href={canSend ? mailtoUrl : "#"}
                  aria-disabled={!canSend}
                  onClick={(event) => {
                    if (!canSend) event.preventDefault();
                  }}
                >
                  Odeslat pres email
                </a>
                <a className="btn ghost" href={mapLink} target="_blank" rel="noreferrer">
                  Otevrit mapu
                </a>
              </div>

              {!canSend ? (
                <div className="muted small">
                  Vyplnte jmeno, email a minimalne 10 znaku zpravy.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="card subtle mapCard" data-cy="contact-map-card">
          <iframe
            data-cy="contact-map-iframe"
            title="Mapa"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="muted small">Mapa je vlozena pres iframe, bez backendu.</div>
        </div>
      </div>
    </Section>
  );
}
