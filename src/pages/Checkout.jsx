import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Checkout() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleAddressChange(e) {
        setAddress(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const orderData = [
            {
                name: name,
                address: address,
                date: new Date().toISOString(),
            },
        ];
        localStorage.setItem("orderData", JSON.stringify(orderData));
        navigate("/orders"); // Redirect to orders page after saving
    }

    return (
        <div className="container mx-auto">
            <section className="align-element py-20">
                <div className="border-b border-base-300 pb-5">
                    <h2 className="text-3xl font-medium tracking-wider capitalize">
                        Place Your Order
                    </h2>
                </div>
                <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-y-4"
                    >
                        <h4 className="font-medium text-xl capitalize">
                            Shipping Information
                        </h4>
                        <div className="form-control">
                            <label htmlFor="name" className="label">
                                <span className="label-text capitalize">
                                    First Name
                                </span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered"
                                onChange={handleNameChange}
                                value={name}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="address" className="label">
                                <span className="label-text capitalize">
                                    Address
                                </span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                className="input input-bordered"
                                onChange={handleAddressChange}
                                value={address}
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                            >
                                Place Your Order
                            </button>
                        </div>
                    </form>
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                                <span>Subtotal</span>
                                <span className="font-medium">$259.98</span>
                            </p>
                            <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                                <span>Shipping</span>
                                <span className="font-medium">$5.00</span>
                            </p>
                            <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                                <span>Tax</span>
                                <span className="font-medium">$26.00</span>
                            </p>
                            <p className="flex justify-between text-sm mt-4 pb-2">
                                <span>Order Total</span>
                                <span className="font-medium">$290.98</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Checkout;
