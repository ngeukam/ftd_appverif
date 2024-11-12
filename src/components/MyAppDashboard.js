import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";
import {
	getAllUserProjects,
	countTesterAssignedProject,
	deleProject,
} from "../helpers/backend_helpers";
import toast from "react-hot-toast";
import { useI18n } from "../context/i18n";
import swalAlert from "./common/alert";
import { hideLoader, Loader, showLoader } from "./common/preloader";
const MyAppDashboard = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6; // Nombre d'éléments à afficher par page
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalDocs, setTotalDocs] = useState(true);
	const i18n = useI18n();

	useEffect(() => {
		const fetchAllUserProject = async () => {
			try {
				const response = await getAllUserProjects({
					currentPage,
				});
				if (response.success === true) {
					// Ajout du nombre de testeurs assignés à chaque projet
					const projectsWithTesterCount = await Promise.all(
						response.data.map(async (project) => {
							const nbTesterAssigned = await fetchCountTesterAssignedProject(
								project._id
							);
							return { ...project, nbTesterAssigned };
						})
					);
					setProjects(projectsWithTesterCount);
					setTotalDocs(response.pagination.totalDocs);
				}
			} catch (error) {
				console.error("Error fetching projects:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAllUserProject();
	}, [currentPage]);

	const fetchCountTesterAssignedProject = async (projectId) => {
		try {
			const response = await countTesterAssignedProject({ projectId });
			if (response.success === true) {
				return response.nbTesterAssigned;
			}
			return 0;
		} catch (error) {
			console.error("Error fetching tester count:", error);
			return 0;
		}
	};

	const handleDelete = async (projectId, projectName) => {
		const result = await swalAlert.confirm(
			`${
				!!i18n?.t ? i18n?.t("Delete the project") : "Delete the project"
			}: ${projectName}`
		);

		if (result.isConfirmed) {
			try {
				showLoader();
				const response = await deleProject({ projectId });
				const { error, msg } = response || {};
				if (error === true && msg === "Project not found") {
					toast.error("Project not found");
				} else if (error === true && msg === "Project cannot be deleted") {
					toast.error("Project cannot be deleted");
				} else if (error === false) {
					setProjects((prevProjects) =>
						prevProjects.filter((project) => project._id !== projectId)
					);
					toast.success("Project deleted successfully");
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
	// Filtrer les projets en fonction du terme de recherche
	const filteredProjects = projects.filter(
		(project) =>
			project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.code.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Calculer le nombre total de pages
	const totalPages = Math.ceil(totalDocs / itemsPerPage);

	return (
		<div className="container mx-auto p-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg md:text-xl lg:text-2xl">
					{!!i18n?.t ? i18n?.t("My apps") : "My apps"} ({totalDocs})
				</h2>
				<input
					type="text"
					placeholder={!!i18n?.t ? i18n?.t("Search apps...") : "Search apps..."}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="mb-2 p-2 border rounded w-1/3"
				/>
				<button
					onClick={() => navigate("/user/new-app")}
					className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-300 flex items-center"
					title={!!i18n?.t ? i18n?.t("Add new app") : "Add new app"}
				>
					{/* <AiOutlinePlus size={24} className="text-lg font-bold mr-1" /> */}
					<span className="text-lg">
						{!!i18n?.t ? i18n?.t("Add new app") : "Add new app"}
					</span>
				</button>
			</div>

			{/* Afficher les cartes de projet */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{loading ? (
					<div>
						<Loader />
					</div>
				) : filteredProjects.length > 0 ? (
					filteredProjects.map((project, index) => (
						<ProjectCard
							key={index}
							title={project.name}
							description={project.description}
							amount={project.amount}
							nbTester={project.nb_tester}
							nbTesterAs={project.nbTesterAssigned}
							code={project.code}
							appType={project.app_type}
							startDate={project.start_date}
							endDate={project.end_date}
							link={project.link}
							appSize={project.app_size}
							imageSrc={project.app_logo}
							isPaid={project.isPaid}
							status={project.status_of_test}
							onDelete={() => handleDelete(project._id, project.name)}
						/>
					))
				) : (
					<div>
						{!!i18n?.t ? i18n?.t("No results found") : "No results found"}
					</div>
				)}
			</div>

			{/* Pagination */}
			<div className="flex justify-center mt-4">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						onClick={() => setCurrentPage(index + 1)}
						className={`mx-1 py-1 px-3 rounded ${
							currentPage === index + 1
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-800"
						}`}
					>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default MyAppDashboard;
