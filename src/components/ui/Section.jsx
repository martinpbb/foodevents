import React from "react";
import Container from "./Container.jsx";

export default function Section({ id, title, kicker, children, className = "", style = undefined }) {
  return (
    <section id={id} data-cy={id ? `section-${id}` : undefined} className={`section ${className}`.trim()} style={style}>
      <Container>
        <div className="sectionHead">
          {kicker ? <div data-cy={id ? `section-${id}-kicker` : undefined} className="eyebrow">{kicker}</div> : null}
          {title ? <h2 data-cy={id ? `section-${id}-title` : undefined} className="h2">{title}</h2> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
