// frontend/src/index.js

import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css" // add this
import "./index.css"
import App from "./App/App.jsx"
import { store } from "./Redux/store";
import { Provider } from "react-redux";
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<Provider store={store}>
    <App defaultTODO={[]}/> 
</Provider>

, document.getElementById("root"))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
