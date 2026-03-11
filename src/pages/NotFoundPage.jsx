import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container pagePad" data-cy="not-found-page">
      <h1 className="h2">404</h1>
      <p className="muted">Tato stránka neexistuje.</p>
      <Link className="btn primary" to="/">
        Zpět na hlavní stránku
      </Link>
    </div>
  );
}
