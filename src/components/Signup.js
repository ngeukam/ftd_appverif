import SocialLogins from "./common/Socialogin";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./form/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Form } from "antd";
import Button from "./common/button";
import { useI18n } from "../context/i18n";
import { userRegistration } from "../helpers/backend_helpers";
import swalAlert from "./common/alert";
import AuthComment from "./AuthComment";
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
const Signup = () => {
	const i18n = useI18n();
	const navigate = useNavigate();
	const [confirmPass, setConfirmPass] = useState();
	const [fcm_token, setFCMToken] = useState("");
	const onFinish = async (values) => {
		const data = {
			email: values.email,
			password: values.confirmPass,
			fcm_token: fcm_token,
			role: "user",
		};
		// Perform action when form is submitted
		try {
			showLoader();
			const response = await userRegistration(data);
			const { error, msg } = response || {};
			if (error === true) {
				switch (msg) {
					case "An account with this credential has already existed":
						swalAlert.error(
							"An account with this credential has already existed"
						);
						break;
					default:
						toast.error(
							i18n?.t("Registration failed") || "Registration failed"
						);

						break;
				}
			} else if (error === false) {
				swalAlert.success(
					"Please check your email and confirm your registration by clicking the link"
				);
			}
		} catch (error) {
			// Handle error if needed
			toast.error("Internal server error. Please try again later");
		} finally {
			hideLoader();
		}
	};

	useEffect(() => {
		async function getToken() {
			setFCMToken(localStorage.getItem("fcm_token"));
		}
		getToken();
	}, []);
	const onFinishFailed = (error) => {
		toast.error(
			i18n?.t("Please provide appropriate information") ||
				"Please provide appropriate information"
		);
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
						<h1 className="text-4xl font-bold text-white text-left mt-12 mb-6">
							{i18n?.t("Get Started") || "Get Started"}
						</h1>
					</div>
					<div className="flex-grow flex flex-col items-left">
						<p className="text-white text-lg mb-4 text-left">
							{i18n?.t("Create a new account") || "Create a new account"}
						</p>
						<Form
							layout="vertical"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							className="space-y-4 w-full md:w-3/4 lg:w-1/2"
						>
							<FormInput
								type="email"
								name={"email"}
								placeholder={i18n?.t("Enter Your Email") || "Enter Your Email"}
								// label={"Email"}
								required
								rules={[
									{
										type: "email",
										message: i18n?.t("Invalid email") || "Ivalid email",
									},
								]}
								style={inputStyle}
							/>
							<FormInput
								type="password"
								placeholder={
									i18n?.t("Enter Your Password") || "Enter Your Password"
								}
								name={"password"}
								required
								rules={[
									{
										min: 6,
										message:
											i18n?.t("Password must be at least 6 characters") ||
											"Password must be at least 6 characters",
									},
								]}
								style={inputStyle}
							/>
							<FormInput
								className="border-red-400"
								onChange={(e) => setConfirmPass(e.target.value)}
								type="password"
								placeholder={
									i18n?.t("Confirm Your Password") || "Confirm Your Password"
								}
								name={"confirmPassword"}
								dependencies={["password"]}
								required
								rules={[
									{
										required: true,
										message:
											i18n?.t("Please confirm your password!") ||
											"Please confirm your password!",
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue("password") === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error(
													i18n?.t(
														"The two passwords that you entered do not match!"
													) ||
														"The two passwords that you entered do not match!"
												)
											);
										},
									}),
								]}
								style={inputStyle}
							/>
							<Button
								disabled={!confirmPass?.length > 0}
								className="bg-twPrimary hover:bg-[#ff6347] text-lg rounded-lg border-1 mb-2 text-white w-full"
							>
								{!!i18n?.t ? i18n?.t("Register") : "Register"}
							</Button>
						</Form>
						{/* Bouton Google avec SocialLogins */}
						<SocialLogins role="user" />
						<p className="text-white text-left text-sm">
							{i18n?.t("Have an account?") || "Have an account?"}{" "}
							<button
								onClick={() => navigate("/auth/signin")}
								className="text-black font-bold"
							>
								{i18n?.t("Log in") || "Log in"}
							</button>
						</p>
						<p className="text-white text-left text-sm mb-4">
							{i18n?.t("By continuing, you agree to appVerif's") ||
								"By continuing, you agree to appVerif's"}{" "}
							<Link to="#" className="text-black hover:underline">
								{i18n?.t("Terms of Service") || "Terms of Service"}
							</Link>{" "}
							{i18n?.t("and") || "and"}{" "}
							<Link to="#" className="text-black hover:underline">
								{i18n?.t("Privacy Policy") || "Privacy Policy"}
							</Link>
						</p>
					</div>
				</div>

				{/* Bloc de droite avec citation */}
				<AuthComment />
			</div>
		</div>
	);
};

export default Signup;
