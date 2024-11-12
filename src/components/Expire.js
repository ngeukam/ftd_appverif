import React from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../context/i18n";

const LinkExpire = () => {
	const navigate = useNavigate();
	const i18n = useI18n();

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
			<div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
				<h2 className="text-2xl font-bold text-red-600 mb-4">
					{!!i18n?.t
						? i18n?.t("Access denied or Expired link")
						: "Access denied or Expired link"}
				</h2>
				<p className="text-gray-600 mb-6">
					{!!i18n?.t
						? i18n?.t(
								"We're sorry, but the link you are trying to access is no longer valid."
						  )
						: "We're sorry, but the link you are trying to access is no longer valid."}
					{!!i18n?.t
						? i18n?.t("Please contact support if you need further assistance.")
						: "Please contact support if you need further assistance."}
				</p>
				<div className="mt-6">
					<button
						className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
						onClick={() => navigate("/")} // Redirige vers le tableau de bord
					>
						{!!i18n?.t ? i18n?.t("Go to Web App") : "Go to Web App"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default LinkExpire;
