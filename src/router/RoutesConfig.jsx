import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../components/auth/signIn";
import Dashboard from "../Dashboard";
import { useSelector } from "react-redux";

const RouteConfig = () => {
  const { status } = useSelector((state) => state.auth);
  const isAuth = status;
  console.log("status", status);

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/" element={isAuth ?  <Dashboard /> : <Navigate to="/login" /> }>
      {/* <Route path="/" element={<Dashboard /> }> */}
        {/* <Route path="student" element={<Students />} />
        <Route path="company" element={<Company />} />
        <Route path="interview" element={<Interview />} />
        <Route path="interviewResult" element={<InterviewResults />} /> */}
      </Route>
    </Routes>
  );
};

export default RouteConfig;
