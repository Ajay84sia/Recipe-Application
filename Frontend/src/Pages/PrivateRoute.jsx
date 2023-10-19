import React from "react";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //   if (!isAuth) {
  //     return <Navigate to="/signin" />;
  //   }

  return children;
};

export default PrivateRoute;
