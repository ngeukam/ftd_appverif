import React from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useI18n } from "../context/i18n";
import { FaTrashAlt } from "react-icons/fa";

const ProjectCard = ({
	title,
	description,
	link,
	startDate,
	endDate,
	nbTester,
	nbTesterAs,
	appType,
	imageSrc,
	amount,
	appSize,
	code,
	isPaid,
	status,
	onDelete,
}) => {
	const i18n = useI18n();
	return (
		<div className="relative border rounded-lg p-4 shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 w-full h-70">
			{" "}
			{/* Changer w-64 à w-full */}
			{/* Green check badge */}
			{status === "completed" && (
				<div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-6.707a1 1 0 011.414 0L10 13.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			)}
			{/* Image positioned in top-left */}
			<img
				src={
					imageSrc ||
					process.env.REACT_BASE_URL +
						`/uploads/default-appverif.png`.substring(1)
				}
				alt={`${title}`}
				className="absolute top-2 left-2 w-12 h-12 object-cover rounded-full"
			/>
			<div className="flex justify-between items-center">
				<h3 className="font-bold text-xl mt-5 text-[#ff6347]">{title}</h3>
				<span
					className={`font-semibold text-xs mt-5 px-2 py-1 rounded-full ${
						isPaid ? "bg-green-500 text-white" : "bg-[#ff6347] text-white"
					}`}
				>
					{isPaid
						? i18n?.t("Paid") || "Paid"
						: i18n?.t("Not Paid") || "Not Paid"}
				</span>
			</div>
			<h3 className="text-lg text-gray-500 font-semibold">{code}</h3>
			{/* Truncate description to avoid overflow */}
			{description && (
				<p className="text-gray-600 overflow-hidden text-ellipsis h-16 line-clamp-3">
					{description}
				</p>
			)}
			{/* Info Section */}
			<div className="grid grid-cols-2 gap-x-4 text-sm text-gray-500 text-left">
				<div className="mb-2 text-2xs font-sans">
					<span>{i18n?.t("Amount") || "Amount"}:</span> ${amount?.toFixed(2)}
				</div>
				<div className="mb-2 text-2xs font-sans capitalize">
					<span>{i18n?.t("Type") || "Type"}:</span> {appType}
				</div>
				<div className="mb-2 text-2xs font-sans">
					<span>{i18n?.t("Begin") || "Begin"}:</span>{" "}
					{new Date(startDate).toLocaleDateString()}
				</div>
				<div className="mb-2 text-2xs font-sans">
					<span>{i18n?.t("End") || "End"}:</span>{" "}
					{new Date(endDate).toLocaleDateString()}
				</div>
				{appSize && (
					<div className="mb-2 text-2xs font-sans">
						<span>{i18n?.t("Size") || "Size"}:</span> {appSize} Mo
					</div>
				)}
				<div className="mb-2 text-2xs font-sans">
					<span>{i18n?.t("Testers Nb.") || "Testers Nb."}:</span> {nbTester}
				</div>
				<div className="mb-2 text-2xs font-sans">
					<span>{i18n?.t("Testers Ass.") || "Testers Ass."}:</span> {nbTesterAs}
				</div>
				<div
					className={`mb-2 text-2xs font-sans capitalize ${
						status === "not started"
							? "text-gray-500" // Couleur pour "not started"
							: status === "in progress"
							? "text-yellow-500" // Couleur pour "in progress"
							: status === "completed"
							? "text-green-500" // Couleur pour "completed"
							: "text-[#ff6347]" // Valeur par défaut si le statut est inconnu
					}`}
				>
					<span>{i18n?.t("Status.") || "Status"}:</span> {status}
				</div>
			</div>
			<div className="flex items-center justify-between">
				{link && (
					<Link
						to={link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600 font-semibold no-underline text-2xs"
					>
						{i18n?.t("Test link") || "Test link"} {title}
					</Link>
				)}
				{!isPaid && (
					<button
						onClick={onDelete} // Call the onDelete function when clicked
						className="px-2 py-1 btn btn-outline-danger btn-sm focus:shadow-none me-2"
						title="Delete"
					>
						<FaTrashAlt />
					</button>
				)}
			</div>
		</div>
	);
};

export default ProjectCard;
