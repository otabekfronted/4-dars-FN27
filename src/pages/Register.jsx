import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();

        // Ma'lumotlarni localStorage'ga saqlash
        localStorage.setItem("user", JSON.stringify({ email, password }));
        toast.success("Registered successfully!");

        // Registerdan keyin Login sahifasiga yo'naltirish
        navigate("/login");
    }

    return (
        <section className="h-screen grid place-items-center">
            <form
                onSubmit={handleRegister}
                className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
            >
                <h4 className="text-center text-3xl font-bold">Register</h4>
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
                    Register
                </button>
                <p className="text-center mt-4">
                    Already have an account?
                    <a href="/login" className="link link-hover link-primary">
                        Login
                    </a>
                </p>
            </form>
        </section>
    );
}

export default Register;
