import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";

export default function TodoModal({ onClose, refresh }) {
  const mode = useSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-3">
      <div
        className={`p-5 sm:p-6 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 ${
          isDark
            ? "bg-gray-900 text-white"
            : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Todo</h2>

          <button
            onClick={onClose}
            className={`text-lg ${
              isDark ? "text-gray-400 hover:text-white" : "text-gray-500"
            }`}
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <TodoForm refresh={refresh} />
      </div>
    </div>
  );
}