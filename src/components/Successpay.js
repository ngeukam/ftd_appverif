import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPaymentDetails } from "../helpers/backend_helpers";
import { Loader } from "./common/preloader";
import toast from "react-hot-toast";
import { useI18n } from "../context/i18n";

const PaymentSuccess = () => {
	const i18n = useI18n();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [paymentDetails, setPaymentDetails] = useState(null);
	const token = searchParams.get("token");

	useEffect(() => {
		const fetchPaymentDetails = async () => {
			try {
				const response = await getPaymentDetails({ token });
				const { totalAmount, projectName, projectCode, message, success } =
					response || {};
				if (success === true) {
					setPaymentDetails({ totalAmount, projectName, projectCode });
				}
				if (message === "Internal server error") {
					toast.error(
						i18n?.t("This link has expired!") || "This link has expired!"
					);
					navigate("/403-page");
				}
			} catch (error) {
				console.error("Error fetching payment details:", error);
			}
		};

		if (token) {
			fetchPaymentDetails();
		}
	}, [token]);

	if (!paymentDetails) {
		return <Loader />;
	}

	const { totalAmount, projectName, projectCode } = paymentDetails;

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
			<div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
				<h2 className="text-2xl font-bold text-green-600 mb-4">
					{i18n?.t("Payment successfully completed") ||
						"Payment successfully completed"}
				</h2>
				<p className="text-lg mb-2">
					{i18n?.t("Thank you for choosing us!") ||
						"Thank you for choosing us!"}
				</p>

				<div className="mb-4">
					<h3 className="font-semibold text-gray-700">
						{i18n?.t("Payment Details") || "Payment Details"}
					</h3>
					<p className="text-gray-600">
						<strong>{i18n?.t("Amount") || "Amount"}:</strong>{" "}
						{totalAmount?.toFixed(2)} $
					</p>
				</div>
				<div className="mb-4">
					<h3 className="font-semibold text-gray-700">
						{i18n?.t("App name") || "App name"}: {projectName}
					</h3>
					<p className="text-gray-600">
						<strong>{i18n?.t("App code") || "App code"}:</strong> {projectCode}
					</p>
					<p className="text-gray-600 text-sm leading-relaxed mt-4">
						{i18n?.t(
							"The test process is launched, and you will receive an email from us."
						) ||
							"The test process is launched, and you will receive an email from us."}
					</p>
					<p className="text-gray-600 text-sm leading-relaxed mt-2">
						
						{i18n?.t(
							"Please keep the project code for future communication with us."
						) ||
							"Please keep the project code for future communication with us."}
					</p>
				</div>

				<div className="mt-6">
					<button
						className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
						onClick={() => navigate("/user/my-apps")}
					>
						{i18n?.t("Go to your Apps") || "Go to your Apps"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;
