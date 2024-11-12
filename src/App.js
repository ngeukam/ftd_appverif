import "./App.css";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import MyAppPage from "./pages/myapp";
import SignupPage from "./pages/signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/project";
import LandingPage from "./pages/landing";
import PaymentSuccessPage from "./pages/successpayment";
import LinkExpirePage from "./pages/expire";
import DashboardPage from "./pages/dashboard";
import MyJobPage from "./pages/myjob";
import WalletPage from "./pages/walletwithdraw";
import MyAssignedJobPage from "./pages/assignedjob";
import ConfirmEmailPage from "./pages/confirmemail";
import RouteLoader from "./components/common/preloader";
import ForgotPage from "./pages/forgot";
import ChangePassPage from "./pages/changepass";
import ProtectedRoute from "./components/common/ProtectedRoute";
import NotFoundPage from "./pages/NotFound";
import Admin from "./pages/admin";
import ProjectsListPage from "./pages/admin/projects";
import ProjectDetailsPage from "./pages/admin/projects/details";
import CommissionPage from "./pages/admin/commission";
import UsersListPage from "./pages/admin/users";
import UserDetailsPage from "./pages/admin/users/details";
import WithdrawListPage from "./pages/admin/withdraw";
import TranslationPage from "./pages/admin/translation";
const App = () => {
	return (
		<Router>
			{/* Global loader, displayed on top of all routes */}
			<RouteLoader />
			
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/auth/signin" element={<LoginPage />} />
				<Route path="/auth/signup" element={<SignupPage />} />
				<Route path="/auth/email-verification" element={<ForgotPage />} />
				<Route path="/auth/change-password" element={<ChangePassPage />} />
				<Route path="/403-page" element={<LinkExpirePage />} />

				{/* Routes protégées */}
				<Route path="/user/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
				<Route path="/user/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
				<Route path="/user/my-apps" element={<ProtectedRoute><MyAppPage /></ProtectedRoute>} />
				<Route path="/user/testing-jobs" element={<ProtectedRoute><MyJobPage /></ProtectedRoute>} />
				<Route path="/user/assigned-jobs" element={<ProtectedRoute><MyAssignedJobPage /></ProtectedRoute>} />
				<Route path="/user/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
				<Route path="/user/new-app" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
				<Route path="/user/confirm-email" element={<ProtectedRoute><ConfirmEmailPage /></ProtectedRoute>} />
				<Route path="/app/payment-success" element={<ProtectedRoute><PaymentSuccessPage /></ProtectedRoute>} />

				{/*Admin*/}
				<Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
				<Route path="/admin/projects/list" element={<ProtectedRoute role="admin"><ProjectsListPage /></ProtectedRoute>} />
				<Route path="/admin/projects/details" element={<ProtectedRoute role="admin"><ProjectDetailsPage /></ProtectedRoute>} />
				<Route path="/admin/projects/rate" element={<ProtectedRoute role="admin"><CommissionPage /></ProtectedRoute>} />
				<Route path="/admin/projects/rate" element={<ProtectedRoute role="admin"><CommissionPage /></ProtectedRoute>} />
				<Route path="/admin/users/list" element={<ProtectedRoute role="admin"><UsersListPage /></ProtectedRoute>} />
				<Route path="/admin/users/details" element={<ProtectedRoute role="admin"><UserDetailsPage /></ProtectedRoute>} />
				<Route path="/admin/withdraw/list" element={<ProtectedRoute role="admin"><WithdrawListPage /></ProtectedRoute>} />
				<Route path="/admin/settings/translation" element={<ProtectedRoute role="admin"><TranslationPage /></ProtectedRoute>} />

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
};

export default App;
