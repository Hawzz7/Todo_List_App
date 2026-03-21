// src/components/TodoModal.jsx
import TodoForm from "./TodoForm";

export default function TodoModal({ onClose, refresh }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Add Todo</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <TodoForm refresh={refresh} />
      </div>
    </div>
  );
}