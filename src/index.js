import { Toaster } from "react-hot-toast";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { I18nProvider } from "./context/i18n";
import { UserDataProvider } from "./context/userDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <UserDataProvider>
        <I18nProvider>
          <Toaster />
          <App />
        </I18nProvider>
      </UserDataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
