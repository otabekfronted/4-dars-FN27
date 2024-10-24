import React, { useContext, useEffect, useState } from "react";

function Products() {
    const [card, setCard] = useState([]);
    useEffect(() => {
        fetch("https://strapi-store-server.onrender.com/api/products")
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
                setCard(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="container mx-auto">
            <section className="align-element py-20">
                <form
                    method="get"
                    action="/products"
                    className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
                >
                    {/* Search */}
                    <div className="form-control">
                        <label htmlFor="search" className="label">
                            <span className="label-text capitalize">
                                search product
                            </span>
                        </label>
                        <input
                            type="search"
                            name="search"
                            className="input input-bordered input-sm"
                            defaultValue=""
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="category" className="label">
                            <span className="label-text capitalize">
                                select category
                            </span>
                        </label>
                        <select
                            name="category"
                            id="category"
                            className="select select-bordered select-sm"
                        >
                            <option value="all">all</option>
                            <option value="Tables">Tables</option>
                            <option value="Chairs">Chairs</option>
                            <option value="Kids">Kids</option>
                            <option value="Sofas">Sofas</option>
                            <option value="Beds">Beds</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="company" className="label">
                            <span className="label-text capitalize">
                                select company
                            </span>
                        </label>
                        <select
                            name="company"
                            id="company"
                            className="select select-bordered select-sm"
                        >
                            <option value="all">all</option>
                            <option value="Modenza">Modenza</option>
                            <option value="Luxora">Luxora</option>
                            <option value="Artifex">Artifex</option>
                            <option value="Comfora">Comfora</option>
                            <option value="Homestead">Homestead</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="order" className="label">
                            <span className="label-text capitalize">
                                sort by
                            </span>
                        </label>
                        <select
                            name="order"
                            id="order"
                            className="select select-bordered select-sm"
                        >
                            <option value="a-z">a-z</option>
                            <option value="z-a">z-a</option>
                            <option value="high">high</option>
                            <option value="low">low</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="price" className="label cursor-pointer">
                            <span className="label-text capitalize">
                                select price
                            </span>
                            <span>$1,000.00</span>
                        </label>
                        <input
                            type="range"
                            name="price"
                            min="0"
                            max="100000"
                            className="range range-primary range-sm"
                            step="1000"
                            defaultValue="100000"
                        />
                        <div className="w-full flex justify-between text-xs px-2 mt-2">
                            <span className="font-bold text-md">0</span>
                            <span className="font-bold text-md">
                                Max : $1,000.00
                            </span>
                        </div>
                    </div>

                    <div className="form-control items-center">
                        <label
                            htmlFor="shipping"
                            className="label cursor-pointer"
                        >
                            <span className="label-text capitalize">
                                free shipping
                            </span>
                        </label>
                        <input
                            type="checkbox"
                            name="shipping"
                            className="checkbox checkbox-primary checkbox-sm"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-sm">
                        search
                    </button>
                    <a className="btn btn-accent btn-sm" href="/products">
                        reset
                    </a>
                </form>

                <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
                    <h4 className="font-medium text-md">
                        {card.length} products
                    </h4>
                    <div className="flex gap-x-2">
                        <button
                            type="button"
                            className="text-xl btn btn-circle btn-sm btn-primary text-primary-content"
                        >
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="text-xl btn btn-circle btn-sm btn-ghost text-based-content"
                        >
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 16 16"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-12">
                    {card.map((value, index) => (
                        <div key={index}>
                            <a
                                className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
                                href={`/products/${value.id}`}
                            >
                                <figure className="px-4 pt-4">
                                    <img
                                        src={value.attributes.image}
                                        alt={value.attributes.title}
                                        className="rounded-xl h-64 md:h-48 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title capitalize tracking-wider">
                                        {value.attributes.title}
                                    </h2>
                                    <span className="text-secondary">
                                        ${value.attributes.price / 100}
                                    </span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-end">
                    <div className="join">
                        <button className="btn btn-xs sm:btn-md join-item">
                            Prev
                        </button>
                        <button className="btn btn-xs sm:btn-md border-none join-item bg-base-300 border-base-300">
                            1
                        </button>
                        <button className="btn btn-xs sm:btn-md border-none join-item">
                            2
                        </button>
                        <button className="btn btn-xs sm:btn-md border-none join-item">
                            3
                        </button>
                        <button className="btn btn-xs sm:btn-md join-item">
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Products;
