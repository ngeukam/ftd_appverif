import { useEffect } from "react";
import Header from "../components/admin/header/header";
import Footer from "../components/common/footer";
import { useUserDataContext } from "../context/userDataContext";
import { useNavigate } from "react-router-dom";
const AdminLayout = ({ children }) => {
	const { isLoggedIn } = useUserDataContext();
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLoggedIn) {
		  // Clear the localStorage and redirect to the login page
		  localStorage.removeItem("authToken");
		  localStorage.removeItem("auth_type");
		  localStorage.removeItem("authRole");
		  localStorage.clear();
		  navigate("/auth/signin"); // This triggers navigation after render
		}
	  }, [isLoggedIn, navigate]); // Only run when isLoggedIn changes
	return (
		<div className="dashboard flex flex-col min-h-screen">
			<Header />
			<div className="main-content flex-grow w-full sm:p-5 z-0">{children}</div>
			<Footer />
		</div>
	);
};
export default AdminLayout;

export const havePermission = (permission, roles) => {
	for (let role of roles || []) {
		if (role?.permissions?.includes(permission)) {
			return true;
		}
	}
	return false;
};
