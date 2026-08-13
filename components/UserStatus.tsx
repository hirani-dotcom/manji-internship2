"use client";

import { useUserStatus } from "@/app/hooks/useUserStatus";

export default function UserStatus() {
  const {
    loading,
    isSignedIn,
    user,
    isPremium,
    hasLibraryAccess,
    updatePremium,
    updateLibraryAccess,
  } = useUserStatus();

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold">User Status</h2>

      <div className="space-y-2">
        <p>Signed In: <span className={isSignedIn ? "text-green-600" : "text-red-600"}>{isSignedIn ? "Yes" : "No"}</span></p>
        {isSignedIn && <p>Email: {user?.email}</p>}
        <p>Premium: <span className={isPremium ? "text-green-600" : "text-red-600"}>{isPremium ? "Yes" : "No"}</span></p>
        <p>Library Access: <span className={hasLibraryAccess ? "text-green-600" : "text-red-600"}>{hasLibraryAccess ? "Yes" : "No"}</span></p>
      </div>

      {isSignedIn && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updatePremium(!isPremium)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
          >
            Toggle Premium
          </button>

          <button
            onClick={() => updateLibraryAccess(!hasLibraryAccess)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Toggle Library
          </button>
        </div>
      )}
    </div>
  );
}
