import {useAuth} from "../providers/auth-provider.jsx";
import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({roles = []}) {
    const {token, user} = useAuth();

    if (!token) {
        console.log("User is not authenticated. Redirecting to /login.");
        return <Navigate to="/auth/login" />;
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
        console.log("User is not authorized to access this route. Redirecting to /errors/forbidden.");
        return <Navigate to="/errors/forbidden" />;
    }

    return <Outlet />;
}

ProtectedRoute.propTypes = {
    roles: PropTypes.array
};