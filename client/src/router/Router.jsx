import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Home, Login, Register, Bookings, LandingPage, AdminHome, AdminBookings, AdminUsers, PublicCertificate, PublicCourse, PublicPost, AdminPostList, AdminPublicList, AdminStudentList } from '../scenes';
import { AdminLayout, UserLayout, PublicLayout } from '../layout'
import { ForceRedirect, ProtectedRoute } from '../components';
import { useVerifyTokenMutation } from '../slices/api/userApiSlice';
import { setLoggedIn, setLogout, setRole } from '../slices/state/authSlices';
import StudentLayout from '../layout/StudentLayout';

const Router = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [tokenVerify, { data, isSuccess, isError }] = useVerifyTokenMutation();
    const { token, isLoggedIn, userRole } = useSelector((state) => state?.auth);

    const verifyToken = async () => {
        try {
            if (token) {
                await tokenVerify({ token });
                if (isSuccess) {
                    console.log('sucess')
                    let role = data?.data?.role;
                    console.log('role', role)
                    dispatch(setLoggedIn({ boolean: true }));
                    dispatch(setRole({ role }))
                    if (role) {
                        navigate(`/${role}`)
                    }
                }
                else if (isError) {
                    console.log('error')
                    navigate('/')
                }

            }
        } catch (error) {
            console.error('Error verifying token:', error);
            // dispatch(setLogout())
            // dispatch(setLoggedIn({ boolean: false }));
        }
    };


    useEffect(() => {
        verifyToken();
    }, [dispatch, token, tokenVerify, isLoggedIn]);


    const studentRoutes = [
        {
            path: "/student/student-home",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><Home /></ProtectedRoute>
        },
        {
            path: "/student/student-bookings",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><Bookings /></ProtectedRoute>
        }
    ];

    const adminRoutes = [
        {
            path: "/admin/admin-public-list",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><AdminPublicList /></ProtectedRoute>
        },
        {
            path: "/admin/admin-student-list",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><AdminStudentList /></ProtectedRoute>
        },
        {
            path: "/admin/admin-post-list",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><AdminPostList /></ProtectedRoute>
        }
    ];

    const publicRoutes = [
        {
            path: "/public/public-course",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><PublicCourse /></ProtectedRoute>
        },
        {
            path: "/public/public-certificate",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><PublicCertificate /></ProtectedRoute>
        },
        {
            path: "/public/public-post",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><PublicPost /></ProtectedRoute>
        }
    ];


    const element = useRoutes([
        {
            path: '/',
            // element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><LandingPage /></ForceRedirect>
            element: <LandingPage />
        },
        {
            path: "/login",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><Login /></ForceRedirect>
        },
        {
            path: "/register",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><Register /></ForceRedirect>
        },
        {
            path: "/admin",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><AdminLayout /></ProtectedRoute>,
            children: [...adminRoutes]
        },
        {
            path: "/student",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><StudentLayout /></ProtectedRoute>,
            children: [...studentRoutes]
        },
        {
            path: "/public",
            element: <ProtectedRoute isLoggedIn={isLoggedIn} role={userRole}><PublicLayout /></ProtectedRoute>,
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
