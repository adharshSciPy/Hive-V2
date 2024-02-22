import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { StudentHome, StudentPost, StudentCertificate, Login, Register, StudentClass, LandingPage, PublicCertificate, PublicCourse, PublicPost, AdminPostList, AdminPublicList, AdminStudentList } from '../scenes';
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
                    let role = data?.data?.role;
                    dispatch(setLoggedIn({ boolean: true }));
                    dispatch(setRole({ role }))
                    if (role) {
                        navigate(`/${role}`)
                    }
                }
                else if (isError) {
                    console.log('error')
                    // navigate('/')
                }

            }
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    };

    useEffect(() => {
        verifyToken();
    }, [dispatch, token, tokenVerify, isLoggedIn]);


    const studentRoutes = [
        {
            path: "/student-home",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><StudentHome /></ForceRedirect>
        },
        {
            path: "/student-class",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><StudentClass /></ForceRedirect>
        },
        {
            path: "/student-post",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><StudentPost /></ForceRedirect>
        },
        {
            path: "/student-certificate",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><StudentCertificate /></ForceRedirect>
        }
    ];

    const adminRoutes = [
        {
            path: "/admin-public-list",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><AdminPublicList /></ForceRedirect>
        },
        {
            path: "/admin-student-list",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><AdminStudentList /></ForceRedirect>
        },
        {
            path: "/admin-post-list",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><AdminPostList /></ForceRedirect>
        }
    ];

    const publicRoutes = [
        {
            path: "public-course",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><PublicCourse /></ForceRedirect>
        },
        {
            path: "public-certificate",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><PublicCertificate /></ForceRedirect>
        },
        {
            path: "public-post",
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><PublicPost /></ForceRedirect>
        }
    ];


    const element = useRoutes([
        {
            path: '/',
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
            element: <ForceRedirect isLoggedIn={isLoggedIn} role={userRole}><AdminLayout /></ForceRedirect>,
            children: [adminRoutes]
        },
        {
            path: "/student",
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
