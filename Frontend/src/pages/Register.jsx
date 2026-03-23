// src/pages/Register.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mode = useSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    if (form.name.length < 3) {
      return toast.error("Name must be at least 3 characters");
    }

    if (!form.email.includes("@")) {
      return toast.error("Enter a valid email");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const res = await api.post("/api/auth/register", form);

      dispatch(setUser(res.data.user));
      toast.success("Registered successfully");

      navigate("/dashboard");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Registration failed";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-3 transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-br from-purple-100 via-blue-200 to-indigo-300"
      }`}
    >
      <div
        className={`w-full max-w-md backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 ${
          isDark
            ? "bg-gray-900/80 text-white"
            : "bg-white/80 text-black"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            isDark ? "text-indigo-400" : "text-indigo-700"
          }`}
        >
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            placeholder="Name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              isDark
                ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
                : "bg-white text-black border-gray-300"
            }`}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              isDark
                ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
                : "bg-white text-black border-gray-300"
            }`}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              isDark
                ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
                : "bg-white text-black border-gray-300"
            }`}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p
          className={`text-sm text-center mt-4 ${
            isDark ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/"
            className={`font-medium ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}