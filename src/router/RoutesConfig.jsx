import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../components/auth/signIn";
import Dashboard from "../Dashboard";
import { useSelector } from "react-redux";
import Instructors from "../components/instructors/Instructors";
import Courses from "../components/courses/Courses";
import ScheduleLecture from "../components/lectures/ScheduleLectures";

const RouteConfig = () => {
    const { status } = useSelector((state) => state.auth);
    const isAuth = status;
    console.log("status", status);

    return (
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/admin" element={isAuth ? <Dashboard /> : <Navigate to="/login" />}>
                <Route path="instructor" element={<Instructors />} />
                 <Route path="courses" element={<Courses />} />
                 <Route path="assignLecture" element={<ScheduleLecture />} />
            </Route>
        </Routes>   
    );
};

export default RouteConfig;
