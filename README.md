# Nayem Sarkar | Portfolio

> **Software Engineer & Backend Architect**  
> Dynamic, high-performance developer portfolio showcasing backend architecture expertise, interactive 3D/animated visualizers, skill metrics, and project highlights.

🌐 **Live Website**: [https://nsarkar-xlr8.github.io/PortFolio/](https://nsarkar-xlr8.github.io/PortFolio/)

---

## 🚀 Key Features

- **Interactive Terminal Hero**: Live interactive CLI experience detailing background, roles, and core philosophies.
- **Solar System Tech Stack**: 3D interactive visualizer displaying core backend and frontend technologies in orbit around core architecture.
- **Skill Radar & Analytics**: Interactive charts powered by Recharts detailing proficiency across backend engineering, microservices, databases, and system design.
- **Project Showcase**: Filtering and detailed breakdowns of featured projects with direct live & GitHub repository links.
- **Contribution Heatmap**: Visual activity timeline tracking coding metrics and open-source engagement.
- **Automated CI/CD**: Automated deployment pipeline using GitHub Actions building Vite production assets to GitHub Pages.

---

## 🛠️ Built With

### Frontend & UI
- **Framework**: [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/) + Custom CSS Glassmorphism
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [Three.js](https://threejs.org/) / `@react-three/fiber`
- **Charts & Data Viz**: [Recharts](https://recharts.org/)
- **Routing**: `react-router-dom` (`createHashRouter` for GitHub Pages static compatibility)

### Backend & Core Specialization
- **Languages**: Java, TypeScript, JavaScript, SQL
- **Frameworks**: Spring Boot, NestJS, Node.js
- **Databases & Cache**: PostgreSQL, Redis, Hibernate ORM
- **Messaging & Infra**: RabbitMQ, Microservices Architecture, Docker, RESTful APIs

---

## 📂 Project Structure

```text
PortFolio/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow for automatic deployment
├── client/
│   ├── public/              # Static assets (favicons, profile image, manifest)
│   ├── src/
│   │   ├── components/      # Interactive components (SolarSystem, Radar, Terminal, etc.)
│   │   ├── pages/           # Main route pages (Home, About, Projects, Service, Contact)
│   │   ├── utils/           # SEO and utility helpers
│   │   ├── App.jsx          # Main application router
│   │   └── index.css        # Global CSS design system & custom utilities
│   ├── package.json
│   └── vite.config.js       # Vite build configuration (base path: /PortFolio/)
├── .gitignore               # Workspace Git ignore rules
└── README.md                # Repository documentation
```

---

## 💻 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nsarkar-XLR8/PortFolio.git
   cd PortFolio
   ```

2. **Install dependencies**:
   ```bash
   cd client
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready static bundle will be generated in `client/dist`.

---

## 🚢 Deployment

The project is deployed automatically to GitHub Pages on every push to the `main` branch via GitHub Actions (`.github/workflows/deploy.yml`).

To configure or update GitHub Pages settings:
1. Go to repository **Settings > Pages**.
2. Set **Source** to **GitHub Actions**.

---

## 📧 Contact & Connect

- **Email**: [nsarkar6251@gmail.com](mailto:nsarkar6251@gmail.com)
- **GitHub**: [@Nsarkar-XLR8](https://github.com/Nsarkar-XLR8)
- **LinkedIn**: [Nayem Sarkar](https://linkedin.com/in/nayem-sarkar)
- **Location**: Dhaka, Bangladesh
