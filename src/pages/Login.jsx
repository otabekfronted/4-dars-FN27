import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch(
                "https://strapi-store-server.onrender.com/api/auth/local",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        identifier: email, // Use 'identifier' for email in Strapi
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Login successful
                setMessage("Login successful!");
                navigate("/");
            } else {
                // Handle error
                setMessage(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <section className="h-screen grid place-items-center">
            <form
                onSubmit={handleLogin}
                className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
            >
                <h4 className="text-center text-3xl font-bold">Login</h4>

                {/* Email Input */}
                <div className="form-control">
                    <label htmlFor="identifier" className="label">
                        <span className="label-text capitalize">Email</span>
                    </label>
                    <input
                        type="email"
                        name="identifier"
                        className="input input-bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="form-control">
                    <label htmlFor="password" className="label">
                        <span className="label-text capitalize">Password</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="input input-bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Login Button */}
                <div className="mt-4">
                    <button type="submit" className="btn btn-primary btn-block">
                        Login
                    </button>
                </div>

                {/* Guest User Button */}
                <button type="button" className="btn btn-secondary btn-block">
                    Guest User
                </button>

                {/* Message Display */}
                {message && (
                    <p className="text-center text-red-500">{message}</p>
                )}

                {/* Link to Register */}
                <p className="text-center">
                    Not a member yet?
                    <a
                        className="ml-2 link link-hover link-primary capitalize"
                        href="/register"
                    >
                        Register
                    </a>
                </p>
            </form>
        </section>
    );
}

export default Login;
