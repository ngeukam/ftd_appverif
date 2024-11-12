import { useI18n } from "../../../context/i18n";
import moment from "moment";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { FaPen, FaPlusSquare } from "react-icons/fa";
import {
	validateCash,
	completeTest,
	changeSelectedTester,
	changeAccepteTester,
	addTester,
} from "../../../helpers/backend_helpers";
import toast from "react-hot-toast";
import { hideLoader, showLoader } from "../../common/preloader";
import swalAlert from "../../common/alert";
import { useEffect, useState } from "react";
import Card from "../../common/card";
import Button from "../../common/button";
import { Drawer, Form } from "antd";
import FormInput from "../../form/input";
const inputStyle = {
	border: "1px solid #d9d9d9",
	borderRadius: "4px",
	padding: "8px",
	width: "100%",
	outline: "none",
	transition: "border-color 0.3s",
	fontSize: "15px",
};
const ProjectCardDetails = ({
	ProjectDetails,
	currency_code,
	getProjectDetails,
}) => {
	const [project, setProject] = useState(ProjectDetails);
	const [loadnewselectedtester, setLoadSelectedTester] = useState(false);
	const [loadnewacceptedtester, setLoadAcceptedTester] = useState(false);

	// drawers
	const [form] = Form.useForm();
	const [form2] = Form.useForm();
	const [form3] = Form.useForm();
	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [open3, setOpen3] = useState(false);

	const showDrawer = () => {
		setOpen(true);
		setOpen2(false);
		setOpen3(false);
	};
	const onClose = () => {
		setOpen(false);
	};
	const showDrawer2 = () => {
		setOpen2(true);
		setOpen(false);
		setOpen3(false);
	};
	const showDrawer3 = () => {
		setOpen3(true);
		setOpen(false);
		setOpen2(false);
	};
	const onClose2 = () => {
		setOpen2(false);
	};
	const onClose3 = () => {
		setOpen3(false);
	};
	const { t } = useI18n();
	useEffect(() => {
		if (ProjectDetails) {
			setProject(ProjectDetails);
		}
	}, [ProjectDetails]);
	const downloadAcceptedTestersCSV = () => {
		const headers = ["Testers Email"];
		const rows = project?.acceptedTestersDetails.map((tester) => [
			tester.email,
		]);

		// Construit le contenu du fichier CSV
		const csvContent = [
			headers.join(","),
			...rows.map((row) => row.join(",")),
		].join("\n");

		// Crée et télécharge le fichier
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
		saveAs(
			blob,
			`Assigned_testers_project_${project?.name}_${project?.code}.csv`
		);
	};
	const handleValidateCash = async (projectId, code) => {
		const result = await swalAlert.confirm(
			`${
				t("Validate cash payment of project") ||
				"Validate cash payment of project"
			}: ${code}`
		);

		if (result.isConfirmed) {
			try {
				showLoader();
				const response = await validateCash({ projectId });
				const { msg } = response || {};
				switch (msg) {
					case "Project not found":
						toast.error("Project not found");
						break;
					case "Project already validated":
						toast.error("Project already verified");
						break;
					case "User has funds in their wallet, cannot validate cash payment":
						swalAlert.info(
							"User has sufficient funds in their wallet, cannot validate cash payment"
						);
						break;
					case "Successfully validated cash payment":
						getProjectDetails();
						toast.success("Successfully validated cash payment");
						break;
					default:
						toast.error("Failed to validate cash payment");
						break;
				}
			} catch (error) {
				console.error("Transaction aborted due to error:", error);
				toast.error("Transaction aborted due to error");
			} finally {
				hideLoader();
			}
		}
	};
	const handleCompleteTest = async (projectId) => {
		const result = await swalAlert.confirm(
			`${
				t("It's irreversible all accepted testers will be paid") ||
				"It's irreversible all accepted testers will be paid"
			}`
		);

		if (result.isConfirmed) {
			try {
				showLoader();
				const response = await completeTest({ projectId });
				const { msg } = response || {};
				switch (msg) {
					case "Project not found":
						toast.error("Project not found");
						break;
					case "No testers have completed this project":
						toast.error("No testers have completed this project");
						break;
					case "Payments distributed and testers notified":
						toast.success("Payments distributed and testers notified");
						getProjectDetails();
						break;
					default:
						toast.error("Error completing test and distributing payments");
						break;
				}
			} catch (error) {
				console.error("Transaction aborted due to error:", error);
				toast.error("Transaction aborted due to error");
			} finally {
				hideLoader();
			}
		}
	};
	const handleSelectedTester = async (values) => {
		const data = {
			projectId: project._id,
			testerId: values.testerId.trim(),
			newTesterId: values.newTesterId.trim(),
		};
		try {
			setLoadSelectedTester(true);
			const response = await changeSelectedTester(data);
			const { error, msg } = response || {};
			if (error === true && msg === "Project not found") {
				toast.error("Project not found");
				return;
			} else if (error === true && msg === "Tester not found in the list") {
				toast.error("Tester not found in the list");
			} else if (
				error === true &&
				msg === "New tester is not verified or not a tester"
			) {
				toast.error("This user is not verified or not a tester");
			} else if (error === false && msg === "Tester updated successfully") {
				toast.success("Tester updated successfully");
				getProjectDetails();
			} else {
				toast.error("Error updating tester");
			}
		} catch (error) {
			console.error("Updating aborted due to error:", error);
			toast.error("Updating aborted due to error");
		} finally {
			setLoadSelectedTester(false);
		}
	};
	const handleAcceptedTester = async (values) => {
		const data = {
			projectId: project._id,
			testerId: values.testerId.trim(),
			newTesterId: values.newTesterId.trim(),
		};
		try {
			setLoadAcceptedTester(true);
			const response = await changeAccepteTester(data);
			const { error, msg } = response || {};
			if (error === true && msg === "Tester not found for this project") {
				toast.error("Tester not found for this project");
				return;
			} else if (
				error === true &&
				msg === "You cannot change tester, project is completed"
			) {
				toast.error("You cannot change tester, project is completed");
			} else if (
				error === true &&
				msg === "New tester is not verified or not a tester"
			) {
				toast.error("This user is not verified or not a tester");
			} else if (error === false && msg === "Tester updated successfully") {
				toast.success("Tester updated successfully");
				getProjectDetails();
			} else {
				toast.error("Error updating tester");
			}
		} catch (error) {
			console.error("Updating aborted due to error:", error);
			toast.error("Updating aborted due to error");
		} finally {
			setLoadAcceptedTester(false);
		}
	};
	const handleAddTester = async (values) => {
		const data = {
			projectId: project._id,
			testerId: values.testerId.trim(),
		};
		try {
			setLoadSelectedTester(true);
			const response = await addTester(data);
			const { error, msg } = response || {};
			if (error === true && msg === "Project not found") {
				toast.error("Project not found");
				return;
			} else if (
				error === true &&
				msg === "Project ID and Tester ID are required"
			) {
				toast.error("Project ID and Tester ID are required");
			} else if (error === true && msg === "Tester not found") {
				toast.error("Tester not found");
			} else if (
				error === true &&
				msg === "Tester already added to this project"
			) {
				toast.error("Tester already added to this project");
			} else if (error === false && msg === "Tester added successfully") {
				toast.success("Tester added successfully");
				getProjectDetails();
			} else {
				toast.error("An error occurred while adding the tester to the project");
			}
		} catch (error) {
			console.error(
				"An error occurred while adding the tester to the project:",
				error
			);
			toast.error("An error occurred while adding the tester to the project");
		} finally {
			setLoadSelectedTester(false);
		}
	};
	return (
		<div>
			{/* header  */}
			<div className="h-16 border bg-white flex items-center justify-center text-[18px] font-semibold rounded-md">
				<h1 className="">
					{t("Project")} {project?.code}{" "}
				</h1>
			</div>
			<div className="grid md:grid-cols-2 gap-x-10 h-fit">
				<div className="grid grid-cols-1">
					{/* project infos  */}
					<Card className="shadow-sm mt-[10px] " title={t("Project infos")}>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 capitalize  mt-2">
							<p>Project Name</p>
							<p className="col-span-2 capitalize">{project?.name}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 capitalize mt-2">
							<p>App Type</p>
							<p className="col-span-2 capitalize">{project?.app_type}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2  mt-2">
							<p>Size</p>
							<p className="col-span-2 ">{project?.app_size} Mo</p>
						</div>
						{project?.description && (
							<div className="grid grid-cols-3 border-b py-[1px] px-2  mt-2">
								<p>Description</p>
								<p className="col-span-2 ">{project?.description}</p>
							</div>
						)}
						<div className="grid grid-cols-3 border-b py-[1px] px-2  mt-2">
							<p>Test Link</p>
							<Link className="col-span-2 text-blue" to={project?.link}>
								{project?.link}
							</Link>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2  mt-2">
							<p>Start Date</p>
							<p className="col-span-2 ">
								{moment(project?.start_date).format("MMM DD, YYYY")}
							</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2  mt-2">
							<p>End Date</p>
							<p className="col-span-2 ">
								{moment(project?.end_date).format("MMM DD, YYYY")}
							</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2  mt-2">
							<p>Tester Nb.</p>
							<p className="col-span-2 ">{project?.nb_tester}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2 mt-2">
							<p>Test Status</p>
							<p
								className={`col-span-1 font-semibold ${
									project?.acceptedTesters[0]?.status_of_test === "completed"
										? "text-green-500"
										: project?.acceptedTesters[0]?.status_of_test ===
										  "in progress"
										? "text-yellow-500"
										: "text-red-500"
								}`}
							>
								{project?.acceptedTesters[0]?.status_of_test === "completed"
									? "Completed"
									: project?.acceptedTesters[0]?.status_of_test ===
									  "in progress"
									? "In Progress"
									: "Not Started"}
							</p>
							{project?.acceptedTesters[0]?.status_of_test ===
								"in progress" && (
								<Button
									onClick={() => handleCompleteTest(project?._id)} // Function to complete status
									className="col-span-1 mb-2 bg-gray-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-200"
								>
									Complete Test
								</Button>
							)}
						</div>
						<div className="grid grid-cols-3 border-b py-[1px] px-2  mt-2">
							<p>Author</p>
							<p className="col-span-2 ">{project?.owner.email}</p>
						</div>
					</Card>

					{/* payment information */}
					<Card className="shadow-sm mt-[10px]" title={t("Payment Details")}>
						<div className="grid grid-cols-3 border-b py-[8px] px-2">
							<p>Payment Method</p>
							<p className="col-span-2 ">{project?.paymentMethod}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[8px] px-2">
							<p>Total Amount</p>
							<p className="col-span-2 ">{`${
								currency_code ? currency_code : ""
							}${project?.amount.toFixed(2) || 0}`}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[8px] px-2">
							<p>Net Amount</p>
							<p className="col-span-2 ">{`${
								currency_code ? currency_code : ""
							}${project?.net_amount.toFixed(2) || 0}`}</p>
						</div>
						<div className="grid grid-cols-3 border-b py-[8px] px-2">
							<p>Status</p>
							<p
								className={`col-span-2 font-semibold ${
									project?.verified ? "text-green-500" : "text-red-500"
								}`}
							>
								{project?.verified ? "Paid" : "Not Paid"}
							</p>
						</div>
						{!project?.verified && (
							<Button
								className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-8 rounded-lg font-medium transition duration-200"
								onClick={() => handleValidateCash(project?._id, project?.code)}
							>
								{"Validate payment"}
							</Button>
						)}
					</Card>
				</div>

				{/* Selected testers  */}
				<div className="grid grid-cols-1 h-fit">
					<Card
						className="shadow-sm mt-[10px] "
						title={t("Selected Testers") + " " + project?.testers.length}
					>
						{project?.testers.map((tester, index) => (
							<div
								key={index}
								className="grid grid-cols-3 border-b py-[1px] px-2  mt-2"
							>
								{/* <p>Email</p> */}
								<p className="col-span-1">{tester.email}</p>
								<button
									className="col-span-2 mb-2 justify-self-end btn btn-outline-info btn-sm focus:shadow-none"
									title="Change"
									onClick={() => {
										form.setFieldsValue({
											testerId: tester._id,
											newTesterId: "",
										});
										showDrawer();
									}}
								>
									<FaPen />
								</button>
							</div>
						))}
						<button
							onClick={() => {
								form3.setFieldsValue({
									testerId: "",
								});
								showDrawer3();
							}}
							className="mt-2"
						>
							<FaPlusSquare size={20} title="Add tester" />
						</button>
					</Card>

					{/* Accepted testers  */}
					<Card
						className="shadow-sm mt-[10px] "
						title={
							t("Accepted Testers") +
							" " +
							project?.acceptedTestersDetails.length
						}
					>
						{project?.acceptedTestersDetails.map((tester, index) => (
							<div
								key={index}
								className="grid grid-cols-3 border-b py-[1px] px-2  mt-2"
							>
								{/* <p>Email</p> */}
								<p className="col-span-1">{tester.email}</p>
								<button
									className="col-span-2 mb-2 justify-self-end btn btn-outline-warning btn-sm focus:shadow-none"
									title="Change"
									onClick={() => {
										form2.setFieldsValue({
											testerId: tester._id,
											newTesterId: "",
										});
										showDrawer2();
									}}
								>
									<FaPen />
								</button>
							</div>
						))}
						{project?.acceptedTestersDetails.length > 0 && (
							<Button
								className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-8 rounded-lg font-medium transition duration-200"
								onClick={downloadAcceptedTestersCSV}
							>
								Download to csv
							</Button>
						)}
					</Card>
				</div>
			</div>
			{/* drawer open */}
			<Drawer
				title="Selected Testers"
				placement="right"
				onClose={onClose}
				open={open}
			>
				<Form form={form} onFinish={handleSelectedTester} layout="vertical">
					<FormInput
						name="testerId"
						required
						type="text"
						style={inputStyle}
						disableInput
						hidden
					/>
					<FormInput
						name="newTesterId"
						label={t("New selected tester")}
						required
						placeholder={"Please enter tester Id"}
						type="text"
						style={inputStyle}
						extra={t("Go and copy it to user details")}
					/>
					<Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1 px-4 rounded-lg font-medium transition duration-200">
						{loadnewselectedtester ? t("Processing...") : t("Change")}
					</Button>
				</Form>
			</Drawer>
			<Drawer
				title="Accepted Testers"
				placement="right"
				onClose={onClose2}
				open={open2}
			>
				<Form form={form2} onFinish={handleAcceptedTester} layout="vertical">
					<FormInput
						name="testerId"
						// label={t("Current selected tester")}
						required
						type="text"
						style={inputStyle}
						disableInput
						hidden
					/>
					<FormInput
						name="newTesterId"
						label={t("New accepted tester")}
						required
						placeholder={"Please enter tester Id"}
						type="text"
						style={inputStyle}
						extra={t("Go and copy it to user details")}
					/>
					<Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1 px-4 rounded-lg font-medium transition duration-200">
						{loadnewacceptedtester ? t("Processing...") : t("Change")}
					</Button>
				</Form>
			</Drawer>
			<Drawer
				title="Add Tester"
				placement="right"
				onClose={onClose3}
				open={open3}
			>
				<Form form={form3} onFinish={handleAddTester} layout="vertical">
					<FormInput
						name="testerId"
						label={t("Add new tester")}
						required
						placeholder={"Please enter tester Id"}
						type="text"
						style={inputStyle}
						extra={t("Go and copy it to user details")}
					/>
					<Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1 px-4 rounded-lg font-medium transition duration-200">
						{loadnewacceptedtester ? t("Processing...") : t("Add Tester")}
					</Button>
				</Form>
			</Drawer>
		</div>
	);
};

export default ProjectCardDetails;
