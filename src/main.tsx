import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import dayjs from "dayjs";
import "dayjs/locale/km";

import "antd/dist/reset.css";

import "./index.css";

import App from "./App.tsx";

dayjs.locale("km");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);