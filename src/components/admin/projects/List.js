import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
	deleProject,
	fetchProjectList,
} from "../../../helpers/backend_helpers";
import { useFetch } from "../../../helpers/hooks";
import Table from "../../common/table";
import moment from "moment";
import Card from "../../common/card";
import { useI18n } from "../../../context/i18n";
import { hideLoader, showLoader } from "../../common/preloader";
import toast from "react-hot-toast";
import swalAlert from "../../common/alert";

const ProjectsList = () => {
	const navigate = useNavigate();
	const i18n = useI18n();
	const [projects, getProjects, { error, loading }] = useFetch(
		fetchProjectList
	);
	const { currency_code } = "$";
	const columns = [
		{
			dataField: "code",
			text: "Code",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="capitalize">{data?.code}</span>
				</div>
			),
		},
		{
			dataField: "name",
			text: "Name",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="capitalize">{data?.name}</span>
				</div>
			),
		},
		{
			dataField: "date",
			text: "Created at",
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
			text: "Time",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="">{moment(data?.createdAt).format("hh:mm A")}</span>
				</div>
			),
		},
		{
			dataField: "nb_tester",
			text: "Tester Nb.",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span>{data?.nb_tester}</span>
				</div>
			),
		},
		{
			dataField: "ass_tester",
			text: "Tester Ass.",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span>{data?.acceptedTestersCount}</span>
				</div>
			),
		},
		{
			dataField: "start_date",
			text: "Begin on",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="">
						{moment(data?.start_date).format("MMM DD, YYYY")}
					</span>
				</div>
			),
		},
		{
			dataField: "end_date",
			text: "End on",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="">
						{moment(data?.end_date).format("MMM DD, YYYY")}
					</span>
				</div>
			),
		},
		{
			dataField: "amount",
			text: "Amount",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="">{`${currency_code ? currency_code : "$"}${(
						data?.amount || 0
					).toFixed(2)}`}</span>
				</div>
			),
		},

		{
			dataField: "paid",
			text: "Pay Status",
			formatter: (_, data) => (
				<span
					className={`capitalize ${
						data?.paymentStatus?.toLowerCase() === "completed"
							? "text-green-500"
							: "text-red-500"
					}`}
				>
					{data?.paymentStatus?.toLowerCase() === "completed"
						? data?.paymentStatus
						: "Pending"}
				</span>
			),
		},
		{
			dataField: "paymentMethod",
			text: "Method",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span className="capitalize">{data?.paymentMethod}</span>
				</div>
			),
		},
		{
			dataField: "commission",
			text: "Fees",
			formatter: (_, data) => (
				<div className="">
					{" "}
					<span
						className={
							data?.paymentStatus === "completed" &&
							data?.status_of_test === "completed"
								? "text-green-500 font-semibold"
								: "text-gray-500"
						}
					>
						{data?.paymentStatus === "completed" &&
						data?.status_of_test === "completed"
							? `${"$"}${(data?.retained_cost || 0)?.toFixed(2)}`
							: `$0`}
					</span>
				</div>
			),
		},
		{
			dataField: "status",
			text: "Test",
			formatter: (_, data) => {
				const status = data?.status_of_test;
				let statusText = "Not started";
				let statusColor = "text-gray-500";

				if (status === "in progress") {
					statusText = "In Progress";
					statusColor = "text-yellow-500";
				} else if (status === "completed") {
					statusText = "Completed";
					statusColor = "text-green-500";
				} else if (status === "not started") {
					statusText = "Not Started";
					statusColor = "text-red-500";
				}

				return (
					<span className={`capitalize ${statusColor}`}>{statusText}</span>
				);
			},
		},
	];
	let actions = (data) => (
		<div className="flex">
			<button
				className="btn btn-outline-primary btn-sm focus:shadow-none me-2"
				title="View details"
				onClick={() => navigate(`/admin/projects/details?_id=${data?._id}`)}
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
				const response = await deleProject({ projectId: data?._id });
				const { error, msg } = response || {};
				if (error === true && msg === "Project not found") {
					toast.error("Project not found");
				} else if (error === true && msg === "Project cannot be deleted") {
					toast.error("Project with completed payment cannot be deleted");
				} else if (error === false) {
					toast.success("Project deleted successfully");
					getProjects();
				}
			} catch (error) {
				toast.error(
					!!i18n?.t
						? i18n?.t("Error deleting project")
						: "Error deleting project"
				);
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
					{!!i18n && i18n?.t("Projects List")}
				</h1>
			</Card>
			<div className="card_container">
				<Table
					columns={columns}
					data={projects}
					pagination={true}
					noActions={false}
					actions={actions}
					indexed={true}
					shadow={false}
					onReload={getProjects}
					loading={loading}
					error={error}
					onDelete={handleDelete}
				/>
			</div>
		</section>
	);
};
export default ProjectsList;
