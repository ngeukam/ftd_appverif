import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchAllUsersWithWallet } from "../../../helpers/backend_helpers";
import { useFetch } from "../../../helpers/hooks";
import Table from "../../common/table";
import moment from "moment";
import Card from "../../common/card";
import { useI18n } from "../../../context/i18n";
import { hideLoader, showLoader } from "../../common/preloader";
import toast from "react-hot-toast";
import swalAlert from "../../common/alert";

const UsersList = () => {
	const navigate = useNavigate();
	const i18n = useI18n();
	const [users, getUsers, { error, loading }] = useFetch(
		fetchAllUsersWithWallet
	);
	const { currency_code } = "$";
	const columns = [
		{
			dataField: "email",
			text: "User Email",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span>{data?.email}</span>
				</div>
			),
		},
		{
			dataField: "country",
			text: "Country",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span>{data?.country}</span>
				</div>
			),
		},
		{
			dataField: "age_range",
			text: "Age Range",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span>{data?.age_ranges}</span>
				</div>
			),
		},
		{
			dataField: "business_types",
			text: "Business",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="capitalize">{data?.business_types}</span>
				</div>
			),
		},
		{
            dataField: "phone_types",
            text: "Phone types",
            formatter: (_, data) => (
                <div>
                    <span className="capitalize">{data?.phone_types?.join(", ")}</span>
                </div>
            ),
        },
		{
			dataField: "date",
			text: "Join on",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="">
						{moment(data?.createdAt).format("MMM DD, YYYY")}
					</span>
				</div>
			),
		},
        {
			dataField: "date",
			text: "Updated at",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="">
						{moment(data?.updatedAt).format("MMM DD, YYYY")}
					</span>
				</div>
			),
		},
        {
			dataField: "role",
			text: "Role",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="capitalize">{data?.role}</span>
				</div>
			),
		},
        {
			dataField: "tester",
			text: "Tester",
			formatter: (_, data) => (
				<span
					className={`capitalize ${
						data?.is_tester ? "text-green-500" : "text-red-500"
					}`}
				>
					{data?.is_tester ? "Yes" : "No"}
				</span>
			),
		},
		{
			dataField: "amount",
			text: "Wallet",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="">{`${currency_code ? currency_code : "$"}${(
						data?.totalWalletAmount || 0
					).toFixed(2)}`}</span>
				</div>
			),
		},

		{
			dataField: "verified",
			text: "Verified",
			formatter: (_, data) => (
				<span
					className={`capitalize ${
						data?.verified ? "text-green-500" : "text-red-500"
					}`}
				>
					{data?.verified ? "Yes" : "No"}
				</span>
			),
		},
	];
	let actions = (data) => (
		<div className="flex">
			<button
				className="btn btn-outline-primary btn-sm focus:shadow-none me-2"
				title="View details"
				onClick={() => navigate(`/admin/users/details?_id=${data?._id}`)}
			>
				<FaEye className="cursor-pointer" />
			</button>
		</div>
	);
	const handleDelete = async (data) => {
		const result = await swalAlert.confirm(
			`${!!i18n?.t ? i18n?.t("Delete the project") : "Delete the project"}: ${
				data?.code
			}`
		);
		if (result.isConfirmed) {
			showLoader();
			try {
			} catch (error) {
			} finally {
				hideLoader();
			}
		}
	};
	return (
		<section>
			<Card className={"shadow-sm"}>
				<h1
					className={"text-gray-600 text-[16px] font-semibold tracking-wider"}
				>
					{!!i18n && i18n?.t("Users List")}
				</h1>
			</Card>
			<div className="card_container">
				<Table
					columns={columns}
					data={users}
					pagination={true}
					noActions={false}
					actions={actions}
					indexed={true}
					shadow={false}
					onReload={getUsers}
					loading={loading}
					error={error}
					onDelete={handleDelete}
				/>
			</div>
		</section>
	);
};
export default UsersList;
