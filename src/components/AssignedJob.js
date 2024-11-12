import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getTesterAcceptedProjects } from "../helpers/backend_helpers";
import { Loader } from "./common/preloader";
import { useI18n } from "../context/i18n";
const MyAssignedJobDashboard = () => {
	const i18n = useI18n();
	const [searchTerm, setSearchTerm] = useState("");
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalDocs, setTotalDocs] = useState(true);
	const itemsPerPage = 6; // Number of items per page
	// Fetch projects for the specific tester
	useEffect(() => {
		const getProjects = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await getTesterAcceptedProjects({ currentPage });
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
	}, [currentPage]);

	// Filter projects based on the search term
	const filteredProjects = projects.filter(
		(project) =>
			project.project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.project.code?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Calculate total pages for pagination
	const totalPages = Math.ceil(totalDocs / itemsPerPage);
	return (
		<div className="container mx-auto p-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg md:text-xl lg:text-2xl">
					{!!i18n?.t ? i18n?.t("Assigned jobs") : "Assigned jobs"} ({totalDocs})
				</h2>
				<input
					type="text"
					placeholder={!!i18n?.t ? i18n?.t("Search jobs (code or title)"): "Search jobs (code or title)"}
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
								title={project.project.name}
								description={project.project.description}
								code={project.project.code}
								imageSrc={project.project.app_logo}
								startDate={project.project.start_date}
								endDate={project.project.end_date}
								appType={project.project.app_type}
								amount={(
									project.net_amount / project.project.nb_tester
								)}
								link={project.project.link}
								tesTed={project.status_of_test}
								isPaid={project.tester_is_paid}
							/>
						))
					) : (
						<div>No results found</div>
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

export default MyAssignedJobDashboard;
