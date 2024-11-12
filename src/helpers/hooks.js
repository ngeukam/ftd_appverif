import { useEffect, useState } from "react";
import swalAlert from "../components/common/alert";
import { useNavigate } from "react-router-dom";
import { hideLoader, showLoader } from "../components/common/preloader";

// Refactor useFetch to call hooks unconditionally
export const useFetch = (func, query = {}, load = true) => {
	const navigate = useNavigate(); // Use navigate instead of router.push
	const [data, setData] = useState();
	const [loading, setLoading] = useState(load);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [params, setParams] = useState({
		...query,
		page: query?.page || 1,
		size: query?.size || 10,
	});
	useEffect(() => {
		if (load) {
			getData(params);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getData = (query) => {
		setLoading(true);
		setError(false);
		setParams({ ...params, ...query });
		try {
			func({ ...params, ...query })
				.then(({ error, data, msg, meta, ...rest }) => {
					setLoading(false);
					if (error === false || error === undefined) {
						setData(data);
					} else {
						setError(true);
						setErrorMessage(msg);
						setData(undefined);
					}
					if (
						rest &&
						(Object.values(rest) + "").replaceAll(",", "") === "Unauthorized."
					) {
						navigate("/auth/signin"); // Use navigate here
					}
				})
				.catch((e) => {
					console.log(e);
				});
		} catch (e) {
			console.log(e);
		}
	};

	const clear = () => setData(undefined);
	return [
		data,
		getData,
		{ query: params, loading, error, errorMessage, clear },
	];
};

export const useAction = async (func, data, reload, alert = true, t) => {
	showLoader();
	const { error, msg, data: d } = await func({ ...data });
	hideLoader();
	if (error === false) {
		if (reload) {
			reload(d);
		}
		if (!!alert) {
			await swalAlert.success(!!t ? t(msg) : msg, t);
		}
	} else {
		await swalAlert.error(!!t ? t(msg) : msg, t);
	}
};
export const executeAction = async (func, data, reload, alert = true, t) => {
	showLoader();
	const { error, msg, data: d } = await func({ ...data });
	hideLoader();
	if (!error) {
	  if (reload) reload(d);
	  if (alert) await swalAlert.success(t ? t(msg) : msg, t);
	} else {
	  await swalAlert.error(t ? t(msg) : msg, t);
	}
  };
// useActionConfirm calls useAction without conditional rendering
export const useActionConfirm = async (
	func,
	data,
	reload,
	message,
	confirmText,
	t,
	alert = true
) => {
	const { isConfirmed } = await swalAlert.confirm(
		t ? t(message) : message,
		t ? t(confirmText) : confirmText,
		t
	);
	if (isConfirmed) {
		await executeAction(func, data, reload, alert, t);
	}
};

// Click handler for outside elements
export const OutSideClick = (ref, func) => {
	useEffect(() => {
		function HandleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				func && func();
			}
		}
		document.addEventListener("mousedown", HandleClickOutside);
		return () => {
			document.removeEventListener("mousedown", HandleClickOutside);
		};
	}, [ref]);
};
