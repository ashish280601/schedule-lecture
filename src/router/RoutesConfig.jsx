// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import SignIn from "../components/auth/signIn";
// import Dashboard from "../Dashboard";
// import { useSelector } from "react-redux";
// import Instructors from "../components/instructors/Instructors";
// import Courses from "../components/courses/Courses";
// import ScheduleLecture from "../components/lectures/ScheduleLectures";

// const RouteConfig = () => {
//     const { status, role } = useSelector((state) => state.auth);
//     const isAuth = status;
//     const location = useLocation(); // Get current location

//     console.log("role", role);
//     console.log("status", status);

//     return (
//         <Routes>
//             <Route path="/login" element={<SignIn redirectTo={location.pathname} />} />
//             {
//                 role === "admin" ? (
//                     <Route path="/admin" element={isAuth ? <Dashboard /> : <Navigate to="/login" />}>
//                         <Route path="instructor" element={<Instructors />} />
//                         <Route path="courses" element={<Courses />} />
//                         <Route path="assignLecture" element={<ScheduleLecture />} />
//                     </Route>
//                 ) : (
//                     <Route path="/instructor" element={isAuth ? <Dashboard /> : <Navigate to="/login" />}>
//                         <Route path="assignLecture" element={<ScheduleLecture />} />
//                     </Route>
//                 )
//             }
//             <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//     );
// };

// export default RouteConfig;
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignIn from '../components/auth/signIn';
import Dashboard from '../Dashboard';
import Instructors from '../components/instructors/Instructors';
import Courses from '../components/courses/Courses';
import ScheduleLecture from '../components/lectures/ScheduleLectures';
import PrivateRoute from '../components/privateRoutes/PrivateRoutes';

const RouteConfig = () => {
    const location = useLocation(); // Get current location

    return (
        <Routes>
            <Route path="/login" element={<SignIn redirectTo={location.pathname} />} />
            <Route
                path="/admin/*"
                element={
                    <PrivateRoute
                        element={<Dashboard />}
                        roles={['admin']}
                    />
                }
            >
                <Route path="instructor" element={<PrivateRoute element={<Instructors />} roles={['admin']} />} />
                <Route path="courses" element={<PrivateRoute element={<Courses />} roles={['admin']} />} />
                <Route path="assignLecture" element={<PrivateRoute element={<ScheduleLecture />} roles={['admin']} />} />
            </Route>
            <Route
                path="/instructor/*"
                element={
                    <PrivateRoute
                        element={<Dashboard />}
                        roles={['user']}
                    />
                }
            >
                <Route path="assignLecture" element={<PrivateRoute element={<ScheduleLecture />} roles={['user']} />} />
            </Route>
            <Route path="/unauthorized" element={<h2>Unauthorized - You do not have permission to access this page.</h2>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default RouteConfig;

