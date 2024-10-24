import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../App";
import { useContext, useEffect, useState } from "react";

function MainLayout({ children }) {
    const location = useLocation();
    const { cart } = useContext(CartContext);
    const [count, setCount] = useState(0);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userName, setUserName] = useState(localStorage.getItem("userName"));

    useEffect(() => {
        let sum = 0;
        cart.forEach((element) => {
            sum += Number(element.count);
        });
        setCount(sum);
    }, [cart]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setToken(null);
        setUserName("Guest"); // Reset to Guest
    };

    return (
        <div>
            <header className="bg-neutral">
                <div className="mx-auto container py-2 align-element flex justify-center sm:justify-end">
                    <div className="flex text-white gap-x-6 justify-center items-center">
                        {token ? (
                            <>
                                <span className="text-xs sm:text-sm">
                                    Hello, {userName}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="link link-hover text-xs sm:text-sm"
                                >
                                    Logout
                                </button>
                                <Link
                                    to="/orders"
                                    className={`link link-hover text-xs sm:text-sm ${
                                        location.pathname === "/orders"
                                            ? "font-bold"
                                            : ""
                                    }`}
                                >
                                    Orders
                                </Link>
                                <Link
                                    to="/checkout"
                                    className={`link link-hover text-xs sm:text-sm ${
                                        location.pathname === "/checkout"
                                            ? "font-bold"
                                            : ""
                                    }`}
                                >
                                    Checkout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`link link-hover text-xs sm:text-sm ${
                                        location.pathname === "/login"
                                            ? "font-bold"
                                            : ""
                                    }`}
                                >
                                    Sign in / Guest
                                </Link>
                                <Link
                                    to="/register"
                                    className={`link link-hover text-xs sm:text-sm ${
                                        location.pathname === "/register"
                                            ? "font-bold"
                                            : ""
                                    }`}
                                >
                                    Create Account
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <nav className="bg-base-200 px-10">
                    <div className="navbar align-element">
                        <div className="navbar-start">
                            <Link
                                className="hidden lg:flex btn btn-primary text-3xl items-center"
                                to="/"
                            >
                                C
                            </Link>
                            {/* Dropdown for mobile */}
                            <div className="dropdown">
                                <label
                                    tabIndex="0"
                                    className="btn btn-ghost lg:hidden"
                                >
                                    {/* Mobile menu icon */}
                                </label>
                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
                                >
                                    <li>
                                        <Link
                                            className={`capitalize ${
                                                location.pathname === "/"
                                                    ? "bg-black text-white"
                                                    : ""
                                            }`}
                                            to="/"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className={`capitalize ${
                                                location.pathname === "/about"
                                                    ? "bg-black text-white"
                                                    : ""
                                            }`}
                                            to="/about"
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className={`capitalize ${
                                                location.pathname ===
                                                "/products"
                                                    ? "bg-black text-white"
                                                    : ""
                                            }`}
                                            to="/products"
                                        >
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className={`capitalize ${
                                                location.pathname === "/cart"
                                                    ? "bg-black text-white"
                                                    : ""
                                            }`}
                                            to="/cart"
                                        >
                                            Cart
                                        </Link>
                                    </li>
                                    {token && (
                                        <>
                                            <li>
                                                <Link
                                                    className={`capitalize ${
                                                        location.pathname ===
                                                        "/orders"
                                                            ? "bg-black text-white"
                                                            : ""
                                                    }`}
                                                    to="/orders"
                                                >
                                                    Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className={`capitalize ${
                                                        location.pathname ===
                                                        "/checkout"
                                                            ? "bg-black text-white"
                                                            : ""
                                                    }`}
                                                    to="/checkout"
                                                >
                                                    Checkout
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal">
                                <li>
                                    <Link
                                        className={`capitalize ${
                                            location.pathname === "/"
                                                ? "bg-black text-white"
                                                : ""
                                        }`}
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`capitalize ${
                                            location.pathname === "/about"
                                                ? "bg-black text-white"
                                                : ""
                                        }`}
                                        to="/about"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`capitalize ${
                                            location.pathname === "/products"
                                                ? "bg-black text-white"
                                                : ""
                                        }`}
                                        to="/products"
                                    >
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`capitalize ${
                                            location.pathname === "/cart"
                                                ? "bg-black text-white"
                                                : ""
                                        }`}
                                        to="/cart"
                                    >
                                        Cart
                                    </Link>
                                </li>
                                {token && (
                                    <>
                                        <li>
                                            <Link
                                                className={`capitalize ${
                                                    location.pathname ===
                                                    "/orders"
                                                        ? "bg-black text-white"
                                                        : ""
                                                }`}
                                                to="/orders"
                                            >
                                                Orders
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className={`capitalize ${
                                                    location.pathname ===
                                                    "/checkout"
                                                        ? "bg-black text-white"
                                                        : ""
                                                }`}
                                                to="/checkout"
                                            >
                                                Checkout
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="navbar-end">
                            <a
                                className="btn btn-ghost btn-circle btn-md ml-4"
                                href="/cart"
                            >
                                <div className="indicator">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 16 16"
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                    </svg>
                                    <span className="badge badge-sm badge-primary indicator-item">
                                        {count}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            {children}
        </div>
    );
}

export default MainLayout;
