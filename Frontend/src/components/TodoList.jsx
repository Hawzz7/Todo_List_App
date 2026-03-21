import { useState } from "react";
import api from "../api/axios";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";

export default function TodoList({ todos, refresh }) {
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

  const statusColor = (status) => {
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
            className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
          >
            {editId === t._id ? (
              <>
                {/* Edit Mode */}
                <input
                  className="w-full border p-2 rounded"
                  value={edit.title}
                  onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                />

                <textarea
                  className="w-full border p-2 rounded"
                  value={edit.description}
                  onChange={(e) =>
                    setEdit({
                      ...edit,
                      description: e.target.value,
                    })
                  }
                />

                <div className="flex flex-col sm:flex-row gap-2">
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
                <h3 className="text-base sm:text-lg font-semibold break-words">
                  {t.title}
                </h3>

                <p className="text-sm text-gray-600 break-words">
                  {t.description}
                </p>

                <p
                  onClick={() => toggle(t)}
                  className={`text-sm font-medium cursor-pointer ${statusColor(
                    t.status,
                  )}`}
                >
                  {t.status}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-2">
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

      {/* Delete Modal */}
      {deleteId && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  );
}
