// Dashboard.js
import React, { useEffect, useState } from "react";
import DashboardCard from "./DashBoardCard";
import {
	AiFillAppstore,
	AiOutlineCheckCircle,
	AiOutlineWallet,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
	getWalletBalance,
	countTesterAcceptedProjects,
	countUserProjects,
} from "../helpers/backend_helpers";
import toast from "react-hot-toast";
import { useI18n } from "../context/i18n";
const Dashboard = () => {
	const i18n = useI18n();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [loading2, setLoading2] = useState(false);
	const [loading3, setLoading3] = useState(false);
	const [balance, setBalance] = useState(0);
	const [nbproject, setNbProject] = useState(0);
	const [nbuserproject, setNbUserProject] = useState(0);
	const handleButtonClick = () => {
		navigate("/user/new-app");
	};
	useEffect(() => {
		const fetchWalletBalance = async () => {
			setLoading(true);
			try {
				const response = await getWalletBalance();
				if (response.message === "Permission Denied") {
					toast.error(
						!!i18n?.t
							? i18n?.t("Error when retireve balance")
							: "Error when retireve balance"
					);
				}
				setBalance(response?.balance);
			} catch (error) {
				console.error("Error fetching wallet balance:", error);
			} finally {
				setLoading(false);
			}
		};
		const fetchCountAcceptedProject = async () => {
			setLoading2(true);
			try {
				const response = await countTesterAcceptedProjects();
				if (response.message === "Permission Denied") {
					toast.error(
						!!i18n?.t
							? i18n?.t("Error when count projects")
							: "Error when count projects"
					);
				}
				setNbProject(response?.nbProject);
			} catch (error) {
				console.error("Error fetching count projects:", error);
			} finally {
				setLoading2(false);
			}
		};
		const fetchCountUserProject = async () => {
			setLoading3(true);
			try {
				const response = await countUserProjects();
				if (response.message === "Permission Denied") {
					toast.error(
						!!i18n?.t
							? i18n?.t("Error when count projects")
							: "Error when count projects"
					);
				}
				setNbUserProject(response?.nbProject);
			} catch (error) {
				console.error("Error fetching count projects:", error);
			} finally {
				setLoading3(false);
			}
		};

		fetchWalletBalance();
		fetchCountAcceptedProject();
		fetchCountUserProject();
	}, []);
	return (
		<div className="p-4">
			{/* Bouton au-dessus des cartes */}
			<div className="mb-4">
				<button
					onClick={handleButtonClick}
					className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-300 flex items-center"
					title={i18n?.t("Add new app") || "Add new app"}
				>
					{/* <AiOutlinePlus size={24} className="text-lg font-bold mr-1" /> */}
					<span className="text-lg">
						{!!i18n?.t ? i18n?.t("Add new app") : "Add new app"}
					</span>
				</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<DashboardCard
					title="Applications submitted for tests"
					count={loading ? (!!i18n?.t ? i18n?.t("Loading...") : "Loading...") : nbuserproject}
					icon={<AiFillAppstore />}
					loading={loading3}
				/>
				<DashboardCard
					title="Assigned Jobs"
					loading={loading}
					count={loading ? (!!i18n?.t ? i18n?.t("Loading...") : "Loading...") : nbproject}
					icon={<AiOutlineCheckCircle />}
				/>
				<DashboardCard
					title="Wallet Balance"
					loading={loading2}
					count={loading ? (!!i18n?.t ? i18n?.t("Loading...") : "Loading...") : `$` + balance.toFixed(2)}
					icon={<AiOutlineWallet />}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
