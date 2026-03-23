// src/components/TodoForm.jsx
import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function TodoForm({ refresh }) {
  const mode = useSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/todos", form);
      toast.success("Todo added");

      setForm({
        title: "",
        description: "",
        status: "pending",
      });

      refresh();
    } catch {
      toast.error("Failed to add todo");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {/* Title */}
      <input
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
          isDark
            ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
            : "bg-white text-black border-gray-300"
        }`}
        placeholder="Enter title..."
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      {/* Description */}
      <textarea
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
          isDark
            ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400"
            : "bg-white text-black border-gray-300"
        }`}
        rows="3"
        placeholder="Enter description..."
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      {/* Status */}
      <select
        className={`w-full p-3 border rounded-lg transition ${
          isDark
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Button */}
      <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
        Add Todo
      </button>
    </form>
  );
}