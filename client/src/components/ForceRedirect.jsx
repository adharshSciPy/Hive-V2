import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


const ForceRedirect = ({ isLoggedIn, role, children }) => {

  const [routePath, setRoutePath] = useState('')

  useEffect(() => {
    if (role === 'public') {
      setRoutePath('public')
    }
    else if (role === 'student') {
      setRoutePath('admin')
    }
    else if (role === 'admin') {
      setRoutePath('admin')
    }
    else {
      setRoutePath('')
    }
  }, [role])

  console.log('role', role)


  if (isLoggedIn && role !== null || undefined) {
    return <Navigate to={`/${routePath}`} replace />
  }

  return children;
};

export default ForceRedirect;