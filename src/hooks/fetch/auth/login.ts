import { useState } from "react";
import axios from "../config";
import cookies from "react-cookies";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
        const response = await axios.post("auth/login", {
            email,
            password,
        });

        const { object } = response.data;

        cookies.save("token", object, { path: "/", maxAge: 7 * 24 * 60 * 60 }); 
        setIsAuthenticated(true);

        return response.data; 
        } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred");
        setIsAuthenticated(false);
        return null;
        } finally {
        setLoading(false);
        }
    };

    const logout = () => {
        cookies.remove("token", { path: "/" });
        setIsAuthenticated(false);
    };

    return {
        loading,
        error,
        isAuthenticated,
        login,
        logout,
    };
};
