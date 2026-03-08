import React, { useEffect } from "react";

export default function MobileMenu({ open, items, onClose, onNavigate }) {
  useEffect(() => {
    document.body.classList.toggle("noScroll", open);
    return () => document.body.classList.remove("noScroll");
  }, [open]);

  return (
    <div className={`mobileMenu ${open ? "open" : ""}`} data-cy="mobile-menu" role="dialog" aria-modal="true">
      <div className="mobileMenuBackdrop" onClick={onClose} aria-hidden="true" />
      <div className="mobileMenuPanel">
        <div className="mobileMenuHead">
          <div className="mobileMenuTitle">Menu</div>
          <button data-cy="mobile-menu-close" className="iconBtn" type="button" onClick={onClose} aria-label="Zavrit">
            x
          </button>
        </div>

        <nav aria-label="Mobilni navigace" className="mobileMenuNav">
          {(items || []).map((item) => (
            <button
              key={item.id}
              data-cy={`mobile-nav-${item.sectionId}`}
              className="mobileNavLink"
              type="button"
              onClick={() => onNavigate(item.sectionId)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
