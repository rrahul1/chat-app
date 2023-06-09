import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

function PrivateRoute({ children, ...routeProp }) {
  const profile = false;

  if (!profile) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProp}>{children}</Route>;
}

export default PrivateRoute;
