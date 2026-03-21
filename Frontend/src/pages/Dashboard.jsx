import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../api/axios";
import { setTodos, setLoading } from "../store/todoSlice";

import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import Loader from "../components/Loader";
import TodoModal from "../components/TodoModal";

import useDebounce from "../hooks/useDebounce";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((s) => s.todo);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search);

  const fetchTodos = async () => {
    try {
      dispatch(setLoading(true));

      const res = await api.get(
        `/api/todos?page=${page}&limit=5&search=${debouncedSearch}&status=${status}`
      );

      dispatch(setTodos(res.data.data));
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page, debouncedSearch, status]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="sticky top-0 z-40">
        <Navbar />
      </div>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">

          {/* Search */}
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {/* Status Filter */}
          <select
            className="w-full sm:w-auto p-3 border rounded-lg"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Add Button */}
          <button
            onClick={() => setOpenModal(true)}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <Loader />
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            No todos found
          </p>
        ) : (
          <TodoList todos={todos} refresh={fetchTodos} />
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">

          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className={`w-full sm:w-auto px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Prev
          </button>

          {/* Page Info */}
          <span className="text-sm font-medium text-gray-700">
            Page {page} of {totalPages}
          </span>

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`w-full sm:w-auto px-4 py-2 rounded ${
              page === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <TodoModal
          onClose={() => setOpenModal(false)}
          refresh={() => {
            fetchTodos();
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
}