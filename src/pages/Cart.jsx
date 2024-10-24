import { useContext } from "react";
import { CartContext } from "../App";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const navigate = useNavigate();
    const cartRemoved = () => toast.error("Item removed from cart");
    const cartUpdate = () => toast.success("Cart updated");

    const subtotal = cart.reduce((acc, item) => {
        return acc + item.data.attributes.price * item.count;
    }, 0);

    function handleRemove(id, color) {
        let copied = [...cart];
        copied = copied.filter(
            (value) => !(value.id === id && value.color === color)
        );
        setCart(copied);
        localStorage.setItem("cart", JSON.stringify(copied));
    }

    function handleChangeCount(count, id, color) {
        let copied = [...cart];
        copied = copied.map((value) => {
            if (value.id === id && value.color === color) {
                value.count = Number(count);
            }
            return value;
        });

        setCart(copied);
        localStorage.setItem("cart", JSON.stringify(copied));
    }

    const handleCheckout = () => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/checkout");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="container mx-auto">
            {cart.length === 0 ? (
                <div className="border-b border-base-300 pb-5 mt-16">
                    <h2 className="text-3xl font-medium tracking-wider capitalize">
                        Your Cart Is Empty
                    </h2>
                </div>
            ) : (
                <section className="align-element py-20">
                    <div className="border-b border-base-300 pb-5">
                        <h2 className="text-3xl font-medium tracking-wider capitalize">
                            Shopping Cart
                        </h2>
                    </div>
                    <div className="mt-8 grid gap-8 lg:grid-cols-12">
                        {cart.map((value, index) => (
                            <div className="lg:col-span-8" key={index}>
                                <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
                                    <img
                                        src={value.data.attributes.image}
                                        alt="coffee table"
                                        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
                                    />
                                    <div className="sm:ml-16 sm:w-48">
                                        <h3 className="capitalize font-medium">
                                            {value.data.attributes.category}
                                        </h3>
                                        <h4 className="mt-2 capitalize text-sm text-neutral-content">
                                            {value.data.attributes.company}
                                        </h4>
                                        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                                            color :
                                            <span
                                                className="badge badge-sm"
                                                style={{
                                                    backgroundColor:
                                                        value.color,
                                                }}
                                            ></span>
                                        </p>
                                    </div>
                                    <div className="sm:ml-12">
                                        <div className="form-control max-w-xs">
                                            <select
                                                className="mt-2 select select-base select-bordered select-xs"
                                                value={value.count}
                                                onChange={(e) => {
                                                    handleChangeCount(
                                                        e.target.value,
                                                        value.id,
                                                        value.color
                                                    );
                                                    cartUpdate();
                                                }}
                                            >
                                                {[1, 2, 3, 4, 5, 6].map(
                                                    (count) => (
                                                        <option
                                                            key={count}
                                                            value={count}
                                                        >
                                                            {count}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleRemove(
                                                    value.id,
                                                    value.color
                                                );
                                                cartRemoved();
                                            }}
                                            className="mt-2 link link-primary link-hover text-sm"
                                        >
                                            remove
                                        </button>
                                    </div>
                                    <p className="font-medium sm:ml-auto">
                                        $
                                        {(
                                            (value.data.attributes.price *
                                                value.count) /
                                            100
                                        ).toFixed(2)}
                                    </p>
                                </article>
                            </div>
                        ))}
                        <div className="total lg:col-span-4 lg:pl-4">
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                                        <span>Subtotal</span>
                                        <span className="font-medium">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </p>
                                    <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                                        <span>Shipping</span>
                                        <span className="font-medium">
                                            $5.00
                                        </span>
                                    </p>
                                    <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                                        <span>Tax</span>
                                        <span className="font-medium">
                                            $18.00
                                        </span>
                                    </p>
                                    <p className="flex justify-between text-sm mt-4 pb-2">
                                        <span>Order Total</span>
                                        <span className="font-medium">
                                            ${(subtotal + 5 + 18).toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <button
                                className="btn btn-primary btn-block mt-8"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Cart;
