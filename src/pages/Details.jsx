import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../axios";
import { space } from "postcss/lib/list";

function Details() {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [color, setColor] = useState("");
    const { id } = params;

    useEffect(() => {
        http.get(`https://strapi-store-server.onrender.com/api/products/${id}`)
            .then((data) => {
                if (data.status == 200) {
                    setProduct(data.data.data);
                    setColor(data.data.data.attributes.colors[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <div>
            {product.id && (
                <>
                    <div className="wrapper">
                        <img
                            src={product.attributes.image}
                            width={400}
                            alt=""
                        />
                        <h3>{product.attributes.title}</h3>

                        <div className="flex gap-1">
                            {product.attributes.colors.length > 0 &&
                                product.attributes.colors.map((color) => {
                                    return (
                                        <span
                                            style={{ backgroundColor: color }}
                                            className={`block w-3 h-3 rounded-full  cursor-pointer`}
                                        ></span>
                                    );
                                })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Details;
