import React, { useMemo, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
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
          <span className="brandLogoShell">
            <img
              className="brandLogo"
              src="/images/logo.png"
              alt="North Dock Events"
            />
          </span>
        </Link>
        <div className="headerContact" aria-label="Contact options">
          <a
            className="contactIconLink whatsapp"
            href="https://wa.me/420722552500"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
          >
            <FaWhatsapp size={16} strokeWidth={2.2} />
          </a>

          <a className="contactNumber" href="tel:+420722552500"  aria-label="Call +420 722 552 500">
            +420 722 552 500
          </a>
        </div>

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
