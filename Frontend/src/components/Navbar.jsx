import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const mode = useSelector((s) => s.theme.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = mode === "dark";

  const logout = async () => {
    try {
      setLoading(true);

      await api.post("/api/auth/logout");

      dispatch(clearUser());
      toast.success("Logged out");

      navigate("/");
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`shadow-md px-4 sm:px-6 py-3 flex justify-between items-center ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Logo */}
      <h1 className="text-lg sm:text-xl font-bold text-blue-600">
        Todo App
      </h1>

      {/* Desktop Section */}
      <div className="hidden sm:flex items-center gap-4">
        {/* Theme Toggle */}
        <IconButton
          onClick={() => dispatch(toggleTheme())}
          color="inherit"
        >
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <span className={isDark ? "text-gray-300" : "text-gray-700"}>
            {user?.name}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          disabled={loading}
          className={`px-4 py-1.5 rounded-lg text-sm transition ${
            loading
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* Mobile Burger */}
      <div className="sm:hidden">
        <IconButton onClick={() => setMenuOpen(!menuOpen)} color="inherit">
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-16 right-4 w-52 rounded-xl shadow-lg p-4 flex flex-col gap-4 z-50 ${
            isDark ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          {/* Theme Toggle */}
          <div className="flex justify-between items-center">
            <span>Theme</span>
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              color="inherit"
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </div>

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span>{user?.name}</span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            disabled={loading}
            className={`w-full py-2 rounded-lg transition ${
              loading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}