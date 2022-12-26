import Layouts from "@/layouts";
import Wapper from "@/layouts/wapper";
import Langue from "@/pages/i18n/langue";
import Module from "@/pages/i18n/module";
import Outfile from "@/pages/i18n/outfile";
import Terms from "@/pages/i18n/terms";
import Login from "@/pages/user/login";

import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// const Langue = lazy(() => import("@/pages/i18n/langue"));
// const Module = lazy(() => import("@/pages/i18n/module"));
// const Terms = lazy(() => import("@/pages/i18n/terms"));
// const Login = lazy(() => import("@/pages/user/login"));

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Wapper />,
    children: [
      {
        path: "/i18n",
        element: <Layouts />,
        children: [
          {
            path: "/i18n/langue",
            element: <Langue />,
          },
          {
            path: "/i18n/moudle",
            element: <Module />,
          },
          {
            path: "/i18n/terms",
            element: <Terms />,
          },
          {
            path: "/i18n/outsetting",
            element: <Outfile />,
          },
        ],
      },
      {
        path: "/user/login",
        element: <Login />,
      },
    ],
  },
];

// export default function () {
//   return useRoutes([
//     {
//       path: "/",
//       element: lazyLoad("@/layout"),
//       children: [
//         { index: true, element: <Home /> },
//         {
//           path: "/about",
//           element: <About />,
//         },
//       ],
//     },
//     { path: "/login", element: <Login /> },
//   ]);
// }
export default routes;
