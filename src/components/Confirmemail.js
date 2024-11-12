import React, { useEffect } from "react";
import { confirmEmail } from "../helpers/backend_helpers";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFetch } from "../helpers/hooks"; // Ensure this is correctly imported
import swalAlert from "./common/alert";
import toast from "react-hot-toast";
import { useI18n } from "../context/i18n";
import Button from "./common/button";
import { Loader } from "./common/preloader";

const ConfirmEmail = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const token = searchParams.get("token");
	const i18n = useI18n();
	const [data, fetchData, { loading, error, errorMessage }] = useFetch(
		confirmEmail,
		{ token },
		false
	);

	// Use useAction to call confirmEmail with data containing the token
	useEffect(() => {
		const confirm = async () => {
			if (!token) {
				toast.error(
					!!i18n?.t
						? i18n?.t("Invalid or missing token")
						: "Invalid or missing token"
				);
				return;
			}
			fetchData(); // Call fetchData to trigger the fetch
			// Handle the response after fetching
			if (data && data.verified === true) {
				navigate("/auth/signin");
				swalAlert.success(
					!!i18n?.t
						? i18n?.t(
								"Your account has been successfully activated; you can log in"
						  )
						: "Your account has been successfully activated; you can log in"
				);
			} else {
				toast.error(!!i18n?.t
					? i18n?.t("Something is wrong")
					: "Something is wrong");
			}
		};

		confirm();
	}, []);
	if (loading) {
		return (
			<div>
				<Loader />
			</div>
		); // Loading state
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">Error: {errorMessage}</div>
			</div>
		); // Error handling
	}
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				{/* <h2 className="text-lg font-semibold">
					{!!i18n?.t ? i18n?.t("Email confirmation is being processed...") : "Email confirmation is being processed..."}
				</h2> */}
				<Button
					onClick={() => navigate("/")}
					className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-8 rounded-lg font-medium transition duration-200"
				>
					{!!i18n?.t ? i18n?.t("Go to Home Page") : "Go to Home Page"}
				</Button>
			</div>
		</div>
	);
};

export default ConfirmEmail;
