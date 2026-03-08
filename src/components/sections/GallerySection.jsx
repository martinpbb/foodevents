import React, { useMemo, useState } from "react";
import Section from "../ui/Section.jsx";
import galleryData from "../../data/gallery.json";
import Modal from "../ui/Modal.jsx";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll.js";

function toCySlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function GallerySection() {
  const { ref, revealed } = useRevealOnScroll({ threshold: 0.15 });
  const [activeItem, setActiveItem] = useState(null);

  const items = useMemo(
    () => (Array.isArray(galleryData.items) ? galleryData.items : []),
    []
  );
  const categories = useMemo(() => ["Vse", ...new Set(items.map((item) => item.category))], [items]);
  const [activeCategory, setActiveCategory] = useState("Vse");

  const filteredItems = useMemo(() => {
    if (activeCategory === "Vse") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <Section id="photos" kicker="Fotky" title="Momentky z akci a priprav">
      <div ref={ref} className={`reveal ${revealed ? "isIn" : ""}`}>
        <div className="filters" role="tablist" aria-label="Filtr galerie">
          {categories.map((category) => (
            <button
              key={category}
              data-cy={`gallery-filter-${toCySlug(category)}`}
              type="button"
              className={`chip ${category === activeCategory ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={category === activeCategory}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="galleryGrid" data-cy="gallery-grid">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              data-cy="gallery-item"
              className="galleryItem"
              type="button"
              onClick={() => setActiveItem(item)}
              aria-label={`Otevrít fotku: ${item.alt}`}
            >
              <img className="galleryImage" src={item.src} alt={item.alt} loading="lazy" />
              <span className="galleryMeta">{item.category}</span>
            </button>
          ))}
        </div>

        <Modal open={Boolean(activeItem)} title={activeItem?.alt || "Fotka"} onClose={() => setActiveItem(null)}>
          {activeItem ? (
            <figure className="modalFigure">
              <img src={activeItem.src} alt={activeItem.alt} />
              <figcaption className="muted">{activeItem.category}</figcaption>
            </figure>
          ) : null}
        </Modal>
      </div>
    </Section>
  );
}
