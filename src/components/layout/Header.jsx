import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import site from "../../data/site.json";
import MobileMenu from "./MobileMenu.jsx";

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const topOffset = 82;
  const top = target.getBoundingClientRect().top + window.scrollY - topOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const items = useMemo(() => {
    return Array.isArray(site.navigation?.items) ? site.navigation.items : [];
  }, []);

  const onNavigateSection = (sectionId) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    scrollToSection(sectionId);
  };

  return (
    <header className="header" data-cy="header">
      <div className="container headerRow">
        <Link to="/" className="brand" data-cy="brand" aria-label={site.brand?.name || "North Dock Events"}>
          <span className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <div className="brandName">{site.brand?.name || "North Dock Events"}</div>
            <div className="brandTagline">{site.brand?.tagline || "Street food catering"}</div>
          </div>
        </Link>

        <nav className="navDesktop" data-cy="nav-desktop" aria-label="Hlavni navigace">
          {items.map((item) => (
            <button
              key={item.id}
              data-cy={`nav-${item.sectionId}`}
              className="navLink"
              type="button"
              onClick={() => onNavigateSection(item.sectionId)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          data-cy="mobile-menu-toggle"
          className="hamburger"
          type="button"
          aria-label={open ? "Zavrit menu" : "Otevrit menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <MobileMenu
        open={open}
        items={items}
        onClose={() => setOpen(false)}
        onNavigate={onNavigateSection}
      />
    </header>
  );
}
