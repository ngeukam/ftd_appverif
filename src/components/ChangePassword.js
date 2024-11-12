import { Form } from "antd";
import React, { useState } from "react";
import swalAlert from "../components/common/alert";
import Button from "../components/common/button";
import FormInput from "../components/form/input";
import { useI18n } from "../context/i18n";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { changePassword } from "../helpers/backend_helpers";
import AuthComment from "./AuthComment";
const inputStyle = {
	border: "1px solid #d9d9d9",
	borderRadius: "4px",
	padding: "8px",
	width: "100%",
	outline: "none",
	transition: "border-color 0.3s",
	fontSize: "15px",
};
const ChangePassword = () => {
	const i18n = useI18n();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const token = searchParams.get("token");

	const handleChangePassword = async (values) => {
		setLoading(true);
		const data = {
			newPassword: values.new_password,
			confirmPassword: values.confirm_password,
			token: token,
		};
		const { error, msg } = await changePassword(data);
		if (error === false) {
			setLoading(false);
			swalAlert.success(
				!!i18n?.t
					? i18n?.t(
							"Successfully changed you Password. Please Login again to continue"
					  )
					: "Successfully changed you Password. Please Login again to continue"
			);

			navigate("/auth/signin");
		} else {
			swalAlert.error(msg);
			setLoading(false);
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
							{!!i18n?.t ? i18n?.t("Change Password") : "Change Password"}
						</p>
						<Form
							layout="vertical"
							onFinish={handleChangePassword}
							className="space-y-2 w-full md:w-3/4 lg:w-1/2"
						>
							<FormInput
								type="password"
								name={"new_password"}
								placeholder={
									!!i18n?.t ? i18n?.t("New Password") : "New Password"
								}
								required
								rules={[
									{
										min: 6,
										message: !!i18n?.t
											? i18n?.t("Password must be at least 6 characters")
											: "Password must be at least 6 characters",
									},
								]}
								style={inputStyle}
							/>

							<FormInput
								type="password"
								name={"confirm_password"}
								placeholder={
									!!i18n?.t
										? i18n?.t("Confirm New Password")
										: "Confirm New Password"
								}
								dependencies={["new_password"]}
								required
								rules={[
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue("new_password") === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error(
													!!i18n?.t
														? i18n?.t(
																"The two passwords that you entered do not match!"
														  )
														: "The two passwords that you entered do not match!"
												)
											);
										},
									}),
								]}
								style={inputStyle}
							/>
							<div>
								<Button
									disabled={loading ? true : false}
									className="bg-twPrimary hover:bg-[#ff6347] text-lg rounded-lg border-1 mb-2 text-white w-full"
								>
									{!!i18n?.t ? i18n?.t("Update Password") : "Update Password"}
								</Button>
							</div>
						</Form>
					</div>
				</div>
				<AuthComment />
			</div>
		</div>
	);
};

export default ChangePassword;
