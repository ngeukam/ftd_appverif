import React from 'react';

const AdminDashboardCards = ({ stat, title, icon }) => {
    return (
        <div className='flex py-[23px] px-10 shadow-md rounded-md justify-between items-center max-w-lg bg-white gap-x-1'>
            <div>
                <p className='text-[40px]'>{stat}</p>
                <p className='text-[22px]'>{title}</p>
            </div>
            <div className='text-[70px] p-2 bg-gradient-to-br from-[#ff6347] to-[#ff6347] rounded text-white'>
                {icon}
            </div>
        </div>
    );
};

export default AdminDashboardCards;