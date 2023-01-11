import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./pages/redux";
import { Provider } from "react-redux";
import "toastr/build/toastr.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const ScrollToTop = () => {
//   window.scrollTo(0,0)
// };


root.render(
  <Provider store={store}>
    {/* <ScrollToTop /> */}
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
