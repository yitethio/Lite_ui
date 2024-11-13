"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header/page";
import dynamic from "next/dynamic";
import { FaSearch } from "react-icons/fa";

const Map = dynamic(() => import("../map"), { ssr: false });

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All Order");
  const [orders, setOrders] = useState([]); // State for orders data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [pickUp, setPickUp] = useState([]);
  const [dropOff, setDropOff] = useState([]);
  const [pickUpInput, setPickUpInput] = useState("");
  const [dropOffInput, setDropOffInput] = useState("");
  const [formData, setFormData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabClick = (tab: any) => {
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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchLocationSuggestions = async (query: any, type: any) => {
    try {
      const response = await fetch(
        `https://liyt-api-1.onrender.com/location/${query}`
      );
      const data = await response.json();
      if (type === "primary") {
        setPickUp(data.payload.data);
      } else {
        setDropOff(data.payload.data);
      }
    } catch (error) {
      console.error("Failed to fetch location suggestions", error);
    }
  };

  const handleLocationSelect = (location: any, type: any) => {
    const { latitude, longitude, name } = location;
    if (type === "primary") {
      setFormData((prevData) => ({
        ...prevData,
        primary_address: { latitude, longitude },
      }));
      setPickUpInput(name);
      setPickUp([]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        secondary_address: { latitude, longitude },
      }));
      setDropOffInput(name);
      setDropOff([]);
    }
  };

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order: any) =>
    activeTab === "All Order" ? true : order.status === activeTab
  );

  return (
    <>
      <Header />
      <div className="bg-white w-full h-screen">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Orders Details</h1>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              New Orders
            </button>
          </div>

          <div className="flex space-x-6 mb-4 border-b">
            {["All Order", "Completed", "Delivered", "Pending"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`py-2 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500"
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

                    <th className="px-4 py-2 text-left border-b">
                      Destination
                    </th>

                    <th className="px-4 py-2 text-left border-b">Date</th>
                    <th className="px-4 py-2 text-left border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order: any) => (
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

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
              <div className="bg-black w-5/6 h-5/6 flex justify-center items-center bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
                <div className="bg-white p-6 rounded-lg w-10/12 h-5/6">
                  <h2 className="text-xl font-bold mb-4">Create New Order</h2>
                  <form>
                    <div className="flex justify-evenly">
                      <div className="w-1/3">
                        <div className="mb-4">
                          <label className="block text-gray-700">Item:</label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Enter Item"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">
                            Recipient name:
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Enter Item"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">
                            Recipient Phone NO:
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Enter Item"
                          />
                        </div>
                        <div className="relative mb-4">
                          <input
                            type="text"
                            placeholder="Pick Up Address"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={pickUpInput}
                            onChange={(e) => setPickUpInput(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              fetchLocationSuggestions(pickUpInput, "primary")
                            }
                            className="absolute inset-y-0 right-3 flex items-center"
                          >
                            <FaSearch className="text-gray-500" />
                          </button>
                          {pickUp.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
                              {pickUp.map((location: any, index) => (
                                <li
                                  key={index}
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() =>
                                    handleLocationSelect(location, "primary")
                                  }
                                >
                                  {location.name} - {location.City},{" "}
                                  {location.Country}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Secondary Address"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={dropOffInput}
                            onChange={(e) => setDropOffInput(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              fetchLocationSuggestions(
                                dropOffInput,
                                "secondary"
                              )
                            }
                            className="absolute inset-y-0 right-3 flex items-center"
                          >
                            <FaSearch className="text-gray-500" />
                          </button>
                          {dropOff.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
                              {dropOff.map((location: any, index) => (
                                <li
                                  key={index}
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() =>
                                    handleLocationSelect(location, "secondary")
                                  }
                                >
                                  {location.name} - {location.City},{" "}
                                  {location.Country}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">Date:</label>
                          <input
                            type="date"
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                      <div className="w-1/2">
                        <Map zoom={14} h={50} />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-16">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                      >
                        Create Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
