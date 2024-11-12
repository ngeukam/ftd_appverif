import { Form } from "antd";
import { useI18n } from "../../../context/i18n";
import moment from "moment";
import { addFunds } from "../../../helpers/backend_helpers";
import toast from "react-hot-toast";
import { hideLoader, showLoader } from "../../common/preloader";
import swalAlert from "../../common/alert";
import { useEffect, useState } from "react";
import FormInput from "../../form/input";
import Button from "../../common/button";
import Card from "../../common/card";
import { FaCopy } from "react-icons/fa";
const inputStyle = {
	border: "1px solid #d9d9d9",
	borderRadius: "4px",
	padding: "8px",
	width: "100%",
	outline: "none",
	transition: "border-color 0.3s",
	fontSize: "15px",
};
const UserCardDetails = ({ currency_code, userDetails, getUserDetails }) => {
	const [user, setUser] = useState(userDetails);
	const [form] = Form.useForm();
	const { t } = useI18n();
	useEffect(() => {
		if (userDetails) {
			setUser(userDetails);
		}
	}, [userDetails]); // Re-run effect when userDetails changes

	const onFinish = async (values) => {
		const data = {
			userId: user?._id,
			amount: values.amount,
			depositMethod: values.depositMethod,
			reason: values.reason,
		};
		const result = await swalAlert.confirm(t("Recharge wallet"));

		if (result.isConfirmed) {
			try {
				showLoader();
				const response = await addFunds(data);
				const { msg } = response || {};
				switch (msg) {
					case "Missing required fields: userId, amount":
						toast.error("Missing required fields");
						break;
					case "User not found":
						toast.error("User not found");
						break;
					case "Amount should be a positive number":
						toast.error("Amount should be a positive number");
						break;
					case "Funds added successfully":
						getUserDetails();
						toast.success("Funds added successfully");
						break;
					default:
						toast.error("Failed to adding funds");
						break;
				}
			} catch (error) {
				console.error("Transaction aborted due to error:", error);
				toast.error("Transaction aborted due to error");
			} finally {
				hideLoader();
			}
		}
	};
	const handleCopy = (id) => {
		navigator.clipboard
			.writeText(id)
			.then(() => {
				toast.success("ID copied to clipboard!");
			})
			.catch((err) => {
				console.error("Failed to copy: ", err);
			});
	};
	const maskId = (id) => {
		if (!id) return '';
		const start = id.slice(0, 3); // First 3 characters
		const end = id.slice(-3); // Last 3 characters
		return `${start}****${end}`;
	  };
	return (
		<div>
			{/* header  */}
			<div className="h-16 border bg-white flex items-center justify-center text-[18px] font-semibold rounded-md">
				<h1 className="">{t("User Details")} </h1>
			</div>
			<div className="grid md:grid-cols-2 gap-x-10 h-fit">
				<div className="grid grid-cols-1">
					{/* project infos  */}
					<Card className="shadow-sm mt-[10px]" title={t("User infos")}>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 mt-2">
							<p>User Email</p>
							<p className="col-span-2">{user?.email}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 capitalize mt-2">
							<p>Country</p>
							<p className="col-span-2 capitalize">{user?.country}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 capitalize  mt-2">
							<p>Business</p>
							<p className="col-span-2 capitalize">{user?.business_types}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 capitalize mt-2">
							<p>Phone</p>
							<p className="col-span-2 ">{user?.phone_types?.join(", ")}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 capitalize mt-2">
							<p>Join on</p>
							<p className="col-span-2 ">
								{moment(user?.createdAt).format("MMM DD, YYYY")}
							</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[8px] px-2 capitalize mt-2">
							<p>Wallet amount</p>
							<p className="col-span-2 ">{`${
								currency_code ? currency_code : ""
							}${user?.totalWalletAmount.toFixed(2) || 0}`}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 mt-2 capitalize">
							<p>Tester</p>
							<p
								className={`col-span-2 font-semibold ${
									user?.is_tester ? "text-green-500" : "text-red-500"
								}`}
							>
								{user?.is_tester ? "Yes" : "No"}
							</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 mt-2 capitalize">
							<p>Verified</p>
							<p
								className={`col-span-2 font-semibold ${
									user?.verified ? "text-green-500" : "text-red-500"
								}`}
							>
								{user?.verified ? "Yes" : "No"}
							</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 capitalize mt-2">
							<p>Id</p>
							<p className="col-span-1">{maskId(user?._id)}</p>
							<button className="col-span-1">
								<FaCopy
									onClick={() => handleCopy(user?._id)}
									className="text-blue-500"
									size={20}
								/>
							</button>
						</div>
					</Card>
				</div>

				{/* Selected testers  */}
				<div className="grid grid-cols-1 h-fit">
					<Card className="shadow-sm mt-[10px]" title={t("Wallet Recharge")}>
						<Form form={form} onFinish={onFinish} layout="vertical">
							<FormInput
								name="amount"
								label={t("Amount")}
								required
								placeholder={t("Please enter amount")}
								type="number"
								style={inputStyle}
								min={0}
							/>
							<FormInput
								name="reason"
								label={t("Reason")}
								required
								placeholder={t("Please enter a reason")}
								style={inputStyle}
							/>
							<FormInput
								name="depositMethod"
								label={t("Deposit Method")}
								placeholder={t("Please enter deposit method")}
								type="text"
								style={inputStyle}
								extra={"Default Deposit Method is Cash"}
							/>
							<Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1 px-4 rounded-lg font-medium transition duration-200">
								{t("Recharge")}
							</Button>
						</Form>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default UserCardDetails;
