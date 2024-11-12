"use client";
import React, { useState } from "react";
import Header from "../Header/page";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    businessName: "",
    businessEmail: "",
    email: "",
    primaryAddress: "",
    secondaryAddress: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            if (response.ok) {
              const data = await response.json();
              const address = data.display_name; // Human-readable address
              setFormData((prevData) => ({
                ...prevData,
                primaryAddress: address,
              }));
            } else {
              setFormError("Unable to fetch address. Please try again.");
            }
          } catch (err) {
            setFormError("An error occurred. Please try again.");
          }
        },
        (error) => {
          setFormError("Unable to retrieve location. Please check location permissions.");
        }
      );
    } else {
      setFormError("Geolocation is not supported by this browser.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match"); // This will now be allowed
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Account created successfully!");
        // Redirect to login or dashboard page
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Sign-up failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex max-w-4xl w-full">
          {/* Left Side */}
          <div className="pt-10 w-1/2 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-10 text-white flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-2">LIYT</h1>
            <h2 className="text-2xl font-semibold mb-4">Revolutionize Your Delivery System</h2>
            <p className="text-lg">Revolutionize Your Delivery System</p>
            <div className="mt-10 pt-40">
              <p className="text-lg">Already have an account?</p>
              <a
                href="/Login"
                className="text-white underline mt-2 inline-block hover:text-gray-200"
              >
                Log in here
              </a>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 p-10">
            <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={step === 1 ? handleNext : handleSignUp}>
              {step === 1 && (
                <>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-1/2 p-3 border border-gray-300 rounded-md"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-1/2 p-3 border border-gray-300 rounded-md"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Business Name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="businessEmail"
                    placeholder="Business Email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="primaryAddress"
                    placeholder="Primary address"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.primaryAddress}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold mt-2"
                  >
                    Use Current Location
                  </button>
                  <input
                    type="text"
                    name="secondaryAddress"
                    placeholder="Secondary address"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.secondaryAddress}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
