import React, { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai"; // Make sure to install react-icons
import { getWithdrawals } from "../helpers/backend_helpers";
import { useI18n } from "../context/i18n";

const Withdraw = () => {
	const i18n = useI18n();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4; // Number of items per page
	const [withdraws, setWithdraws] = useState([]);
	const [loading, setLoading] = useState(true);

	const [limit, setLimit] = useState(10); // Initial limit

	useEffect(() => {
		const fetchWithdrawals = async () => {
			setLoading(true); // Set loading to true at the start
			try {
				const response = await getWithdrawals({ limit });
				setWithdraws(response.docs);
			} catch (error) {
				console.error("Error fetching withdraws:", error);
			} finally {
				setLoading(false); // Set loading to false when done
			}
		};
		fetchWithdrawals();
	}, [limit]); // Re-fetch data whenever limit changes
	// Calculate the current items to display
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentWithdraws = withdraws.slice(indexOfFirstItem, indexOfLastItem);

	// Calculate the total number of pages
	const totalPages = Math.ceil(withdraws.length / itemsPerPage);

	// Handle pagination
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Handle refresh
	const handleRefresh = async () => {
		setLimit((prevLimit) => prevLimit + 10); // Increase limit by 10 each time
	};

	return (
		<div className="bg-white shadow-md rounded-lg p-6 mt-8">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-bold">
					{i18n?.t("Withdrawal Status") || "Withdrawal Status"}
				</h2>
				<button
					onClick={handleRefresh}
					className="text-gray-600 hover:text-blue-500"
				>
					<AiOutlineReload size={20} />
				</button>
			</div>

			{/* Table or loading message */}
			{loading ? (
				<p className="text-center text-gray-500">
					{i18n?.t("Loading...") || "Loading..."}
				</p>
			) : (
				<table className="min-w-full divide-y divide-gray-200">
					<thead>
						<tr>
							<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
								Ref
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
								{i18n?.t("Amount") || "Amount"}
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
								{i18n?.t("Method") || "Method"}
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
								{i18n?.t("Status") || "Status"}
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{currentWithdraws.map((withdraw) => (
							<tr key={withdraw._id}>
								<td className="px-4 py-2 text-sm text-gray-600">
									{withdraw.ref}
								</td>
								<td className="px-4 py-2 text-sm text-gray-600">
									${withdraw.amount?.toFixed(2)}
								</td>
								<td className="px-4 py-2 text-sm text-gray-600 capitalize">
									{withdraw.payment_accept.method_name}
								</td>
								<td className="px-4 py-2 text-sm text-gray-600 capitalize">
									{withdraw.status}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{/* Pagination */}
			<div className="flex justify-center mt-4">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						onClick={() => paginate(index + 1)}
						className={`mx-1 py-1 px-3 rounded ${
							currentPage === index + 1
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-800"
						}`}
					>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default Withdraw;
