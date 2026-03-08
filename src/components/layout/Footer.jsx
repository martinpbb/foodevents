import React from "react";
import site from "../../data/site.json";

export default function Footer() {
  const social = Array.isArray(site.social) ? site.social : [];

  return (
    <footer className="footer">
      <div className="container footerRow">
        <div className="muted">
          Copyright {new Date().getFullYear()} {site.brand?.name || "North Dock Events"}
        </div>
        <div className="footerLinks">
          {social.map((item) => (
            <a key={item.label} className="textLink" href={item.url} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
