import React from "react";

function Orders() {
    const orderData = JSON.parse(localStorage.getItem("orderData")) || [];
    return (
        <section className="container mx-auto align-element py-20">
            <div className="border-b border-base-300 pb-5">
                <h2 className="text-3xl font-medium tracking-wider capitalize">
                    Your Orders
                </h2>
            </div>
            <h4 className="mb-4 capitalize">
                Total Orders: {orderData.length}
            </h4>
            {orderData.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Products</th>
                                <th>Cost</th>
                                <th className="hidden sm:block">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.map((value, index) => (
                                <tr key={index}>
                                    <td>{value.name}</td>
                                    <td>{value.address}</td>
                                    <td>1</td>
                                    <td>$290.98</td>
                                    <td className="hidden sm:block">
                                        {new Date(value.date).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {orderData.length === 0 && <p>No orders placed yet.</p>}
        </section>
    );
}

export default Orders;
