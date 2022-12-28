import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./routes/index";
import NiceModal from "@ebay/nice-modal-react";
import "./index.css";

function App() {
  return useRoutes(routes);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Suspense fallback={<div>...loading</div>}>
    <NiceModal.Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NiceModal.Provider>
  </React.Suspense>
);
