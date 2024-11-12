import { Navigate } from "react-router-dom";
import { useUserDataContext } from "../../context/userDataContext"; // Adjust path as needed

const ProtectedRoute = ({ children, role }) => {
	const { isLoggedIn, authrole } = useUserDataContext();
	// If not logged in, redirect to sign-in page
	if (!isLoggedIn) {
		return <Navigate to="/auth/signin" replace />;
	}
// Check for role-based access
	if (role && authrole !== role) {
		return <Navigate to="/403-page" replace />;
	}

	return children;
};

export default ProtectedRoute;
