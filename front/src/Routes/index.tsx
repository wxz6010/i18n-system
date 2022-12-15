import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const About = lazy(() => import("@/pages/about"));
const Login = lazy(() => import("@/pages/user/login"));
const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <About />,
  },
  {
    path: "/user/login",
    element: <Login />,
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
