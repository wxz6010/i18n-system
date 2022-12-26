import { Navigate, Outlet, redirect, useMatch } from "react-router-dom";

export default function () {
  const m = useMatch("/");
  // console.log(m)
  if (m) {
    return <Navigate to="/i18n/langue" />;
  }
  return <Outlet />;
}
