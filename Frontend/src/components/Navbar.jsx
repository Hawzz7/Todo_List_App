import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");

      dispatch(clearUser());
      toast.success("Logged out");

      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-white shadow-md px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-3">
      {/* Logo */}
      <h1 className="text-lg sm:text-xl font-bold text-blue-600">Todo App</h1>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm sm:text-base">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <span className="text-sm sm:text-base text-gray-700 font-medium">
            {user?.name}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 sm:px-4 py-1.5 rounded-lg text-sm sm:text-base hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
