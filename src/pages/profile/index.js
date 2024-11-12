import React from "react";
import Profile from "../../components/Profile";
import { RootLayout } from "../../layouts/layout";
const ProfilePage = () => {
	return (
		<div>
			<RootLayout>
				<Profile />
			</RootLayout>
		</div>
	);
};

export default ProfilePage;
