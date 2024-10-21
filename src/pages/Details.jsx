import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../axios";

function Details() {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [color, setColor] = useState("");
    const { id } = params;

    useEffect(() => {
        http.get(`https://strapi-store-server.onrender.com/api/products/${id}`)
            .then((data) => {
                if (data.status === 200) {
                    console.log(data.data.data);
                    setProduct(data.data.data);
                    setColor(data.data.data.attributes.colors[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <div className="container mx-auto">
            {product.id && (
                <>
                    <section>
                        <div className="text-md breadcrumbs mt-10">
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/products">Products</a>
                                </li>
                            </ul>
                        </div>
                        <div className="wrapper grid gap-y-8 lg:grid-cols-2 lg:gap-x-16 pt-8 pb-20">
                            <img
                                src={product.attributes.image}
                                alt="avant-garde lamp"
                                className="w-96 h-96 object-cover rounded-lg lg:w-full"
                            />
                            <div>
                                <h1 className="capitalize text-3xl font-bold">
                                    {product.attributes.title}
                                </h1>
                                <h4 className="text-xl text-neutral-content font-bold mt-2">
                                    {product.attributes.company}
                                </h4>
                                <p className="mt-3 text-xl">
                                    ${product.attributes.price}
                                </p>
                                <p className="mt-6 leading-8">
                                    {product.attributes.description}
                                </p>
                                <div className="mt-6">
                                    <h4 className="text-md font-medium tracking-wider capitalize">
                                        colors
                                    </h4>
                                    <div className="mt-2 flex gap-2">
                                        {product.attributes.colors.length > 0 &&
                                            product.attributes.colors.map(
                                                (colorProduct) => (
                                                    <span
                                                        key={colorProduct.id}
                                                        style={{
                                                            backgroundColor:
                                                                colorProduct,
                                                            border:
                                                                color ===
                                                                colorProduct
                                                                    ? "1px solid black"
                                                                    : "none",
                                                        }}
                                                        className="block w-6 h-6 rounded-full cursor-pointer"
                                                        onClick={() =>
                                                            setColor(
                                                                colorProduct
                                                            )
                                                        }
                                                    ></span>
                                                )
                                            )}
                                    </div>
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label" htmlFor="amount">
                                        <h4 className="text-md font-medium tracking-wider capitalize">
                                            amount
                                        </h4>
                                    </label>
                                    <select
                                        className="select select-secondary select-bordered select-md"
                                        id="amount"
                                    >
                                        {Array.from({ length: 20 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-10">
                                    <button className="btn btn-secondary btn-md">
                                        Add to bag
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export default Details;
