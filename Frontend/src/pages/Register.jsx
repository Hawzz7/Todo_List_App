// src/pages/Register.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/register", form);

      dispatch(setUser(res.data.user));
      toast.success("Registered successfully");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account 
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Button */}
        <button className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition duration-200">
          Register
        </button>

        {/* Login link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}