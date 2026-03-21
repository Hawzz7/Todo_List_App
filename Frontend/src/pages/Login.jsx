// src/pages/Login.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Validation
    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }

    if (!form.email.includes("@")) {
      return toast.error("Enter a valid email");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", form);

      dispatch(setUser(res.data.user));
      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-3">

      <div className="w-full max-w-md backdrop-blur-md bg-white/80 p-6 sm:p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}