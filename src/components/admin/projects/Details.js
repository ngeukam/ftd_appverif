import React, { useEffect } from "react";
import { useFetch } from "../../../helpers/hooks";
import ProjectCardDetails from "./ProjectCardDetails";
import RouteLoader from "../../common/preloader";
import { useLocation } from "react-router-dom";
import { fetchProject } from "../../../helpers/backend_helpers";

const ProjectDetails = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const id = query.get("_id");
	const [projectDetails, getProjectDetails] = useFetch(fetchProject, {
		_id: id,
	});
	useEffect(() => {
		getProjectDetails({ _id: id });
	}, [id]);

	if (!projectDetails) {
		return <RouteLoader />;
	}

	return (
		<ProjectCardDetails
			currency_code={"$"}
			ProjectDetails={projectDetails}
			getProjectDetails={getProjectDetails}
		/>
	);
};

export default ProjectDetails;
