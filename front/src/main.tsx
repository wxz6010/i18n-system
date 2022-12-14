import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import About from "./pages/about";
// import Home from "./pages/Home";
import Routes from "./Routes";

// import  '@/auto-appoint';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Suspense fallback={<div>...loading</div>}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.Suspense>
);
