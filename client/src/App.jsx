import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Eagerly load the main shell/layout and home page (always needed)
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';

// 1. Create a simple, fast loading fallback component and define it before it is used by 'router'
const LoadingFallback = () => (
    <div 
        style={{ 
            minHeight: '80vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            fontSize: '24px',
            color: '#333',
        }}
    >
        Loading Content... 🚀
    </div>
);


// 2. Use lazy() for components that are not needed immediately
const LazyAbout = lazy(() => import('./pages/About.jsx'));
const LazyService = lazy(() => import('./pages/Service.jsx'));
const LazyContact = lazy(() => import('./pages/Contact.jsx'));
const LazyProjects = lazy(() => import('./pages/Projects.jsx'));


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, 
      
      // 3. Use the lazy-loaded components in the routes
      { 
        path: 'about', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyAbout />
          </Suspense>
        ) 
      },
      { 
        path: 'contact', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyContact />
          </Suspense>
        ) 
      },
      { 
        path: 'service', 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyService />
          </Suspense>
        ) 
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LazyProjects />
          </Suspense>
        )
      },
      { path: '*', element: <h1>404 Not Found</h1> },
    ]
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
