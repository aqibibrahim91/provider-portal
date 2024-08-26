import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, record, session }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
        <p>Are you sure you want to delete this record?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white bg-red px-4 py-2 rounded mr-2"
            onClick={() => onConfirm(record)}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
