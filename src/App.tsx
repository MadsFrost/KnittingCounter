import React from 'react';
import Layout from './Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Projects from './components/Projects';
import ProjectViewer from './components/ProjectViewer';
import Intro from './components/Intro';

function App() {

  const router = createBrowserRouter([
    {
      path: "/about",
      element: <Layout><Intro /></Layout>,
    },
    { 
      path: "/",
      element: <Layout><Projects /></Layout>
    },
    {
      path: "/:id",
      element: <Layout><ProjectViewer /></Layout>,
    }
  ]);

  return (
    <div className="w-full h-full bg-pink-300" id="appID">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
