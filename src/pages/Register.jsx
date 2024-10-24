import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Register user
            const registerResponse = await fetch(
                "https://strapi-store-server.onrender.com/api/auth/local/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, password }),
                }
            );

            const registerData = await registerResponse.json();

            if (registerResponse.ok) {
                // Now log in the user
                const loginResponse = await fetch(
                    "https://strapi-store-server.onrender.com/api/auth/local",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ identifier: email, password }),
                    }
                );

                const loginData = await loginResponse.json();

                if (loginResponse.ok) {
                    // Save the token
                    localStorage.setItem("token", loginData.jwt);
                    setMessage(
                        "Registration and login successful! Redirecting..."
                    );
                    navigate("/login"); // Redirect to the orders page or any other page
                } else {
                    setMessage(
                        loginData.message || "Login failed after registration."
                    );
                }
            } else {
                setMessage(
                    registerData.message ||
                        "Registration failed. Please try again."
                );
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <section className="h-screen grid place-items-center">
            <form
                onSubmit={handleRegister}
                className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
            >
                <h4 className="text-center text-3xl font-bold">Register</h4>

                {/* Username Input */}
                <div className="form-control">
                    <label htmlFor="username" className="label">
                        <span className="label-text capitalize">Username</span>
                    </label>
                    <input
                        type="text"
                        name="username"
                        className="input input-bordered"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="form-control">
                    <label htmlFor="email" className="label">
                        <span className="label-text capitalize">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
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

                {/* Register Button */}
                <div className="mt-4">
                    <button type="submit" className="btn btn-primary btn-block">
                        Register
                    </button>
                </div>

                {/* Message Display */}
                {message && (
                    <p className="text-center text-red-500">{message}</p>
                )}

                {/* Link to Login */}
                <p className="text-center">
                    Already a member?
                    <a
                        className="ml-2 link link-hover link-primary capitalize"
                        href="/login"
                    >
                        Login
                    </a>
                </p>
            </form>
        </section>
    );
}

export default Register;
