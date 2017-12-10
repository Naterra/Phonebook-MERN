import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./header";
import RecordsList from "../pages/RecordsList";
import EditContactPage from "../pages/EditContactPage";

export default class App extends Component {
  render() {
    // console.log(Route, "Route");
    // console.log(BrowserRouter, "BrowserRouter");

    return (
      <BrowserRouter basename={process.env.BASENAME}>
        <div className="container">
          <Header />
          <Route exact path="/" component={RecordsList} />
          <Route exact path="/edit_contact/:id" component={EditContactPage} />
          <Route path="/view_contact/:id" component={EditContactPage} />
        </div>
      </BrowserRouter>
    );
  }
}
