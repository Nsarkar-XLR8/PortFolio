import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Service from './pages/Service.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, 
      
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'service', element: <Service /> },
      { path: 'services', element: <Service /> },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: '*',
        element: (
          <div className="page-shell grid min-h-screen place-items-center px-4 text-center">
            <div className="hero-panel max-w-lg rounded-3xl px-8 py-10">
              <p className="section-kicker justify-center">404</p>
              <h1 className="mt-5 text-4xl font-black text-main">Page not found</h1>
              <p className="mt-4 text-muted">The page you are looking for does not exist.</p>
            </div>
          </div>
        )
      },
    ]
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
