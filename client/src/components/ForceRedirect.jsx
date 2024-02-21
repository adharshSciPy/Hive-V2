import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useVerifyTokenMutation } from "../slices/api/userApiSlice";
import { setLoggedIn, setRole } from "../slices/state/authSlices";


const ForceRedirect = ({ isLoggedIn, role, children }) => {

  const [routePath, setRoutePath] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [tokenVerify, { isSuccess, data }] = useVerifyTokenMutation();
  const token = JSON.parse(localStorage.getItem('token'))

  const verifyToken = async () => {
    try {
      if (token) {
        await tokenVerify({ token });
        let role = data?.data?.role;
        if (isSuccess) {
          dispatch(setLoggedIn({ boolean: true }));
          dispatch(setRole({ role }))
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
  }, [token, isSuccess]);

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
    return <Navigate to={`/${routePath}`} />
  }

  return children;
};

export default ForceRedirect;