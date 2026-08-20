"use client";
import LibrarySkeleton from "@/components/LibrarySkeleton";
import { useAuth } from "../context/AuthContext";

export default function SettingsPage() {
  const { user, loading } = useAuth();

  if (loading) {
  return (
    <div className="p-6 animate-pulse">
      <h1 className="text-2xl h-4 font-bold my-4">Settings</h1>
      <div className="border border-gray-300"></div>
      <div className="text-xl h-4 font-bold my-4">Account Details
      </div>
      <div><span className="h-4 font-bold">Name: 
        <p className="bg-gray-400 h-4 w-36 animate-pulse"></p></span></div>
      <div><span className="h-4font-bold">Email: 
        <p className="bg-gray-400 h-4 w-36 animate-pulse"></p></span></div>
      <div className="my-4">
        <h2 className="h-8 font-semibold">Your Subscription Plan</h2>
                <p className="bg-gray-400 h-4 w-36 animate-pulse"></p>
              </div>
    </div>
  );;
}


   return (
    <div className="p-6">
      <h1 className="text-2xl font-bold my-4">Settings</h1>
      <div className="border border-gray-300"></div>
      <div className="text-xl font-bold my-4">Account Details</div>
      <div><span className="font-bold">Name: </span>{user?.displayName ? user?.displayName : "No Name"}</div>
      <div><span className="font-bold">Email: </span>{user?.email}</div>
      <div className="my-4">
        <h2 className="font-semibold">Your Subscription Plan</h2>
        {user?.subscribed === "Basic" && (
          <div className="text-red-500 font-semibold italic">
            You are on our Basic (Free) plan, with limited access.
            <a className="bg-blue-400 rounded-full p-2 text-white ml-4" href='/choose-plan'>Buy a plan</a>
          </div>
        )}
        {user?.subscribed === "Premium" && (
          <div className="text-blue-400 font-semibold italic">
          <p className="capitalize">{user?.subscribed}</p>
            You are on our basic plan. You do not have access to premium content
            <a className="bg-blue-400 rounded-full p-2 text-white ml-4" href='/choose-plan'>Upgrade my plan</a>
          </div>
        )}
        {user?.subscribed === "Premium Plus" && (
          <div className="text-green-500 font-semibold italic">
          <p className="capitalize">{user?.subscribed}</p>
            Congratulations you are on our best plan.
          </div>
        )}
      </div>
    </div>
  );
}
