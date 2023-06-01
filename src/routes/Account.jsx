import React from "react";
import SavedCoins from "../components/SavedCoins";
import { UserAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function Account() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (user) {
    return (
      <div className="max-w-[1140px] mx-auto">
        <div className="flex justify-between items-center my-12 py-8 rounded-div">
          <div>
            <h1 className="text-2xl font-bold">Account</h1>
            <div>
              <p>
                Welcome, <span className="font-bold ">{user?.email}</span>
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={handleSignOut}
              className="border border-gray-400 px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-110"
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center my-12 py-8 rounded-div ">
          <div className="w-full min-h-[300px]">
            <h1 className="font-bold text-2xl py-4">Watch List</h1>
            <SavedCoins />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

export default Account;
