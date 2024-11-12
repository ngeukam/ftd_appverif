import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useI18n } from "../context/i18n";
import {
	listProjectsByTester,
	testerDeclineProject,
	testerAcceptProject,
} from "../helpers/backend_helpers";
import toast from "react-hot-toast";
import swalAlert from "./common/alert";
import { Loader } from "./common/preloader";
const MyJobDashboard = () => {
	const i18n = useI18n();
	const [searchTerm, setSearchTerm] = useState("");
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [isUpdated, setIsUpdated] = useState(false);
	const [totalDocs, setTotalDocs] = useState(true);
	const itemsPerPage = 6; // Number of items per page
	// Fetch projects for the specific tester
	useEffect(() => {
		const getProjects = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await listProjectsByTester({ currentPage });
				if (response.success === true) {
					setProjects(response.data); // Set the fetched projects
					setTotalDocs(response.pagination.totalDocs);
				}
			} catch (error) {
				console.error("Failed to fetch projects:", error);
				setError("Could not fetch projects.");
			} finally {
				setLoading(false);
			}
		};
		getProjects();
	}, [currentPage, isUpdated]);

	const handleDecline = async (projectId, projectName) => {
		swalAlert
			.confirm(`Decline project: ${projectName}`)
			.then(async (result) => {
				if (result.isConfirmed) {
					setLoading(true);
					setError(null);
					try {
						const response = await testerDeclineProject({ projectId });
						if (response.message === "Successfully updated") {
							toast.success("Successfully removed from project.");
							setIsUpdated((prev) => !prev);
						}
						if (
							response.message === "Cannot decline an already accepted project."
						) {
							swalAlert.warning("Cannot decline an already accepted project.");
						}
					} catch (error) {
						console.error("Error removing tester:", error);
						setError("Could not remove from project.");
					} finally {
						setLoading(false);
					}
				}
			});
	};
	const handleAccept = async (projectId, projectName) => {
		swalAlert
			.confirm(`Accept the project: ${projectName}`)
			.then(async (result) => {
				if (result.isConfirmed) {
					setLoading(true);
					setError(null);
					try {
						const response = await testerAcceptProject({ projectId });
						if (response.message === "The project is closed.") {
							swalAlert.warning(
								!!i18n?.t
									? i18n?.t("We are sorry the project is closed")
									: "We are sorry the project is closed"
							);
						}
						if (response.message === "Tester accepted project") {
							swalAlert.success(
								!!i18n?.t
									? i18n?.t(
											"Project accepted successfully.Go to Assigned Job menu!"
									  )
									: "Project accepted successfully.Go to Assigned Job menu!"
							);
							setIsUpdated((prev) => !prev);
						}
						if (
							response.message === "Tester is already assigned to this project."
						) {
							swalAlert.warning(
								!!i18n?.t
									? i18n?.t("Your already assigned to this project.")
									: "Your already assigned to this project."
							);
						}
					} catch (error) {
						console.error("Error accepting project:", error);
						setError("Could not accept the project");
					} finally {
						setLoading(false);
					}
				}
			});
	};

	// Filter projects based on the search term
	const filteredProjects = projects?.filter(
		(project) =>
			project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.code?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Calculate total pages for pagination
	const totalPages = Math.ceil(totalDocs / itemsPerPage);
	return (
		<div className="container mx-auto p-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg md:text-xl lg:text-2xl">
					Testing jobs ({totalDocs})
				</h2>
				<input
					type="text"
					placeholder={
						!!i18n?.t
							? i18n?.t("Search jobs (code or title)")
							: "Search jobs (code or title)"
					}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="mb-2 p-2 border rounded w-1/3"
				/>
			</div>

			{/* Show loading state, error message, or job cards */}
			{loading ? (
				<div>
					<Loader />
				</div>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredProjects.length > 0 ? (
						filteredProjects.map((project, index) => (
							<JobCard
								key={index}
								title={project.name}
								description={project.description}
								code={project.code}
								imageSrc={project.app_logo}
								startDate={project.start_date}
								endDate={project.end_date}
								appType={project.app_type}
								appSize={project.app_size}
								amount={(
									project.net_amount / project.nb_tester
								)}
								onDecline={() => {
									handleDecline(project._id, project.name);
								}}
								onAccept={() => {
									handleAccept(project._id, project.name);
								}}
							/>
						))
					) : (
						<div>{!!i18n?.t ? i18n?.t("No results found") : "No results found"}</div>
					)}
				</div>
			)}

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

export default MyJobDashboard;
