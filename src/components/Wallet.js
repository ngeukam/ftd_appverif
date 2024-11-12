import React, { useEffect, useState } from "react";
import { AiOutlineWallet } from "react-icons/ai"; // Make sure to install react-icons
import { getWalletBalance } from "../helpers/backend_helpers";
import toast from "react-hot-toast";
import FormInput from "./form/input";
import FormSelect from "./form/FormSelect";
import { withdrawRequest } from "../helpers/backend_helpers";
import Button from "./common/button";
import { Form } from "antd";
import swalAlert from "./common/alert";
import { useI18n } from "../context/i18n";

const inputStyle = {
	border: "1px solid #d9d9d9",
	borderRadius: "4px",
	padding: "8px",
	width: "100%",
	outline: "none",
	transition: "border-color 0.3s",
	fontSize: "18px",
};
const Wallet = () => {
	const i18n = useI18n();
	const [showForm, setShowForm] = useState(false);
	const [balance, setBalance] = useState(0);
	const [loading, setLoading] = useState(false);
	const [loading2, setLoading2] = useState(false);
	const [formData, setFormData] = useState({
		amount: "",
		method_name: "",
		account_details:""
	});
	useEffect(() => {
		const fetchWalletBalance = async () => {
			setLoading2(true);
			try {
				const response = await getWalletBalance();
				if (response.message === "Permission Denied") {
					toast.error("Error when retireve balance");
				}
				setBalance(response?.balance);
			} catch (error) {
				console.error("Error fetching wallet balance:", error);
			} finally {
				setLoading2(false);
			}
		};

		fetchWalletBalance();
	}, []);
	const handleInputChange = async (name, value) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const handleChange = async (name, value) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};
	const handleSubmit = async () => {
		if (!formData.amount || !formData.method_name || !formData.account_details) {
			toast.error(
				i18n?.t("All fields are required") ||
					"All fields are required"
			);
			return;
		}
		setLoading(true);
		try {
			const response = await withdrawRequest(formData);
			switch (response?.message) {
				case "Insufficient funds":
					swalAlert.warning(
						i18n?.t("Insufficient funds in wallet") ||
							"Insufficient funds in wallet"
					);
					break;
				case "Withdrawal request submitted":
					swalAlert.success(
						`Request to pay $${response.withdraw.amount} using ${response.withdraw.payment_accept.method_name} has been submitted!`
					);
					break;
				default:
					toast.error(
						i18n?.t("Unexpected response from withdrawal.") ||
							"Unexpected response from withdrawal."
					);
			}
			// Reset the form
			setFormData({ amount: "", method_name: "" });
			setShowForm(false);
		} catch (error) {
			console.error("Error during withdrawal request :", error);
			toast.error("Error during withdrawal request");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<div className="bg-[#ff6347] text-white rounded-full p-3 mr-4">
						<AiOutlineWallet size={24} />
					</div>
					<div>
						<h2 className="text-lg font-bold">
							{i18n?.t("Wallet Balance") || "Wallet Balance"}
						</h2>
						<p className="text-gray-600">
							{loading2
								? i18n?.t("Loading...") || "Loading..."
								: "$" + balance?.toFixed(2)}
						</p>
					</div>
				</div>
				<button
					onClick={() => setShowForm(!showForm)}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
				>
					{showForm
						? i18n?.t("Cancel") || "Cancel"
						: i18n?.t("Request Payment") || "Request Payment"}
				</button>
			</div>

			{showForm && (
				<Form onFinish={handleSubmit} className="mt-4">
					<div className="flex flex-col">
						<div>
							<label className="block text-gray-700 font-semibold">
								{i18n?.t("Amount to Pay") || "Amount to Pay"}:
							</label>
							<FormInput
								name="amount"
								type="number"
								onChange={(e) => handleInputChange("amount", e.target.value)}
								style={inputStyle}
								placeholder={
									i18n?.t("Please enter amount to pay") ||
									"Please enter amount to pay"
								}
								required
								min={0}
								onWheel={(e) => e.target.blur()} // Désactive l'incrémentation lors du scroll
							/>
						</div>
						<div>
							<label className="block text-gray-700 font-semibold">
								{i18n?.t("Payment Method") || "Payment Method"}:
							</label>
							<FormSelect
								name="method_name"
								initialValue={formData.method_name}
								options={[
									{ label: "Mobile Money", value: "Mobile Money" },
									{ label: "Cash", value: "Cash" },
									{
										label: i18n?.t("Bank Transfer") || "Bank Transfer",
										value: "Bank Transfer",
									},
								]}
								onSelect={(value) => handleChange("method_name", value)}
								required
							/>
						</div>
						<div>
							<label className="block text-gray-700 font-semibold">
								{i18n?.t("Account Details") || "Account Details"}:
							</label>
							<FormInput
								name="account_details"
								textArea={true}
								onChange={(e) =>
									handleInputChange("account_details", e.target.value)
								}
								style={inputStyle}
								required
							/>
						</div>

						<Button
							disabled={loading}
							className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-8 rounded-lg font-medium transition duration-200"
						>
							{loading
								? i18n?.t("Processing...") || "Processing..."
								: i18n?.t("Submit payment request") || "Submit payment request"}
						</Button>
					</div>
				</Form>
			)}
		</div>
	);
};

export default Wallet;
