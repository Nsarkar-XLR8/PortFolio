import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

const SITE_URL = "https://nsarkar-xlr8.github.io/PortFolio";

const routes = [
  {
    path: "about",
    title: "About Nayem Sarkar | Backend Architect & Software Engineer",
    description:
      "Learn about Nayem Sarkar, a Software Engineer and Backend Architect focused on Spring Boot, NestJS, distributed systems, microservices, Hibernate, Redis, and secure API design.",
    keywords:
      "Nayem Sarkar about, Nayem Sarkar skills, Nayem Sarkar experience, Backend Architect Bangladesh, Java Spring Boot developer, microservices architect",
    canonical: `${SITE_URL}/about`,
    heading: "About Nayem Sarkar — Backend Architect & Software Engineer",
    summary:
      "Background, production experience at Tyrand & ScaleUp Ads Agency, core competencies in Java, Spring Boot, NestJS, microservices, and distributed data systems.",
  },
  {
    path: "projects",
    title: "Projects by Nayem Sarkar | Java, Spring Boot, NestJS",
    description:
      "Explore backend engineering and full-stack projects by Nayem Sarkar with live deployments on Vercel & Render, GitHub source code, and microservices architecture.",
    keywords:
      "Nayem Sarkar projects, Nayem Sarkar GitHub, Java projects, Spring Boot projects, NestJS projects, backend developer portfolio, live web previews, microservices projects",
    canonical: `${SITE_URL}/projects`,
    heading: "Projects & Systems Engineered by Nayem Sarkar",
    summary:
      "Explore microservices, distributed architectures, live deployments, and open-source backend repositories.",
  },
  {
    path: "services",
    title: "Backend Services by Nayem Sarkar | Spring Boot, NestJS, APIs",
    description:
      "Backend engineering services by Nayem Sarkar: Java Spring Boot development, NestJS architecture, microservices, secure APIs, persistence optimization, and integrations.",
    keywords:
      "Nayem Sarkar services, backend development services, Spring Boot development, NestJS services, API architect, microservices consulting, Java backend services",
    canonical: `${SITE_URL}/services`,
    heading: "Backend Architecture & Development Services",
    summary:
      "Specialized services in Spring Boot backend engineering, NestJS microservices, database tuning, API security, and high-performance system design.",
  },
  {
    path: "service",
    title: "Backend Services by Nayem Sarkar | Spring Boot, NestJS, APIs",
    description:
      "Backend engineering services by Nayem Sarkar: Java Spring Boot development, NestJS architecture, microservices, secure APIs, persistence optimization, and integrations.",
    keywords:
      "Nayem Sarkar services, backend development services, Spring Boot development, NestJS services, API architect, microservices consulting, Java backend services",
    canonical: `${SITE_URL}/services`,
    heading: "Backend Architecture & Development Services",
    summary:
      "Specialized services in Spring Boot backend engineering, NestJS microservices, database tuning, API security, and high-performance system design.",
  },
  {
    path: "contact",
    title: "Contact Nayem Sarkar | Software Engineer & Backend Architect",
    description:
      "Contact Nayem Sarkar for backend engineering, Java Spring Boot, NestJS, microservices, secure APIs, and data architecture opportunities.",
    keywords:
      "contact Nayem Sarkar, hire Nayem Sarkar, Software Engineer Dhaka, backend developer contact, Spring Boot developer hire, NestJS engineer for hire",
    canonical: `${SITE_URL}/contact`,
    heading: "Contact Nayem Sarkar",
    summary:
      "Reach out for software engineering roles, backend consulting, microservices architecture, and technical collaborations.",
  },
];

function generateStaticRoutes() {
  const indexHtmlPath = path.join(distDir, "index.html");
  if (!fs.existsSync(indexHtmlPath)) {
    console.error("dist/index.html not found. Run vite build first.");
    process.exit(1);
  }

  const template = fs.readFileSync(indexHtmlPath, "utf-8");

  // Create 404.html SPA fallback
  const spa404Script = `
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages redirection script
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>`;

  const redirect404Html = template.replace(
    "</head>",
    `  <script type="text/javascript">
    // SPA 404 redirect handler for GitHub Pages
    var pathSegmentsToKeep = 1;
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>`
  );

  fs.writeFileSync(path.join(distDir, "404.html"), redirect404Html, "utf-8");
  console.log("✔ Created dist/404.html");

  // Inject SPA decoding script into dist/index.html if not already present
  if (!template.includes("Single Page Apps for GitHub Pages")) {
    const updatedIndex = template.replace("</head>", `${spa404Script}\n</head>`);
    fs.writeFileSync(indexHtmlPath, updatedIndex, "utf-8");
  }

  // Generate static HTML for each subroute
  for (const route of routes) {
    const routeDir = path.join(distDir, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    let routeHtml = template;

    // Update <title>
    routeHtml = routeHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${route.title}</title>`
    );

    // Update meta description
    routeHtml = routeHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // Update meta keywords
    routeHtml = routeHtml.replace(
      /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i,
      `<meta name="keywords" content="${route.keywords}" />`
    );

    // Update canonical link
    routeHtml = routeHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    );

    // Update OpenGraph title, description, url
    routeHtml = routeHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    );

    // Update Twitter title and description
    routeHtml = routeHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // Update noscript crawler content
    const noscriptContent = `
    <noscript>
      <header>
        <h1>${route.heading}</h1>
        <p>${route.summary}</p>
      </header>
      <nav>
        <ul>
          <li><a href="${SITE_URL}/">Home</a></li>
          <li><a href="${SITE_URL}/about">About</a></li>
          <li><a href="${SITE_URL}/projects">Projects</a></li>
          <li><a href="${SITE_URL}/services">Services</a></li>
          <li><a href="${SITE_URL}/contact">Contact</a></li>
        </ul>
      </nav>
      <main>
        <section>
          <h2>Overview</h2>
          <p>${route.description}</p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Email: nsarkar6251@gmail.com | GitHub: https://github.com/Nsarkar-XLR8 | LinkedIn: https://linkedin.com/in/nayem-sarkar</p>
        </section>
      </main>
    </noscript>`;

    routeHtml = routeHtml.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptContent.trim());

    fs.writeFileSync(path.join(routeDir, "index.html"), routeHtml, "utf-8");
    console.log(`✔ Created dist/${route.path}/index.html`);
  }

  console.log("All static SEO routes generated successfully!");
}

generateStaticRoutes();
