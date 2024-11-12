import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useI18n } from "../context/i18n";
const JobCard = ({
	title,
	description,
	amount,
	link,
	endDate,
	startDate,
	appType,
	appSize,
	code,
	imageSrc,
	onAccept,
	onDecline,
	isPaid,
	tesTed,
}) => {
	const location = useLocation();
	const i18n = useI18n();
	return (
		<div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out mb-6 max-w-lg mx-auto p-6 flex flex-col items-center">
			{tesTed === "completed" && (
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
			{location.pathname === "/user/assigned-jobs" && (
				<span
					className={`font-semibold text-xs px-2 py-1 rounded-full absolute top-4 left-4 ${
						isPaid ? "bg-green-500 text-white" : "bg-[#ff6347] text-white"
					}`}
				>
					{isPaid
						? !!i18n?.t
							? i18n?.t("Paid")
							: "Paid"
						: !!i18n?.t
						? i18n?.t("Not Paid")
						: "Not Paid"}
				</span>
			)}
			<p className="font-medium text-gray text-xs flex-grow">{code}</p>

			{/* Circular Image */}
			<div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
				<img
					src={
						imageSrc ||
						process.env.REACT_BASE_URL +
							`/uploads/default-appverif.png`.substring(1)
					}
					alt={`${title}`}
					className="object-cover w-full h-full"
				/>
			</div>

			{/* Content Section */}
			<div className="text-center">
				<h3 className="text-xl font-bold text-[#ff6347]">{title}</h3>
				{description && (
					<p className="text-gray-600 mt-1 mb-2 line-clamp-2 overflow-hidden text-ellipsis">
						{description}
					</p>
				)}

				{/* Info Section */}
				<div className="grid grid-cols-2 gap-x-4 text-sm text-gray-500 text-left">
					<div className="mb-2 text-2xs font-sans">
						<span>{!!i18n?.t ? i18n?.t("Amount") : "Amount"}:</span> $
						{amount?.toFixed(2)}
					</div>
					<div className="mb-2 text-2xs font-sans capitalize">
						<span>{!!i18n?.t ? i18n?.t("Type") : "Type"}:</span> {appType}
					</div>
					<div className="mb-2 text-2xs font-sans">
						<span>{!!i18n?.t ? i18n?.t("Begin") : "Begin"}:</span>{" "}
						{new Date(startDate).toLocaleDateString()}
					</div>
					<div className="mb-2 text-2xs font-sans">
						<span>{!!i18n?.t ? i18n?.t("End") : "End"}:</span>{" "}
						{new Date(endDate).toLocaleDateString()}
					</div>
					{appSize && (
						<div className="mb-2 text-2xs font-sans">
							<span>{!!i18n?.t ? i18n?.t("Size") : "Size"}:</span> {appSize} Mo
						</div>
					)}
				</div>

				{link && (
					<div>
						<Link
							to={link}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 font-semibold no-underline text-sm"
						>
							{!!i18n?.t ? i18n?.t("Test link") : "Test link"} {title}
						</Link>
					</div>
				)}

				{/* Link and Actions */}
				{(onAccept || onDecline) && (
					<div className="flex items-center justify-center mt-2 space-x-2">
						<button
							onClick={onAccept}
							className="bg-green-500 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-green-600 transition-colors"
						>
							{!!i18n?.t ? i18n?.t("Accept") : "Accept"}
						</button>
						<button
							onClick={onDecline}
							className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-red-600 transition-colors"
						>
							{!!i18n?.t ? i18n?.t("Decline") : "Decline"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default JobCard;
