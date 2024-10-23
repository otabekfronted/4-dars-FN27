import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./layouts/MainLayout";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export const CartContext = createContext();
export const ThemeContext = createContext();
function App() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [cart, setCart] = useState([]);
    const [theme, setTheme] = useState("light");
    // let params = useLocation();
    console.log(token);

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            setCart(JSON.parse(localStorage.getItem("cart")));
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        } else {
            if (
                !(
                    location.pathname == "/" ||
                    location.pathname.includes("register") ||
                    location.pathname.includes("about") ||
                    location.pathname.includes("products") ||
                    location.pathname.includes("cart")
                )
            ) {
                navigate("/login");
            }
        }
    }, [navigate]);

    function PrivateRouter({ isAuth, children }) {
        if (!isAuth) {
            navigate("/login");
        }
        return children;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <CartContext.Provider value={{ cart, setCart }}>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: "#333",
                            color: "#fff",
                            marginTop: "50px",
                        },
                    }}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MainLayout>
                                <Home></Home>
                            </MainLayout>
                        }
                    ></Route>
                    <Route
                        path="/about"
                        element={
                            <MainLayout>
                                <About></About>
                            </MainLayout>
                        }
                    ></Route>
                    <Route
                        path="/products"
                        element={
                            <MainLayout>
                                <Products></Products>
                            </MainLayout>
                        }
                    ></Route>
                    <Route
                        path="/products/:id"
                        element={
                            <MainLayout>
                                <Details></Details>
                            </MainLayout>
                        }
                    ></Route>
                    <Route
                        path="/cart"
                        element={
                            <MainLayout>
                                <Cart></Cart>
                            </MainLayout>
                        }
                    ></Route>
                    <Route
                        path="/register"
                        element={<Register></Register>}
                    ></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="*" element={<ErrorPage></ErrorPage>}></Route>

                    <Route
                        path="/orders"
                        element={
                            <PrivateRouter isAuth={!!token}>
                                <MainLayout>
                                    <Orders></Orders>
                                </MainLayout>
                            </PrivateRouter>
                        }
                    ></Route>
                    <Route
                        path="/checkout"
                        element={
                            <PrivateRouter isAuth={!!token}>
                                <MainLayout>
                                    <Checkout></Checkout>
                                </MainLayout>
                            </PrivateRouter>
                        }
                    ></Route>
                </Routes>
            </CartContext.Provider>
        </ThemeContext.Provider>
    );
}

export default App;
