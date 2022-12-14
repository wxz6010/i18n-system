
  import React from "react";
  import { useRoutes } from "react-router-dom";
  // import Layouts from "../layouts";
  import About from "../pages/about";
  import Home from "../pages/Home";
  import Login from "../pages/Login";
  
  export default function () {
    const Layouts = React.lazy(() => import("../layouts"));
    return useRoutes([
      {
        path: "/",
        element: <Layouts />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "/about",
            element: <About />,
          },
        ],
      },
      { path: "/login", element: <Login /> },
    ]);
  }