import React from "react";
import UsersList from "../../../components/admin/users/List";
import AdminLayout from "../../../layouts/admin";
const UsersListPage = () => {
	return (
		<AdminLayout>
			<UsersList />
		</AdminLayout>
	);
};
export default UsersListPage;
