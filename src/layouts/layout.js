import Header from "../components/common/header";
import Footer from "../components/common/footer";
import { useUserDataContext } from "../context/userDataContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const RootLayout = ({ children }) => {
	const { isLoggedIn } = useUserDataContext();
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLoggedIn) {
			// Clear the localStorage and redirect to the login page
			localStorage.removeItem("authToken");
			localStorage.removeItem("auth_type");
			localStorage.removeItem("authRole");
			localStorage.clear();
			navigate("/auth/signin");
		}
	}, [isLoggedIn, navigate]);
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};

export const LandingLayout = ({ children }) => {
	const { isLoggedIn } = useUserDataContext();
	useEffect(() => {}, [isLoggedIn]);

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};

// Exporter LoginLayout comme exportation nommée
export const LoginLayout = ({ children }) => {
	return <main>{children}</main>;
};
export default LoginLayout;
