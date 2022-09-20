import React from 'react';
import Layout from './Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Projects from './components/Projects';
import ProjectViewer from './components/ProjectViewer';
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><div>Hello world!</div></Layout>,
    },
    { 
      path: "/projects",
      element: <Layout><Projects /></Layout>
    },
    {
      path: "/projects/:id",
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
