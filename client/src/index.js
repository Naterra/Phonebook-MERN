import React from "react";
import ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

// CSS/js
import "materialize-css/dist/css/materialize.min.css";
import "../node_modules/materialize-css/dist/js/materialize.js";
import "./css/style.css";

import App from "./components/app";
import reducers from "./reducers";

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(ReduxPromise)
        // other store enhancers if any
    )
);

if (process.env.NODE_ENV === "production") {
    console.warn(process.env, "PRODUCTION MODE");
} else {
    console.warn(process.env, "DEVELOPEMENT MODE");
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);