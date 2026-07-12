const SITE_URL = "https://port-folio-blush-eta.vercel.app";
const DEFAULT_TITLE = "Nayem Sarkar | Software Engineer & Backend Architect";
const DEFAULT_DESCRIPTION =
  "Nayem Sarkar is a Software Engineer and Backend Architect from Dhaka, Bangladesh specializing in Java, Spring Boot, NestJS, microservices, secure APIs, and optimized data systems.";
const DEFAULT_KEYWORDS =
  "Nayem Sarkar, nayem sarkar, Nayem Sarkar portfolio, Software Engineer Nayem Sarkar, Backend Architect Nayem Sarkar, Spring Boot developer, NestJS engineer, Java backend engineer, Dhaka software engineer";
const OG_IMAGE = `${SITE_URL}/Nayem.jpeg`;

const setMeta = (selector, attribute, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const nameMatch = selector.match(/meta\[name="(.+)"\]/);
    const propertyMatch = selector.match(/meta\[property="(.+)"\]/);

    if (nameMatch) element.setAttribute("name", nameMatch[1]);
    if (propertyMatch) element.setAttribute("property", propertyMatch[1]);
    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
};

const setCanonical = (url) => {
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
};

export const updateSeo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  path = "/",
} = {}) => {
  const canonicalUrl = `${SITE_URL}${path}`;

  document.title = title;
  setCanonical(canonicalUrl);

  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[name="keywords"]', "content", keywords);
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:url"]', "content", canonicalUrl);
  setMeta('meta[property="og:image"]', "content", OG_IMAGE);
  setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);
  setMeta('meta[name="twitter:image"]', "content", OG_IMAGE);
};
