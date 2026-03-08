import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import EventsSection from "../components/sections/EventsSection.jsx";
import GallerySection from "../components/sections/GallerySection.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import PartnersSection from "../components/sections/PartnersSection.jsx";
import ContactSection from "../components/sections/ContactSection.jsx";

function smoothScrollToId(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const topOffset = 82;
  const top = element.getBoundingClientRect().top + window.scrollY - topOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function HomePage() {
  const location = useLocation();
  const handledLocationKeyRef = useRef(null);

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (!sectionId || handledLocationKeyRef.current === location.key) return;

    handledLocationKeyRef.current = location.key;
    window.setTimeout(() => smoothScrollToId(sectionId), 60);
  }, [location.key, location.state]);

  return (
    <>
      <Hero />
      <About />
      <EventsSection />
      <GallerySection />
      <ServicesSection />
      <PartnersSection />
      <ContactSection />
    </>
  );
}
