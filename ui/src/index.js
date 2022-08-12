import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./routes/App";
import Modal from "./components/Modal";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./stores";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Modal />
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
