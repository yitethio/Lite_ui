"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaPhone } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const JobDetailsStatic = () => {
  // Static data
  const origin = { lat: 9.03, lng: 38.74 };
  const destination = { lat: 9.05, lng: 38.76 };
  const estimatedPrice = 245;
  const orderStatus = "Delivering";
  const itemDescription = "Red T-shirt";
  const orderId = "#377399";
  const sender = { name: "Tito Iuel", phone: "(+251) 912-345678" };
  const receiver = { name: "Tito Iuel", phone: "(+251) 912-345678" };

  // State for collapsing the details
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle collapse state
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-400 text-white flex items-center justify-between shadow-md fixed top-0 z-20">
        <FiMenu size={24} className="cursor-pointer" />
        <h1 className="text-xl font-bold flex-grow text-center">LIYT</h1>
      </div>

      {/* Full-page Map */}
      <div className="absolute inset-0 z-10">
        <MapContainer center={[9.04, 38.75]} zoom={13} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[origin.lat, origin.lng]}>
            <Popup>Origin</Popup>
          </Marker>
          <Marker position={[destination.lat, destination.lng]}>
            <Popup>Destination</Popup>
          </Marker>
          <Polyline positions={[[origin.lat, origin.lng], [destination.lat, destination.lng]]} color="blue" />
        </MapContainer>
      </div>

      {/* Floating Details */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 p-4 bg-white bg-opacity-90 rounded-t-lg shadow-lg mx-4 mb-4 text-gray-800 transition-transform duration-300 ${
          isCollapsed ? "transform translate-y-[90%]" : "transform translate-y-0"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white rounded-full p-2 shadow-md"
          onClick={toggleCollapse}
        >
          {isCollapsed ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
        </button>

        {/* Details Content */}
        {!isCollapsed && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold">Sender</p>
                <p>{sender.name}</p>
                <button className="flex items-center text-blue-500 mt-1">
                  <FaPhone className="mr-1" /> Call
                </button>
              </div>
              <div>
                <p className="font-bold">Receiver</p>
                <p>{receiver.name}</p>
                <button className="flex items-center text-blue-500 mt-1">
                  <FaPhone className="mr-1" /> Call
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-bold">Item</p>
              <p>{itemDescription}</p>
              <p className="text-sm text-gray-600">{orderId}</p>
              <p className="text-purple-600">{orderStatus}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold">Route</p>
              <p>Addisu Gebeya ➔ Addisu Gebeya</p>
              <p className="font-bold mt-2">Estimated Price: {estimatedPrice} Birr</p>
            </div>

            <button className="w-full py-2 bg-purple-700 text-white font-bold rounded-lg mt-6">
              Order Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailsStatic;
