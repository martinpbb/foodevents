const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const trackPage = (path, title = "") => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "virtual_page_view",
      page_path: path,
      page_title: title,
      page_location: `${window.location.origin}${path}`,
    });
  }

  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
      page_location: `${window.location.origin}${path}`,
      send_page_view: false,
    });
  }
};
