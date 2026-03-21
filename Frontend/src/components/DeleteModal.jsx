// src/components/DeleteModal.jsx

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">

      {/* Modal Box */}
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl p-5 sm:p-6">

        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-500 text-xl">
            ⚠️
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-800">
          Delete Todo?
        </h2>

        {/* Description */}
        <p className="text-center text-sm text-gray-500 mt-2">
          This action cannot be undone. Are you sure you want to delete this todo?
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">

          {/* Cancel */}
          <button
            onClick={onCancel}
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
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