import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import 'tailwindcss/tailwind.css';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import App from "./App.jsx";
import "./index.scss";
import { persistor, store } from "./redux/app/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
