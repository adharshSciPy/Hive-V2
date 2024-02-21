import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isLoggedIn, role, children }) => {

  const location = useLocation();

  const pathName = JSON.stringify(location?.pathname)
  const isWorthyUser = pathName?.includes(role)

  console.log(isLoggedIn, role, 'values before protected')
  if (!isLoggedIn && !isWorthyUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;