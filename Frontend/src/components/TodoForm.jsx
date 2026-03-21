import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function TodoForm({ refresh }) {
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
    <form
      onSubmit={submit}
      className="bg-white p-5 rounded-2xl shadow mb-5 space-y-3"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        Add New Todo
      </h2>

      {/* Title */}
      <input
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter title..."
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      {/* Description */}
      <textarea
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter description..."
        rows="2"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      {/* Status */}
      <select
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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