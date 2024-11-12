import Card from "../../../../components/common/card";
import Table, { TableImage } from "../../../../components/common/table";
import { BsBank2 } from "react-icons/bs";
import {
	delWithdrawRequest,
	fetchWithdrawRequest,
	updateWithdrawRequest,
	approveWithdrawRequest,
} from "../../../../helpers/backend_helpers";
import { useFetch } from "../../../../helpers/hooks";
import moment from "moment";
import { Drawer, Select, Switch } from "antd";
import { useState } from "react";
import { useI18n } from "../../../../context/i18n";
import { hideLoader, showLoader } from "../../../common/preloader";
import swalAlert from "../../../common/alert";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const WithdrawListRequest = () => {
	const i18n = useI18n();
	let currency_code = "$";
	const [method, setMethod] = useState({});
	const [withdraw, getWithdraw, { loading, error }] = useFetch(
		fetchWithdrawRequest
	);
	// drawer
	const [open, setOpen] = useState(false);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const handleDelete = async (data) => {
		const result = await swalAlert.confirm(
			`${!!i18n?.t ? i18n?.t("Delete the withdraw") : "Delete the withdraw"}`
		);
		if (result.isConfirmed) {
			showLoader();
			try {
				const response = await delWithdrawRequest(data);
				const { error, msg } = response || {};
				if (error === true && msg === "Withdraw not found") {
					toast.error("Withdraw not found");
				} else if (error === false) {
					toast.success("Deleted successfully");
					getWithdraw();
				}
			} catch (error) {
				toast.error(
					!!i18n?.t
						? i18n?.t("Error deleting withdraw")
						: "Error deleting withdraw"
				);
			} finally {
				hideLoader();
			}
		}
	};
	const handleApprove = async (id) => {
		const result = await swalAlert.confirm(
			`${!!i18n?.t ? i18n?.t("Approve the withdraw") : "Approve the withdraw"}`
		);
		if (result.isConfirmed) {
			showLoader();
			try {
				const response = await approveWithdrawRequest({ _id: id });
				const { error, msg } = response || {};
				if (error === true && msg === "Withdraw not found") {
					toast.error("Withdraw not found");
				} else if (error === true && msg === "Already approved") {
					toast.error("Already approved");
				} else if (error === true && msg === "Insufficient funds") {
					toast.error("User have insufficient funds");
				} else if (error === false) {
					toast.success("Withdrawal approved and funds deducted");
					getWithdraw();
				}
			} catch (error) {
				toast.error(
					!!i18n?.t
						? i18n?.t("Error approving withdraw")
						: "Error approving withdraw"
				);
			} finally {
				hideLoader();
			}
		}
	};
	const handleUpdate = async (id, status) => {
		const result = await swalAlert.confirm(
			`${
				!!i18n?.t
					? i18n?.t("Update the withdraw status to")
					: "Update the withdraw status to"
			} ${status}`
		);
		if (result.isConfirmed) {
			showLoader();
			try {
				const response = await updateWithdrawRequest({
					_id: id,
					status: status,
				});
				const { error, msg } = response || {};
				if (error === true && msg === "Already completed") {
					toast.error("Already completed");
				} else if (error === false) {
					toast.success("Updated successfully");
					getWithdraw();
				}
			} catch (error) {
				toast.error(
					!!i18n?.t
						? i18n?.t("Error updating withdraw")
						: "Error updating withdraw"
				);
			} finally {
				hideLoader();
			}
		}
	};
	// filter
	const action = (
		<div className="space-x-2">
			{/* filter by approve status  */}
			<Select
				allowClear
				placeholder={"Filter by approve status"}
				onChange={(e) => {
					e === "approved"
						? getWithdraw({ approved: true })
						: e === "disapproved"
						? getWithdraw({ approved: false })
						: getWithdraw({ approved: e });
				}}
				className={`capitalize`}
				style={{
					width: 210,
				}}
				options={[
					{
						value: "approved",
						label: "Approved",
					},
					{
						value: "disapproved",
						label: "Disapproved",
					},
				]}
			/>
			{/* filter by payment status  */}
			<Select
				allowClear
				placeholder={"Filter by payment status"}
				onChange={(e) => getWithdraw({ status: e })}
				className={`capitalize`}
				style={{
					width: 210,
				}}
				options={[
					{
						value: "completed",
						label: "Completed",
					},
					{
						value: "pending",
						label: "Pending",
					},
					{
						value: "cancelled",
						label: "Cancelled",
					},
					{
						value: "processing",
						label: "Processing",
					},
				]}
			/>
		</div>
	);

	return (
		<>
			<section className="font-Poppins !text-twContent px-2">
				<Card className={"shadow-sm"}>
					<h1
						className={"text-gray-600 text-[16px] font-semibold tracking-wider"}
					>
						{!!i18n && i18n?.t("Withdraw Request")}
					</h1>
				</Card>

				<Card className="bg-white rounded-md p-2 shadow-sm">
					<div className="card_container">
						{/* table data show */}
						<Table
							indexed
							pagination
							data={withdraw}
							onReload={getWithdraw}
							loading={loading}
							action={action}
							columns={[
								// {
								// 	dataField: "image",
								// 	text: "image",
								// 	formatter: (_, d) => <TableImage url={d?.by?.image} />,
								// },
								{
									dataField: "name",
									text: "name",
									formatter: (_, d) => d?.by?.name,
								},
								{
									dataField: "phone",
									text: "phone",
									formatter: (_, d) => d?.by?.phone,
								},
								{
									dataField: "email",
									text: "email",
									formatter: (_, d) => d?.by?.email,
								},
								{
									dataField: "amount",
									text: "amount",
									formatter: (_, d) => (
										<span>
											{`${currency_code ? currency_code : ""} ${d?.amount}`}
										</span>
									),
								},
								{
									dataField: "trx_id",
									text: "transaction id",
									formatter: (_, d) => d?.trx_id,
								},
								{
									dataField: "payment_accept",
									text: "selected method",
									formatter: (_, d) => (
										<div
											onClick={() => {
												setMethod({
													methodName: d?.payment_accept?.method_name,
													accountDetails: d?.account_details,
												});
												showDrawer();
											}}
										>
											{d?.payment_accept && (
												<Link
													type="button"
													onClick={showDrawer}
													className="hover:text-twSecondary-shade800"
												>
													<BsBank2 size={24} />
												</Link>
											)}
										</div>
									),
								},
								{
									dataField: "createdAt",
									text: "date",
									formatter: (_, d) => (
										<span className="">
											{moment(d?.createdAt).format("MMM DD, YYYY")}
										</span>
									),
								},
								{
									dataField: "approved",
									text: "Approved",
									formatter: (_, d) => (
										<Switch
											onChange={() => handleApprove(d._id)}
											checkedChildren={"Approve"}
											unCheckedChildren={"Disapprove"}
											checked={d?.approved}
										/>
									),
								},
								{
									dataField: "status",
									text: "status",
									formatter: (_, d) => (
										<Select
											onChange={(e) => handleUpdate(d._id, e)}
											className={`capitalize ${
												d?.status?.toLowerCase() === "completed" &&
												"text-green-500"
											} 
                    ${
											d?.status?.toLowerCase() === "pending" &&
											"text-yellow-500"
										}
                    ${
											d?.status?.toLowerCase() === "accepted" && "text-blue-500"
										}
                    ${
											d?.status?.toLowerCase() === "processing" &&
											"text-blue-500"
										}
                    ${d?.status?.toLowerCase() === "declined" && "text-red-500"}
                    ${
											d?.status?.toLowerCase() === "cancelled" && "text-red-500"
										}`}
											defaultValue={d?.status}
											style={{
												width: 120,
											}}
											options={[
												{
													value: "completed",
													label: "Completed",
												},
												{
													value: "pending",
													label: "Pending",
												},
												{
													value: "cancelled",
													label: "Cancelled",
												},
												{
													value: "processing",
													label: "Processing",
												},
											]}
										/>
									),
								},
							]}
							onDelete={handleDelete}
							shadow={false}
						/>
					</div>
				</Card>
			</section>

			{/* drawer open */}
			<Drawer
				title="Selected Method"
				placement="right"
				onClose={onClose}
				visible={open}
			>
				<div className="text-center">
					<p className="text-lg font-medium underline text-blue-700">
						Payment Method
					</p>
					<p className="text-lg font-medium text-twSecondary-shade800">
						{method.methodName}
					</p>
				</div>
				<div className="border-2 border-twSecondary-shade800 border-opacity-40 mt-10 p-[10px] text-center shadow-sm min-h-[100px]">
					<p className="text-lg font-medium underline text-blue-700">
						Account Details
					</p>
					<p className="text-lg text-twContent">{method.accountDetails}</p>
				</div>
			</Drawer>
		</>
	);
};

export default WithdrawListRequest;
