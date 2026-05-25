import { App as AntApp, ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";

import kmKH from "antd/locale/km_KH";

import AppRoutes from "./routes/AppRoutes";

import "./App.css";

function App() {
  return (
    <ConfigProvider
      locale={kmKH}
      form={{
        requiredMark: false,
      }}
      theme={{
        algorithm: theme.defaultAlgorithm,

        token: {
          colorPrimary: "#4f74e8",
          colorInfo: "#4f74e8",
          colorSuccess: "#41c98f",
          colorWarning: "#ffbe45",
          colorError: "#ff6b6b",

          colorText: "#20304d",
          colorTextSecondary: "#6f7f98",

          colorBgBase: "#eef3fb",
          colorBgContainer: "#ffffff",
          colorBorderSecondary: "#e6ecf5",

          borderRadius: 18,

          fontFamily:
            "'Kantumruy Pro', 'Noto Sans Khmer', 'Segoe UI', sans-serif",

          boxShadowSecondary:
            "0 20px 48px rgba(79, 116, 232, 0.12)",
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;