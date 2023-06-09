import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </BrowserRouter>
  </React.StrictMode>
);
