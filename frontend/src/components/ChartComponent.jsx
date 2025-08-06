// src/components/ChartComponent.jsx
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Đăng ký các thành phần cần dùng
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const ChartComponent = ({ bills }) => {
  // Gộp các khoản chi tiêu (money < 0) theo ngày
  const groupedData = {};

  bills.forEach((bill) => {
    if (bill.money < 0) {
      const date = new Date(bill.ngayHienTai).toLocaleDateString("vi-VN");
      if (!groupedData[date]) groupedData[date] = 0;
      groupedData[date] += bill.money; // Cộng dồn chi tiêu (âm)
    }
  });

  // Chuyển dữ liệu thành mảng để vẽ biểu đồ
  const dataPay = Object.entries(groupedData).map(([date, money]) => ({
    date,
    money: Math.abs(money), // Hiển thị số dương
  }));

  // Sắp xếp theo ngày
  dataPay.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/");
    const [dayB, monthB, yearB] = b.date.split("/");
    return new Date(`${yearA}-${monthA}-${dayA}`) - new Date(`${yearB}-${monthB}-${dayB}`);
  });

  const data = {
    labels: dataPay.map((b) => b.date),
    datasets: [
      {
        label: "Chi tiêu",
        data: dataPay.map((b) => b.money),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Biểu đồ chi tiêu theo ngày" },
    },
  };

  return (
    <div className="w-full h-full">
      <Line key={JSON.stringify(data)} data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
