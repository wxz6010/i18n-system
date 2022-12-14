import fg from "fast-glob";
import fs from "fs";

export async function generateRoutes() {
  console.log("-----------");
  const files = await fg("**/*.{ts,tsx}", { dot: true, cwd: "src" });
  const templte = `
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
  }`;

  fs.writeFileSync(`${process.cwd()}/src/Routes/test.tsx`, templte);
  console.log(files);
}
