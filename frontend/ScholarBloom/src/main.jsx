import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "aos/dist/aos.css";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./ThemeContext"; // ✅ Import ThemeProvider


// Initialize AOS inside App.jsx (not here)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
