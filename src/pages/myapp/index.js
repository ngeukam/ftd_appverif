import React from "react";
import MyAppDashboard from "../../components/MyAppDashboard";
import { RootLayout } from "../../layouts/layout";
const MyAppPage = () => {
	return (
		<RootLayout>
			<MyAppDashboard />
		</RootLayout>
	);
};
export default MyAppPage;
