import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, roles }) => {
    const { status, role } = useSelector((state) => state.auth);
    const location = useLocation();

    // Check if the user is authenticated
    if (status !== 200) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Check if user role is authorized for the route
    if (roles && !roles.includes(role)) {
        // Redirect to unauthorized page if not authorized
        return <Navigate to="/unauthorized" state={{ from: location }} />;
    }

    // Render the element if authenticated and authorized
    return element;
};

export default PrivateRoute;
