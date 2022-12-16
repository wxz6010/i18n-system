
  import React from "react";
  import { RouteObject } from "react-router-dom";
  const CiRm9led4m = React.lazy(()=>import("@/pages/about"))
const C0IJnxZLXNl = React.lazy(()=>import("@/pages/home"))
const CH2OlWe_MzB = React.lazy(()=>import("@/pages/moudles"))
const CZ9TQq0k51h = React.lazy(()=>import("@/pages/home/child/child"))
const CRh_djsrGPy = React.lazy(()=>import("@/pages/user/login"))
  const routes: Array<RouteObject> = [
    {
      path:"about",
      element: <CiRm9led4m/>,
    },
{
      path:"home",
      element: <C0IJnxZLXNl/>,
    },
{
      path:"moudles",
      element: <CH2OlWe_MzB/>,
    },
{
      path:"home/child/child",
      element: <CZ9TQq0k51h/>,
    },
{
      path:"user/login",
      element: <CRh_djsrGPy/>,
    }
  ];
  export default routes