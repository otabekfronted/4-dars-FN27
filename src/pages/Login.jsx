import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();

        // localStorage'dan foydalanuvchi ma'lumotlarini olish
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (
            storedUser &&
            storedUser.email === email &&
            storedUser.password === password
        ) {
            toast.success("Login successful!");
            localStorage.setItem("token", "dummyToken"); // Tokenni saqlash
            navigate("/"); // Home sahifasiga yo'naltirish
        } else {
            toast.error("Invalid credentials");
        }
    }

    return (
        <section className="h-screen grid place-items-center">
            <form
                onSubmit={handleLogin}
                className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
            >
                <h4 className="text-center text-3xl font-bold">Login</h4>
                <div className="form-control">
                    <label htmlFor="email" className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="input input-bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password" className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="input input-bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                >
                    Login
                </button>
                <p className="text-center mt-4">
                    Not registered yet?
                    <a
                        href="/register"
                        className="link link-hover link-primary"
                    >
                        Register
                    </a>
                </p>
            </form>
        </section>
    );
}

export default Login;
