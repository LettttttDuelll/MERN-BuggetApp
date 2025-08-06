import React from "react";

const DeleteBillModal = ({ bill, onClose, onDelete }) => {
  return (
    <>
      {/* Nền mờ */}
      <div className="fixed inset-0 z-40 bg-white/30 backdrop-blur-md backdrop-brightness-105"></div>
      {/* Modal chính */}
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2
                      bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-4">
        <h2 className="text-xl font-semibold text-red-600">Xác nhận xoá</h2>
        <p>
          Bạn có chắc chắn muốn xoá bill: <strong>{bill?.name}</strong> với số tiền <strong>{bill?.money.toLocaleString()}đ</strong> không?
        </p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Huỷ
          </button>
          <button
            onClick={() => onDelete(bill._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Xoá
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteBillModal;
