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
            <section className="align-element py-20">
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
                            <img
                                src="/assets/hero1-deae5a1f.webp"
                                className="rounded-box h-full w-80 object-cover"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="/assets/hero2-2271e3ad.webp"
                                className="rounded-box h-full w-80 object-cover"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="/assets/hero3-a83f0357.webp"
                                className="rounded-box h-full w-80 object-cover"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="/assets/hero4-4b9de90e.webp"
                                className="rounded-box h-full w-80 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className="wrapper container mx-auto flex flex-wrap gap-3 justify-center">
                {products.length > 0 &&
                    products.map(function (product) {
                        return (
                            <div
                                className="w-1/4 shadow-md rounded-md "
                                onClick={() => handleRedirect(product.id)}
                                key={product.id}
                            >
                                <img
                                    src={product.attributes.image}
                                    className="h-[300px] w-full object=cover cursor-pointer"
                                />
                                <h3>{product.attributes.title}</h3>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Home;
