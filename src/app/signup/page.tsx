// pages/signup.js
"use client";
import React, { useState } from "react";
import Header from "../Header/page";

const SignUp = () => {
  const [step, setStep] = useState(1);

  const handleNext = (e: any) => {
    e.preventDefault();
    setStep(2); // Move to the next step (password setup)
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    // Add your sign-up logic here (e.g., submit the form)
    alert("Account created successfully!");
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex max-w-4xl w-full">
          {/* Left Side */}
          <div className="w-1/2 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-10 text-white flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-2">LIYT</h1>
            <h2 className="text-2xl font-semibold mb-4">
              Revolutionize Your Delivery System
            </h2>
            <p className="text-lg">Revolutionize Your Delivery System</p>
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 p-10">
            <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
            <form
              className="space-y-4"
              onSubmit={step === 1 ? handleNext : handleSignUp}
            >
              {step === 1 && (
                <>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-1/2 p-3 border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-1/2 p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Business Name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Business Email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Primary address"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Secondory address"
                    className="w-full p-3 border border-gray-300 rounded-md"
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
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-3 border border-gray-300 rounded-md"
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
