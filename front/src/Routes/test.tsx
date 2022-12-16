import React from "react";
// import { useRoutes } from "react-router-dom";
import { RouteObject } from "react-router-dom";
const CQdRxBUGoU = React.lazy(() => import("@/pages//"));
const CpA$VkUgbCM = React.lazy(() => import("@/pages/about"));
const CavM0rtuVJz = React.lazy(() => import("@/pages/home"));
const CqjruVsXG4n = React.lazy(() => import("@/pages/moudles"));
const CDHkcraDSJJ = React.lazy(() => import("@/pages/home/child/child"));
const CTuAzoGYliE = React.lazy(() => import("@/pages/user/login"));
const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <CQdRxBUGoU />,
  },
  {
    path: "about",
    element: <CpA$VkUgbCM />,
  },
  {
    path: "home",
    element: <CavM0rtuVJz />,
  },
  {
    path: "moudles",
    element: <CqjruVsXG4n />,
  },
  {
    path: "home/child/child",
    element: <CDHkcraDSJJ />,
  },
  {
    path: "user/login",
    element: <CTuAzoGYliE />,
  },
];
export default routes;
