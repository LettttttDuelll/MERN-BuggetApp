import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddBillModal from '../components/AddBillModal';
import ChartComponent from '../components/ChartComponent';
import DeleteBillModal from '../components/DeleteBillModal';
import { Navigate } from 'react-router-dom';

const apiUrl = (import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_API_URL
  : import.meta.env.VITE_API_URL
)

const Expense = () => {
  const [bills, setBills] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    console.log('get all bills')
    axios
      //.get('http://localhost:5555/api/bills')
      .get(`${apiUrl}api/bills`)
      .then((reponse) => {
        console.log(reponse.data);
        let raw = reponse.data.data ?? reponse.data;
        //const sorted = raw.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const sorted = raw.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setBills(sorted);
        //setBills(reponse.data);
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const handleAddBill = (billData) => {
    axios
      ///.post("http://localhost:5555/api/bills", billData)
      .post(`${apiUrl}api/bills`,billData)
      .then((res) => {
        setBills([res.data, ...bills]);
        setShowAddModal(false);
      })
      .catch((err) => {
        console.error("Add bill error:", err);
      });
  };

  const handleDeleteBill = (id) => {
    axios
      //.delete(`http://localhost:5555/api/bills/${id}`)//ffff
      .delete(`${apiUrl}api/bills/${id}`)
      .then((res) => {
        setBills(prev => prev.filter(bill => bill._id !== id));
        setShowDeleteModal(false);
        //navigate(`/expense`);
      })
      .catch((error) => {
        console.log('Delete fails ', error);
      })
  };

  return (
      <div className="w-full h-[800px] p-5 space-y-5">
        <div className="w-full h-1/2 rounded-lg">
          <div className="w-full h-[350px]">
            <ChartComponent bills={bills} />
          </div>
        </div>
        <div className="bg-white w-full h-1/2 rounded-lg p-4 relative">
          <button
            className="absolute top-4 right-4 bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-2 rounded-lg shadow flex items-center gap-2 transition"
            onClick={() => setShowAddModal(true)}>
            <FaPlus />
            Thêm bill
          </button>

          <h2 className="text-black text-xl font-bold mb-4">Expense Table</h2>

          <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Tên</th>
                  <th className="px-4 py-3">Tiền</th>
                  <th className="px-4 py-3">Loại</th>
                  <th className="px-4 py-3">Ngày</th>
                  <th className="px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={bill._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2">{bill.name}</td>
                    <td className={`px-4 py-2 font-medium ${bill.money < 0 ? 'text-red-500' : 'text-green-600'}`}>
                      {bill.money.toLocaleString('vi-VN')}₫
                    </td>
                    <td className="px-4 py-2">{bill.type}</td>
                    <td className="px-4 py-2">{new Date(bill.createdAt).toLocaleString('vi-VN')}</td>
                    <td className="px-4 py-2 flex justify-center items-center gap-3 text-lg">
                      <Link to={`/bills/detail/${bill._id}`} className="text-blue-500 hover:text-blue-700 transition">
                        <FaEye />
                      </Link>
                      <Link to={`/bills/edit/${bill._id}`} className="text-yellow-500 hover:text-yellow-600 transition">
                        <FaEdit />
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedBill(bill);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Gọi modal nếu showModal = true */}
        {showAddModal && (
          <AddBillModal
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddBill}
          />
        )};

        {showDeleteModal && (
          <DeleteBillModal
            bill={selectedBill}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleDeleteBill}
          />
        )};
      </div>
  );
}
export default Expense