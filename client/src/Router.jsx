import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from "framer-motion";
import { useLocation, useRoutes } from "react-router-dom";
import { Home, Login, Register, Bookings, LandingPage, AdminHome, AdminBookings, AdminUsers } from '../scenes';
import { AdminLayout, StudentLayout, PublicLayout } from '../layout'
import { ForceRedirect, ProtectedRoute } from '../components';
import { useVerifyTokenMutation } from '../slices/api/userApiSlice';
import { setLoggedIn, setLogout, setRole } from '../slices/state/authSlices';

const Router = () => {

    const dispatch = useDispatch();

    const [tokenVerify, { data }] = useVerifyTokenMutation();
    const { token, isLoggedIn, userRole } = useSelector((state) => state?.auth);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                if (token) {
                    const res = await tokenVerify({ token });
                    let role = data?.data?.role;
                    dispatch(setLoggedIn({ boolean: true }));
                    dispatch(setRole({ role }))

                }
            } catch (error) {
                console.error('Error verifying token:', error);
                dispatch(setLogout())
                dispatch(setLoggedIn({ boolean: false }));
            }
        };

        verifyToken();
    }, [dispatch, token, tokenVerify]);

    const studentRoutes = [
        {
            path: "/student/home",
            element: <ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>
        },
        {
            path: "/student/bookings",
            element: <ProtectedRoute isLoggedIn={isLoggedIn}><Bookings /></ProtectedRoute>
        }
    ];

    const adminRoutes = [
        {
            path: "/admin/admin-home-view",
            element: <ProtectedRoute isLoggedIn={isLoggedIn}><AdminHome /></ProtectedRoute>
        },
        {
            path: "/admin/admin-bookings-view",
            element: <ProtectedRoute isLoggedIn={isLoggedIn}><AdminBookings /></ProtectedRoute>
        },
        {
            path: "/admin/admin-users-view",
            element: <ProtectedRoute isLoggedIn={isLoggedIn}><AdminUsers /></ProtectedRoute>
        }
    ];

    const publicRoutes = [
        {
            path: "/public/public-courses",
            element: <ProtectedRoute isLoggedIn={isLoggedIn}><AdminHome /></ProtectedRoute>
        },
        {
            path: "/public/public-certificate",
            element: <ProtectedRoute isLoggedIn={isLoggedIn}><AdminBookings /></ProtectedRoute>
        },
        {
            path: "/public/public-post",
            element: <ProtectedRoute isLoggedIn={isLoggedIn}><AdminUsers /></ProtectedRoute>
        }
    ];


    const element = useRoutes([
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: "/login",
            element: <ForceRedirect isLoggedIn={isLoggedIn}><Login /></ForceRedirect>
        },
        {
            path: "/register",
            element: <ForceRedirect isLoggedIn={isLoggedIn}><Register /></ForceRedirect>
        },
        {
            path: "/admin",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><AdminLayout /></ForceRedirect>,
            children: [...adminRoutes]
        },
        {
            path: "/user",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><StudentLayout /></ForceRedirect>,
            children: [...studentRoutes]
        },
        {
            path: "/public",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><PublicLayout /></ForceRedirect>,
            children: [...publicRoutes]
        },
    ]);

    const location = useLocation();
    if (!element) return null;

    return (
        <AnimatePresence mode="wait" initial={false}>
            {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    );
}

export default Router;
