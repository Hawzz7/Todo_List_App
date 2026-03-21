import { useState } from "react";
import api from "../api/axios";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";

export default function TodoList({ todos, refresh }) {
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  // ✏️ update
  const update = async (id) => {
    try {
      await api.put(`/api/todos/${id}`, edit);
      toast.success("Todo updated");
      setEditId(null);
      refresh();
    } catch {
      toast.error("Update failed");
    }
  };

  // 🔄 toggle status
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

  // 🗑 delete
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

  // 🎨 Status color helper
  const getStatusColor = (status) => {
    if (status === "completed") return "text-green-500";
    if (status === "in-progress") return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      <div className="space-y-4">
        {todos.map((t) => (
          <div
            key={t._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            {editId === t._id ? (
              <>
                {/* ✏️ Edit Mode */}
                <input
                  className="w-full border p-2 mb-2 rounded"
                  value={edit.title}
                  onChange={(e) =>
                    setEdit({ ...edit, title: e.target.value })
                  }
                />

                <input
                  className="w-full border p-2 mb-2 rounded"
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
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="px-4 py-1 border rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 📄 View Mode */}
                <h3 className="text-lg font-semibold">
                  {t.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {t.description}
                </p>

                {/* 🔄 Status */}
                <p
                  onClick={() => toggle(t)}
                  className={`text-sm mt-1 cursor-pointer font-medium ${getStatusColor(
                    t.status
                  )}`}
                >
                  {t.status}
                </p>

                {/* Actions */}
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => {
                      setEditId(t._id);
                      setEdit(t);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(t._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* 🗑 Delete Modal */}
      {deleteId && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  );
}