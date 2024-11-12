import { Form } from "antd";
import React from "react";
import Button from "../components/common/button";
import FormInput from "../components/form/input";
import { useI18n } from "../context/i18n";
import { checkEmailExist } from "../helpers/backend_helpers";
import { Link } from "react-router-dom";
import AuthComment from "./AuthComment";
import swalAlert from "./common/alert";
import toast from "react-hot-toast";
import { hideLoader, showLoader } from "./common/preloader";
const inputStyle = {
	border: "1px solid #d9d9d9",
	borderRadius: "4px",
	padding: "8px",
	width: "100%",
	outline: "none",
	transition: "border-color 0.3s",
	fontSize: "15px",
};
const ForgotPassword = () => {
	const i18n = useI18n();

	const handleEmailCheck = async (values) => {
		showLoader();
		try {
			const data = { email: values.email };
			const response = await checkEmailExist(data);
			const { msg, error } = response || {};
			if (error === false) {
				swalAlert.success("Password reset link has been sent to your email");
			} else if (error === true && msg === "No user found with that email") {
				toast.error("No user found with that email");
			}
		} catch (error) {
			toast.error("Internal server error. Please try again later");
		} finally {
			hideLoader();
		}
	};

	return (
		<div className="min-h-screen flex flex-col font-sans">
			<div className="flex flex-grow bg-blue shadow-lg overflow-hidden">
				<div
					className="w-full md:w-1/2 p-8 flex flex-col justify-center"
					style={{
						backgroundImage: "url(/tester-01_50.jpg)",
						backgroundPosition: "left center",
						backgroundSize: "cover",
					}}
				>
					<div>
						<Link to="/">
							<div>
								<img
									src="/appverif-logo.png"
									alt="Logo"
									className="w-30 h-20 absolute top-4 left-4"
								/>
							</div>
						</Link>
					</div>
					<div>
						<p className="text-white text-xl text-left">
							{!!i18n?.t ? i18n?.t("Email Verification") : "Email Verification"}
						</p>
						<Form
							layout="vertical"
							className="space-y-2 w-full md:w-3/4 lg:w-1/2"
							onFinish={handleEmailCheck}
						>
							<FormInput
								type="email"
								name={"email"}
								placeholder={
									!!i18n?.t ? i18n?.t("Enter your email") : "Enter your email"
								}
								required
								rules={[
									{
										type: "email",
										message: !!i18n?.t
											? i18n?.t("Invalid email")
											: "Invalid email",
									},
								]}
								style={inputStyle}
							/>
							<Button className="bg-twPrimary hover:bg-[#ff6347] text-lg rounded-lg border-1 mb-2 text-white w-full">
								{!!i18n?.t ? i18n?.t("Submit") : "Submit"}
							</Button>
						</Form>
					</div>
				</div>
				<AuthComment />
			</div>
		</div>
	);
};

export default ForgotPassword;
