import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useUserDataContext } from "../../context/userDataContext";
import { postSocialLogin, verifyByEmail } from "../../helpers/backend_helpers";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader } from "./preloader";
import swalAlert from "./alert";
import { useI18n } from "../../context/i18n";
const SocialLogins = ({ role }) => {
	const i18n = useI18n();
	const { setIsLoggedIn, setAuthRole } = useUserDataContext();
	const [loading, setLoading] = useState(false);
	const auth = getAuth(app);
	const googleProvider = new GoogleAuthProvider();
	const navigate = useNavigate(); // Use navigate instead of router.push
	const location = useLocation();
	const handleGoogleLogin = () => {
		setLoading(true);
		signInWithPopup(auth, googleProvider)
			.then(async (result) => {
				const user = result.user;
				const data = {
					role: role,
					name: user.displayName,
					image: user.photoURL,
					email: user.email,
					idToken: user.accessToken,
					auth_type: "google",
				};
				// Handle the login based on the current path
				if (location?.pathname === "/auth/signin") {
					const { error, data: d } = await verifyByEmail({
						username: user?.email,
						role: role,
					});
					if (error === false) {
						socialLogin(data);
					} else {
						setLoading(false);
						toast.error(d);
					}
				} else socialLogin(data);
			})
			.catch((err) => {
				setLoading(false);
				toast.error(
					i18n?.t("Google login failed. Try again.") ||
						"Google login failed. Try again."
				);
			});
	};

	const socialLogin = async (data) => {
		const { error, token, msg, data: user } = await postSocialLogin(data);
		if (error) {
			setLoading(false);
			return toast.error(msg);
		}
		if (user?.is_tester) {
			if (error === false) {
				// Store token and auth_type in localStorage
				token && localStorage.setItem("authToken", token);
				user?.role && localStorage.setItem("authRole", user?.role);
				setAuthRole(user.role);
				user?.auth_type && localStorage.setItem("auth_type", user?.auth_type);
				setIsLoggedIn(true);
				setLoading(false);
				// Navigate after login
				switch (role) {
					case "admin":
						navigate("/admin"); // Use navigate directly
						break;
					case "user":
						navigate(`/user/dashboard`);
						break;
					case "employee":
						navigate("/employee");
						break;
					default:
						navigate("/");
				}
			}
		} else {
			setIsLoggedIn(true);
			token && localStorage.setItem("authToken", token);
			user?.role && localStorage.setItem("authRole", user?.role);
			setAuthRole(user.role);
			user?.auth_type && localStorage.setItem("auth_type", user?.auth_type);
			navigate(`/user/profile/?role=${role}&auth_type=${user?.auth_type}`);
			swalAlert.info(
				i18n?.t("Please complete your profile and toggle the switch to become a tester") ||
					"Please complete your profile and toggle the switch to become a tester"
			);
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<div className="relative z-10">
			<button
				onClick={handleGoogleLogin}
				className="w-full sm:w-3/4 md:w-3/4 lg:w-1/2 bg-transparent border border-gray-300 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center mb-4 transition duration-300 hover:bg-[#ff6347] hover:border-[#ff6347]"
			>
				<FcGoogle size={20} className="mr-2" />
				{location?.pathname === "/auth/signin"
					? i18n?.t(`Log in with Google`) || `Log in with Google`
					: i18n?.t(`Sign up with Google`) ||`Sign up with Google`}
			</button>
		</div>
	);
};

export default SocialLogins;
