import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import ChartComponent from '../components/ChartComponent';
import { FaMoneyBillWave, FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import AddBillModal from "../components/AddBillModal";
import MoneyPerDay from "../components/MoneyPerDay";


// Utility function to calculate income, expense, and balance from bills
const calculateStats = (bills) => {
  let income = 0;
  let expense = 0;

  bills.forEach(bill => {
    if (bill.money > 0) income += bill.money;
    else expense += bill.money;
  });

  const balance = income + expense;

  return { income, expense, balance };
};

const dataForChart = (bills) => {
  let dataPay = [];
  bills.forEach(bill => {
    if (bill.money < 0) dataPay.push(bill)
  });
  dataPay.forEach(bill => {
    console.log(bill);
  });
  return dataPay;
};


const Dashboard = () => {
  const [bills, setBills] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5555/api/bills")
      .then(res => { setBills(res.data), console.log(res.data) })
      .catch(err => console.error(err));
  }, []);
  const { balance } = calculateStats(bills);
  const dataPay = dataForChart(bills);
  const chiPhiCoDinh = [];
  bills.forEach(bill => {
    if (bill.note == 'cố định') { chiPhiCoDinh.push(bill) }
  })

  const handleAddBill = (billData) => {
    billData.note="cố định";
    axios.post("http://localhost:5555/api/bills", billData)
      .then((res) => {
        setBills([res.data, ...bills]);
        setShowAddModal(false);
      })
      .catch((err) => {
        console.error("Add bill error:", err);
      });
  };

  console.log(chiPhiCoDinh);
  console.log(dataPay);
  return (
    <div>
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 min-h-screen">
      {/* Tiêu đề dashboard */}
      <h2 className="text-3xl font-bold text-emerald-700">🎯 Dashboard</h2>

      {/* Tổng số dư */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaMoneyBillWave className="text-3xl text-yellow-500" />
          <h3 className="text-xl font-semibold">Số dư hiện tại</h3>
        </div>
        <span className={`text-2xl font-bold ${balance < 0 ? "text-red-600" : "text-green-600"}`}>
          {balance.toLocaleString()} đ
        </span>
      </div>

      {/* Biểu đồ chi tiêu */}
      <div className="flex gap-4 w-full">
        {/* Biểu đồ chi tiêu - 40% */}
        <div className="bg-white p-6 rounded-lg shadow" style={{ width: '40%' }}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            📊 Biểu đồ chi tiêu
          </h2>
          <div className="w-full h-[300px]">
            <ChartComponent bills={bills} />
          </div>
        </div>

        {/* Chi phí cố định - 30% */}
        <div className="bg-white p-6 rounded-lg shadow" style={{ width: '30%' }}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            💸 Chi phí cố định
          </h2>
          {chiPhiCoDinh.map((bill, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg mb-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
            >
              <div>
                <p className="font-medium">{bill.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(bill.date || bill.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`text-lg font-semibold ${bill.money < 0 ? 'text-red-600' : 'text-emerald-600'}`}
              >
                {bill.money.toLocaleString()} đ
              </span>
            </div>
          ))}
        </div>

        {/* Lương & Chi cố định - 30% */}
        <div className="bg-white p-6 rounded-lg shadow" style={{ width: '30%' }}>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaArrowCircleDown className="text-red-500" /> Chi phí cố định
          </h2>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition"
            onClick={() => setShowAddModal(true)}
          >
            + Thêm khoản chi
          </button>
        </div>
      </div>
      <div>
      <MoneyPerDay balance={balance}/>
    </div>
      {showAddModal && (
        <AddBillModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddBill}
          defaultNote="cố định"
        />
      )}
    </div>
    
</div>
  );
};

export default Dashboard;
