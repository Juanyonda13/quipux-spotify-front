import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        console.log(2);
        
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
