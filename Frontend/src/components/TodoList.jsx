import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";

export default function TodoList({ todos, refresh }) {
  const mode = useSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const update = async (id) => {
    try {
      await api.put(`/api/todos/${id}`, edit);
      toast.success("Updated");
      setEditId(null);
      refresh();
    } catch {
      toast.error("Update failed");
    }
  };

  const toggle = async (t) => {
    const next =
      t.status === "pending"
        ? "in-progress"
        : t.status === "in-progress"
        ? "completed"
        : "pending";

    try {
      await api.put(`/api/todos/${t._id}`, { status: next });
      refresh();
    } catch {
      toast.error("Status update failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/todos/${deleteId}`);
      toast.success("Deleted");
      setDeleteId(null);
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  // Badge styles 
  const statusBadge = (status) => {
    if (status === "completed")
      return "bg-green-100 text-green-600";
    if (status === "in-progress")
      return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <>
      <div className="space-y-4">
        {todos.map((t) => (
          <div
            key={t._id}
            className={`p-4 rounded-xl shadow flex flex-col gap-2 transition-all duration-300 ${
              isDark
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }`}
          >
            {editId === t._id ? (
              <>
                {/* Edit Mode */}
                <input
                  className={`w-full p-2 rounded border ${
                    isDark
                      ? "bg-gray-800 text-white border-gray-600"
                      : "bg-white text-black border-gray-300"
                  }`}
                  value={edit.title}
                  onChange={(e) =>
                    setEdit({ ...edit, title: e.target.value })
                  }
                />

                <textarea
                  className={`w-full p-2 rounded border ${
                    isDark
                      ? "bg-gray-800 text-white border-gray-600"
                      : "bg-white text-black border-gray-300"
                  }`}
                  value={edit.description}
                  onChange={(e) =>
                    setEdit({
                      ...edit,
                      description: e.target.value,
                    })
                  }
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => update(t._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="border px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* View Mode */}
                <h3 className="font-semibold">{t.title}</h3>

                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {t.description}
                </p>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <span
                    onClick={() => toggle(t)}
                    title="Click to change status"
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition hover:scale-105 ${
                      statusBadge(t.status)
                    }`}
                  >
                    {t.status}
                  </span>

                  <span className="text-xs text-gray-400">
                    (click to change)
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => {
                      setEditId(t._id);
                      setEdit(t);
                    }}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(t._id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {deleteId && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  );
}