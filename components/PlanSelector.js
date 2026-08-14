"use client";

import { useState } from "react";

export default function PlanSelector() {
  const plans = [
    { id: "pro", name: "Premium Plus", price: "$99.99/year", description: "Includes 7-day free trial" },
    { id: "premium", name: "Premium", price: "$$9.99/month", description: "No trial period" },
  ];

  const [selectedPlan, setSelectedPlan] = useState("premium");

  const handleChange = (id) => {
    setSelectedPlan(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You selected: ${selectedPlan}`);
    // You can replace alert with API call or navigation
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-fit space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Plan</h1>

      {plans.map((plan) => (
        <label
          key={plan.id}
          className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition
            ${selectedPlan === plan.id ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
          `}
        >
          <div className="text-left">
            <p className="text-lg font-semibold">{plan.name}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{plan.price}</p>
            <p className="text-sm text-gray-600">{plan.description}</p>
          </div>
          <input
            type="radio"
            name="subscription"
            value={plan.id}
            checked={selectedPlan === plan.id}
            onChange={() => handleChange(plan.id)}
            className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
        </label>
      ))}

      <button type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        {selectedPlan === "premium" ? "Start your first month" : "Start your 7-days free trial"}        
      </button>      
        {selectedPlan === "premium" ? "30-day money back guarantee, no questions asked." : "Cancel your trial at any time before it ends, and you won’t be charged"}        
    </form>
  );
}
