import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import AnalyticsTracker from "../analytics/AnalyticsTracker.jsx";

export default function MainLayout() {
  return (
    <div className="appShell">
      <AnalyticsTracker />
      <a className="skipLink" href="#main">Preskocit na obsah</a>
      <Header />
      <main id="main" data-cy="main-content" className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
