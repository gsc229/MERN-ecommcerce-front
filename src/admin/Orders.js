import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = isAuthenticated();

  useEffect(() => {
    const loadOrders = () => {
      listOrders(user._id).then((data) => {
        setOrders(data);
      });
    };
    loadOrders();
  }, [user._id]);

  const showOrdersLength = () => {
    return orders.length > 0 ? (
      <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
    ) : (
      <h1 className="text-danger">No orders</h1>
    );
  };

  return (
    <Layout
      className="container"
      title="Current Oders"
      description={`Hi ${user.name}! You can manage your orders here.`}
    >
      <div className="col-md-8 offset-md-2">
        {showOrdersLength()}
        {orders.length > 0 &&
          orders.map((order, i) => (
            <div
              className="mt-5"
              key={i}
              style={{ borderBottom: "5px solid indigo" }}
            >
              <h2 className="mb-5">
                <span style={{ padding: "12px" }} className="bg-primary">
                  Order ID: {order._id}
                </span>
              </h2>
              <ul className="list-group mb-2">
                <li className="list-group-item">{order.status}</li>
                <li className="list-group-item">{order.transaction_id}</li>
                <li className="list-group-item">{order.amount}</li>
                <li className="list-group-item">
                  Ordered By: {order.user.name}
                </li>
                <li className="list-group-item">
                  Orderd on: {moment(order.createdAt).fromNow()}
                </li>
                <li className="list-group-item">
                  Delivery Address: {order.address}
                </li>
              </ul>
              <h3 className="mt-4 mb-4 font-italic">
                Total products in the order: {order.products.length}
              </h3>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Orders;
