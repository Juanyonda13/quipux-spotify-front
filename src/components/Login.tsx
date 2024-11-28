"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/fetch/auth/login";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export default function Login() {
    const { login, loading, error } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Instancia de useNavigate

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(email, password);

        if (result) {
            navigate("/dashboard"); // Redirige al dashboard
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center h-[80vh]">
            <Card className="w-full max-w-md border border-green-500 text-green-300">
                <CardHeader>
                    <CardTitle>Inicio de sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-start mb-2 text-sm">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col relative">
                            <label htmlFor="password" className="text-start mb-2 text-sm">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-green-500"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
