export const trackPage = (path) => {
  if (window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_path: path,
    });
  }
};
