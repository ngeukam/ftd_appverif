import { Checkbox, Form } from "antd";
import SocialLogins from "./common/Socialogin";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserDataContext from "../context/userDataContext";
import FormInput from "./form/input";
import Button from "./common/button";
import { useI18n } from "../context/i18n";
import { postLogin } from "../helpers/backend_helpers";
import toast from "react-hot-toast";
import swalAlert from "./common/alert";
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
const Login = () => {
	const navigate = useNavigate();
	const i18n = useI18n();
	const [rememberMe, setRemembeMe] = useState(false);
	const { setIsLoggedIn, setAuthRole } = useContext(UserDataContext);
	const [form] = Form.useForm();
	const [fcm_token, setFCMToken] = useState("");
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		async function getToken() {
			setFCMToken(localStorage.getItem("fcm_token"));
		}
		getToken();
	}, []);
	const handleLoginSubmit = async (values) => {
		setLoading(true);
		const data = {
			username: values.username,
			password: values.password,
			fcm_token: fcm_token,
			rememberMe: rememberMe,
		};
		// Perform login
		const { error, msg, token, data: user } = await postLogin(data);
		// If login is successful and user is verified
		if (error === false && user?.verified === true) {
			if (token) {
				localStorage.setItem("authToken", token);
			  }
		  
			  if (user?.role) {
				localStorage.setItem("authRole", user.role); // Set role in localStorage
				setAuthRole(user.role); // Immediately update context state
			  }
			setIsLoggedIn(true);
			setLoading(false);
			setRemembeMe(false);

			// Helper function to handle navigation based on role
			const navigateToRole = (role) => {
				const roleRoutes = {
					admin: "/admin",
					user: user?.is_tester ? "/user/dashboard" : "/user/profile", // Navigate to dashboard if tester, otherwise profile
					employee: "/employee",
				};
				navigate(roleRoutes[role] || "/");
			};

			// Navigate based on user role
			navigateToRole(user?.role);

			// If user is not a tester, show an info message
			if (!user?.is_tester) {
				swalAlert.info(
					i18n?.t(
						"Please complete your profile and toggle the switch to become a tester"
					) ||
						"Please complete your profile and toggle the switch to become a tester"
				);
			}

			return;
		}

		// Error handling function
		const handleError = (msg) => {
			setLoading(false);
			const errorMessages = {
				"Your account is not verified. A verification email has been sent.": () => {
					swalAlert.info(msg);
				},
				"Wrong credentials": () => {
					toast.error(i18n?.t("Wrong credentials") || "Wrong credentials");
				},
				"Invalid credentials": () => {
					toast.error(i18n?.t("Invalid credentials") || "Invalid credentials");
				},
				"User not found": () => {
					toast.error(i18n?.t("User not found") || "User not found");
				},
				default: () => {
					toast.error(i18n?.t("Server failed") || "Server failed");
				},
			};

			// Execute the appropriate error message or default
			(errorMessages[msg] || errorMessages.default)();
		};

		// If there is an error, handle it
		if (error) {
			handleError(msg);
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
									className="w-30 h-20 absolute top-4 left-4 mb-2"
								/>
							</div>
						</Link>
						<h1 className="text-4xl font-bold text-white text-left mt-5  mb-6">
							{!!i18n?.t ? i18n?.t("Welcome back") : "Welcome back"}
						</h1>
					</div>
					<div>
						<p className="text-white text-xl text-left">
							{!!i18n?.t
								? i18n?.t("Get your app tested before deployment")
								: "Looking for app testers or interested in becoming one?"}
						</p>
						<Form
							form={form}
							layout="vertical"
							name="contact"
							onFinish={handleLoginSubmit}
							className="space-y-4 w-full md:w-3/4 lg:w-1/2"
						>
							<FormInput
								className="formInput"
								name="username"
								placeholder={
									!!i18n?.t ? i18n?.t("Email or Phone") : "Email or Phone"
								}
								required
								style={inputStyle}
							/>
							<FormInput
								type="password"
								placeholder={!!i18n?.t ? i18n?.t("Password") : "Password"}
								name="password"
								required
								style={inputStyle}
							/>
							<Checkbox
								onChange={() => setRemembeMe(!rememberMe)}
								defaultChecked={false}
								className="text-twContent-muted text-gray-800 text-sm mb-2"
							>
								{!!i18n?.t ? i18n?.t("Remember me") : "Remember me"}
							</Checkbox>
							<Button
								disabled={loading ? true : false}
								className="bg-twPrimary hover:bg-[#ff6347] text-lg rounded-lg border-1 mb-2 text-white w-full"
							>
								{!!i18n?.t ? i18n?.t("Log in") : "Log in"}
							</Button>
						</Form>

						<SocialLogins role="user" />
						<p className="text-white text-left text-sm">
							{!!i18n?.t
								? i18n?.t("Don't have an account?")
								: "Don't have an account?"}{" "}
							<button
								onClick={() => navigate("/auth/signup")}
								className="text-black font-bold"
							>
								{!!i18n?.t ? i18n?.t("Register") : "Register"}
							</button>
						</p>
						<p className="text-white text-left text-sm">
							<button
								onClick={() => navigate("/auth/email-verification")}
								className="text-white text-xs font-medium"
							>
								{!!i18n?.t
									? i18n?.t("Forgot your password?")
									: "Password forgot?"}
							</button>
						</p>
						<p className="text-white text-left text-sm mb-4">
							{!!i18n?.t
								? i18n?.t("By continuing, you agree to appVerif's")
								: "By continuing, you agree to appVerif's"}{" "}
							<Link to="#" className="text-black hover:underline">
								{!!i18n?.t ? i18n?.t("Terms of Service") : "Terms of Service"}
							</Link>{" "}
							{!!i18n?.t ? i18n?.t("and") : "and"}{" "}
							<Link to="#" className="text-black hover:underline">
								{!!i18n?.t ? i18n?.t("Privacy Policy") : "Privacy Policy"}
							</Link>
						</p>
					</div>
				</div>
				<AuthComment />
			</div>
		</div>
	);
};

export default Login;
