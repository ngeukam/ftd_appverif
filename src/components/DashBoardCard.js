// DashboardCard.js
import React from "react";

const DashboardCard = ({ title, count, icon, loading }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between h-40">
      <div className={`${loading ? 'text-gray-500 font-lg':'text-2xl font-bold text-gray-800'}`}>{count}</div>
      <div className="text-gray-500">{title}</div>
      <div className="text-blue-500 text-3xl">{icon}</div>
    </div>
  );
};

export default DashboardCard;
