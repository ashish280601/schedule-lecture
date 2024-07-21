import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, roles }) => {
    const { status, role } = useSelector((state) => state.auth);
    const location = useLocation();

    // Check if user is authenticated
    if (!status) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Check if user role is authorized for the route
    if (roles && !roles.includes(role)) {
        return <Navigate to="/unauthorized" state={{ from: location }} />;
    }

    return element;
};

export default PrivateRoute;
