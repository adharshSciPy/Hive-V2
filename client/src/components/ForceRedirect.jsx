import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useVerifyTokenMutation } from "../slices/api/userApiSlice";
import { setLoggedIn } from "../slices/state/authSlices";


const ForceRedirect = ({ isLoggedIn, role, children }) => {

  const [routePath, setRoutePath] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [tokenVerify, { data }] = useVerifyTokenMutation();
  const token = localStorage.getItem('token')

  const verifyToken = async () => {
    try {
      if (token) {
        await tokenVerify({ token });
          let role = data?.data?.role;
          dispatch(setLoggedIn({ boolean: true }));
          dispatch(setRole({ role }))
          if (role) {
            navigate(`/${role}`)
          }
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      dispatch(setLogout())
      dispatch(setLoggedIn({ boolean: false }));
    }
  };


  useEffect(() => {
    verifyToken();
  }, []);

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

  if (isLoggedIn && role !== null || undefined) {
    return <Navigate to={`/${routePath}`} replace />
  }

  return children;
};

export default ForceRedirect;