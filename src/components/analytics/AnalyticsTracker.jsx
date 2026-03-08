import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPage } from "../../utils/analytics.js";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPage(location.pathname + location.hash);
  }, [location]);

  return null;
}
