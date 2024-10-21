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
