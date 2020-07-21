import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
//import { createStore } from 'redux';
//import { Provider } from "react-redux";

//import reducers from "./modules";
import App from "./components/App";
import "./styles/main.scss";

//const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const root = document.querySelector("#root");
if (root.hasChildNodes()) {
  ReactDOM.hydrate(<App />, root);
} else {
  ReactDOM.render(<App />, root);
}

