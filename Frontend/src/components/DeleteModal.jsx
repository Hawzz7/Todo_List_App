// src/components/DeleteModal.jsx

import { useSelector } from "react-redux";

export default function DeleteModal({ onConfirm, onCancel }) {
  const mode = useSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3">
      
      {/* Modal Box */}
      <div
        className={`w-full max-w-sm sm:max-w-md rounded-2xl shadow-xl p-5 sm:p-6 transition-all duration-300 ${
          isDark
            ? "bg-gray-900 text-white"
            : "bg-white text-black"
        }`}
      >

        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full text-xl ${
              isDark
                ? "bg-red-900 text-red-400"
                : "bg-red-100 text-red-500"
            }`}
          >
            ⚠️
          </div>
        </div>

        {/* Title */}
        <h2
          className={`text-center text-lg sm:text-xl font-semibold ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Delete Todo?
        </h2>

        {/* Description */}
        <p
          className={`text-center text-sm mt-2 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          This action cannot be undone. Are you sure you want to delete this todo?
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">

          {/* Cancel */}
          <button
            onClick={onCancel}
            className={`w-full py-2 rounded-lg border transition ${
              isDark
                ? "border-gray-600 text-white hover:bg-gray-800"
                : "border-gray-300 text-black hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            onClick={onConfirm}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}