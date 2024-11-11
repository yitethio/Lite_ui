"use client";
import React, { useState } from "react"; // Add useState here
import Header from "../Header/page";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All Order");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const orders = [
    { id: "#377399", item: "Red T-shirt", pickup: "Addisu Gebeya", dropoff: "Addisu Gebeya", date: "09.11.2024", status: "Pending" },
    { id: "#377399", item: "Red T-shirt", pickup: "Addisu Gebeya", dropoff: "Addisu Gebeya", date: "09.11.2024", status: "Delivering" },
    { id: "#377399", item: "Red T-shirt", pickup: "Addisu Gebeya", dropoff: "Addisu Gebeya", date: "09.11.2024", status: "Completed" },
    // Add more order items as needed
  ];

  return (
    <>
      <Header/>
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

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="text-gray-800"> {/* Darker header text color */}
                <th className="px-4 py-2 text-left border-b">Order ID</th>
                <th className="px-4 py-2 text-left border-b">Item</th>
                <th className="px-4 py-2 text-left border-b">Pick up</th>
                <th className="px-4 py-2 text-left border-b">Drop off</th>
                <th className="px-4 py-2 text-left border-b">Date</th>
                <th className="px-4 py-2 text-left border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b text-gray-800"> {/* Darker row text color */}
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.item}</td>
                  <td className="px-4 py-2">{order.pickup}</td>
                  <td className="px-4 py-2">{order.dropoff}</td>
                  <td className="px-4 py-2">{order.date}</td>
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
      </div>
     </div>
    </>
  );
};

export default Orders;
