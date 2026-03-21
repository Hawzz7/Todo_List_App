export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow">
        <h2>Confirm Delete?</h2>

        <div className="flex gap-3 mt-4">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-3">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}