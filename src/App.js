import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";

import reducer from "./reducer";
import { createStore } from "redux";

import NavBar from "./components/Nav";
import { Typography, Divider } from "@material-ui/core";

import AuthRoute from "./components/AuthRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";

import { appMiddleware } from "./middlewares/app";
import { apiMiddleware } from "./middlewares/core";
import MyAccount from "./pages/MyAccount";

import { apiRequest } from "../actions/api";
import { LOGIN } from "../actions/auth";


const createStoreWithMiddleware = applyMiddleware(
  appMiddleware,
  apiMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

const IndexPage = () => (
  <>
    <Typography variant="h3">Welcome to the App</Typography>
    <Divider style={{ marginTop: 10, marginBottom: 10 }} />
    <Typography variant="h6">Feel free to take a look around</Typography>
  </>
);

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <AuthRoute path="/home" render={HomePage} type="private" />
            <AuthRoute path="/login" type="guest">
              <LoginPage />
            </AuthRoute>
            <AuthRoute path="/my-account" type="private">
              <MyAccount />
            </AuthRoute>
            <Route path="/" render={IndexPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

// //middleware
// const SERVER_URL = `https://61m46.sse.codesandbox.io`;

// export const appMiddleware = () => next => action => {
//   next(action);
//   switch (action.type) {
//     case LOGIN: {
//       next(
//         apiRequest({
//           url: `${SERVER_URL}/login`,
//           method: "POST",
//           data: action.payload
//         })
//       );
//       break;
//     }
//     default:
//       break;
//   }
// };