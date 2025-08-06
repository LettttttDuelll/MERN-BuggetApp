import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

const AddBillModal = ({ onClose, onSubmit }) => {
    ////const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        money: '',
        date: '',
        type: '',
        note:''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.money || !formData.date || !formData.type) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        onSubmit(formData);  // Gửi dữ liệu lên component cha
        setFormData({ name: '', money: '', date: '', type: '' ,note:''}); // Reset form
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm"></div>
            <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2
                  bg-white p-6 rounded-lg shadow-lg w-[400px] space-y-4">
                <h2 className="text-xl font-semibold mb-2">Thêm Bill Mới</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Tên"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    name="money"
                    placeholder="Số tiền"
                    value={formData.money}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Chọn loại</option>
                    <option value="Chi tiêu">Chi tiêu</option>
                    <option value="Thu nhập">Thu nhập</option>
                </select>

                <input
                    type="text"
                    name="note"
                    placeholder="Note est: cố định"
                    value={formData.note}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </>

    );
};

export default AddBillModal;
