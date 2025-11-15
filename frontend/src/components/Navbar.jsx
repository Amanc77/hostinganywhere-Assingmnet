import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../api/axios";
import { userLoggedOut } from "@/store/authSlice";
import { toast } from "sonner";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      dispatch(userLoggedOut());

      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          HostingAnywhere
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-300 hover:text-white">
            Home
          </Link>

          <Link to="/plans" className="text-sm text-gray-300 hover:text-white">
            Plans
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="text-sm px-4 py-1.5 rounded-md border border-gray-700 text-gray-200 hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-sm px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm px-4 py-1.5 rounded-md border border-red-500 text-red-400 hover:bg-red-800/40"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
