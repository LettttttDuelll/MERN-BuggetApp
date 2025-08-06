import React from "react";

const MoneyPerDay = ({ balance }) => {
    const today = new Date();
    const totalDaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const remainingDays = totalDaysInMonth - today.getDate() + 1;

    const balancePerDay = remainingDays > 0 ? balance / remainingDays : 0;

    return (
        <div className="space-y-2  flex">
            <div className="Money w-1/2 border p-1 m-1 ">
                <div>Số dư:
                    <span className={balance < 0 ? "text-red-600" : "text-green-600"}>
                        {balance.toLocaleString()} đ
                    </span>
                </div>

                <div>Trung bình mỗi ngày còn lại:
                    <span className={balancePerDay < 0 ? "text-red-600" : "text-blue-600"}>
                        {balancePerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })} đ/ngày
                    </span>
                </div>
            </div>

            <div className="noteSomeThing ">
                <div>
                    {balance < 0 ? (
                        <span>âm tiền mà vẫn tính được</span>
                    ) : (
                        balancePerDay<20 ? (
                            <span>đói</span>
                        ):(
                            balancePerDay>25 && balancePerDay<35 ?(
                                <span> +1 ăn ngoài</span>
                            ):(
                                <span> giàu to </span>
                            )
                        )
                    )}
                </div>
            </div>

        </div>
    );
};

export default MoneyPerDay;
