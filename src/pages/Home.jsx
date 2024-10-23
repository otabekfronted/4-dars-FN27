import { useEffect, useState } from "react";
import { http } from "../axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        http.get("products?featured=true")
            .then((data) => {
                if (data.status == 200) {
                    setProducts(data.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();
    function handleRedirect(id) {
        navigate(`/products/${id}`);
    }

    return (
        <div>
            <section className="align-element py-20 container mx-auto">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
                            We are changing the way people shop
                        </h1>
                        <p className="mt-8 max-w-xl text-lg leading-8">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Tempore repellat explicabo enim soluta
                            temporibus asperiores aut obcaecati perferendis
                            porro nobis.
                        </p>
                        <div className="mt-10">
                            <a className="btn btn-primary" href="/products">
                                Our Products
                            </a>
                        </div>
                    </div>
                    <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
                        <div className="carousel-item">
                            {products.length > 0 &&
                                products.map(function (product) {
                                    return (
                                        <figure key={product.id}>
                                            <img
                                                src={product.attributes.image}
                                                className=" px-2 rounded-box h-full w-80 object-cover"
                                            />
                                        </figure>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="border-b border-base-300 pb-5">
                    <h2 className="text-3xl font-medium">Featured Products</h2>
                </div>
                <div className="wrapper pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.length > 0 &&
                        products.map(function (product) {
                            return (
                                <div className="pt-12 grid" key={product.id}>
                                    <a
                                        className="card cursor-pointer shadow-xl hover:shadow-2xl transition duration-300"
                                        onClick={() =>
                                            handleRedirect(product.id)
                                        }
                                    >
                                        <figure className="px-4 pt-4">
                                            <img
                                                src={product.attributes.image}
                                                alt="avant-garde lamp"
                                                className="rounded-xl h-64 md:h-48 w-full object-cover"
                                            />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title capitalize ">
                                                {product.attributes.title}
                                            </h2>
                                            <span className="text-secondary">
                                                {product.attributes.price} $
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}
                </div>
            </section>
        </div>
    );
}

export default Home;
