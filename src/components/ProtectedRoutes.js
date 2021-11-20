import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from 'universal-cookie';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get("data")
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;