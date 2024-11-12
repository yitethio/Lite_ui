"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header/page";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All Order");
  const [orders, setOrders] = useState([]); // State for orders data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Fetch orders data from API
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://liyt-api-1.onrender.com/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data); // Update orders state with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-white w-full h-screen">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Orders Details</h1>
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold">
              New Orders
            </button>
          </div>

          <div className="flex space-x-6 mb-4 border-b">
            {["All Order", "Completed", "Delivered", "Pending"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`py-2 ${
                  activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="text-gray-800">
                    <th className="px-4 py-2 text-left border-b">Order ID</th>
                    <th className="px-4 py-2 text-left border-b">Customer</th>
                    <th className="px-4 py-2 text-left border-b">Origin</th>
                    <th className="px-4 py-2 text-left border-b">Destination</th>
                    <th className="px-4 py-2 text-left border-b">Date</th>
                    <th className="px-4 py-2 text-left border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b text-gray-800">
                      <td className="px-4 py-2">{order.id}</td>
                      <td className="px-4 py-2">{order.customer_name}</td>
                      <td className="px-4 py-2">{order.origin}</td>
                      <td className="px-4 py-2">{order.destination}</td>
                      <td className="px-4 py-2">{order.date || "N/A"}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            order.status === "Pending"
                              ? "bg-purple-200 text-purple-800"
                              : order.status === "Delivering"
                              ? "bg-blue-200 text-blue-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
