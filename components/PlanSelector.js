"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/app/lib/firebase";
import { loadStripe } from "@stripe/stripe-js";
import { collection, getDocs } from "firebase/firestore";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PlanSelector() {
  const plans = [
    {
      id: "pro",
      name: "Premium Plus",
      price: "$99.99/year",
      description: "Includes 7-day free trial",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$9.99/month",
      description: "No trial period",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
    },
  ];


  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [loading, setLoading] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [checkingSub, setCheckingSub] = useState(true);

  // Check Firestore for active subscription
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setHasSubscription(false);
        setCheckingSub(false);
        return;
      }

      try {
        const subsRef = collection(db, "customers", user.uid, "subscriptions");
        const subsSnap = await getDocs(subsRef);

        const active = subsSnap.docs.some((doc) => {
          const status = doc.data().status;
          return status === "active" || status === "trialing";
        });

        setHasSubscription(active);
      } catch (err) {
        console.error("Error checking subscription:", err);
      } finally {
        setCheckingSub(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (id) => {
    setSelectedPlan(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in first.");
        setLoading(false);
        return;
      }

      if (hasSubscription) {
        alert("✅ You already have an active subscription.");
        setLoading(false);
        return;
      }

      const plan = plans.find((p) => p.id === selectedPlan);
      if (!plan) throw new Error("Invalid plan selected");

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId, uid: user.uid }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingSub) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Checking subscription status...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="field-sizing-fixed w-175 max-w-lg mx-auto p-10 mt-10 bg-white rounded shadow-2xl shadow-blue-600">
      <h1 className="text-2xl font-bold mb-4">Choose The Plan That Fits You</h1>
{hasSubscription ? (
        <p className="text-green-600 font-semibold mb-4">
          ✅ You already have an active subscription.
        </p>
      ) : (
        <>
      <div className="space-y-4">
        {plans.map((plan) => (
          <label
            key={plan.id}
            className={`flex items-center p-4 border rounded cursor-pointer ${
              selectedPlan === plan.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="plan"
              value={plan.id}
              checked={selectedPlan === plan.id}
              onChange={() => handleChange(plan.id)}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <div className="ml-6 text-left">
              <div className="text-gray-700 font-semibold text-base">{plan.name}</div>
              <div className="text-gray-900 font-bold text-lg">{plan.price}</div>
              <div className="text-sm text-gray-500">{plan.description}</div>
            </div>
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : selectedPlan === "premium"
          ? "Start your first month"
          : "Start your 7-day free trial"}
      </button>
      <div className="text-sm italic mt-2">
        {selectedPlan === "premium"
          ? "30-day money back guarantee, no questions asked."
          : "Cancel your trial at any time before it ends, and you won’t be charged."}
      </div>
      </> ) }
    </form>
  );
}