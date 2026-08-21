import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "./App.jsx";

import "./styles/theme.css";
import "./styles/globals.css";
import "./styles/components.css";

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
