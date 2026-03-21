import TodoForm from "./TodoForm";

export default function TodoModal({ onClose, refresh }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-3">
      <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Todo</h2>
          <button onClick={onClose} className="text-gray-500">
            ✖
          </button>
        </div>

        {/* Form */}
        <TodoForm refresh={refresh} />
      </div>
    </div>
  );
}
