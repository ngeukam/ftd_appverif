import React, { useEffect } from "react";
import FormSelect from "./form/FormSelect";
import FormInput from "./form/input";
import { Form, Radio } from "antd";
import { awsFileUpload } from "./common/fileUploadAWS";
import InputFileUpload from "./common/utils/inputFile";
import { useState } from "react";
import Button from "./common/button";
import calculateTotalPrice from "../helpers/calculate_price";
import {
	// useHobbiesList,
	useAgeList,
	useGenderList,
	useBusinessTypeOptions,
	useTerminalList,
	useCountryList,
	appSizeList,
} from "../helpers/data";
import {
	fetchListPreferences,
	fetchAvailableTesters,
	createUserAppPayWithWallet,
	createUserAppPayWithCash,
	fetchCurrentCommission,
} from "../helpers/backend_helpers";
import { useNavigate } from "react-router-dom";
import { Loader } from "./common/preloader";
import { useFetch } from "../helpers/hooks";
import { toast, Toaster } from "react-hot-toast";
import { useI18n } from "../context/i18n";
import swalAlert from "./common/alert";
import { ArrowRightOutlined } from "@ant-design/icons";
const inputStyle = {
	border: "1px solid #d9d9d9",
	borderRadius: "4px",
	padding: "8px",
	width: "100%",
	outline: "none",
	transition: "border-color 0.3s",
	fontSize: "15px",
};

const Project = () => {
	// const { isLoggedIn } = useUserDataContext();
	const navigate = useNavigate();
	const i18n = useI18n();
	// const hobbiesList = useHobbiesList();
	const genderList = useGenderList();
	const ageList = useAgeList();
	const phoneList = useTerminalList();
	const businessList = useBusinessTypeOptions();
	const countryList = useCountryList();
	const [listPreferences] = useFetch(fetchListPreferences);
	const [commission] = useFetch(fetchCurrentCommission);
	const [uploading, setUploading] = useState(false);
	const [load, setLoad] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [activeTab, setActiveTab] = useState("project");
	const [routeLoading, setRouteLoading] = useState(false);
	// const [commonHobbies, setCommonHobbies] = useState([]);
	const [commonBusiness, setCommonBusiness] = useState([]);
	const [commonAge, setCommonAge] = useState([]);
	const [commonPhoneType, setcommonPhoneType] = useState([]);
	const [commonGender, setcommonGender] = useState([]);
	const [commonCountry, setcommonCountry] = useState([]);
	const [availableTesters, setAvailableTesters] = useState(0);
	const [seletedTesters, setSeletedTesters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		link: "",
		description: "",
		app_size: "",
		paymentMethod: "",
		nb_tester: 0,
		app_type: "",
		age: [],
		phone_types: [],
		country: [],
		gender: [],
		hobbies: [],
		business: [],
		start_date: "",
		end_date: "",
	});
	const getlistPreferences = () => {
		fetchListPreferences().then(({ error, data }) => {
			if (error === true) {
				setRouteLoading(true);
				localStorage.removeItem("authToken");
				localStorage.removeItem("auth_type");
				localStorage.removeItem("authRole");
				localStorage.clear();
				navigate("/auth/signin");
			}
		});
	};

	useEffect(() => {
		getlistPreferences();
		if (listPreferences) {
			// const filteredHobbies = hobbiesList.filter((hobby) =>
			// 	listPreferences.hobbies.includes(hobby.value)
			// );
			// if (JSON.stringify(filteredHobbies) !== JSON.stringify(commonHobbies)) {
			// 	setCommonHobbies(filteredHobbies);
			// }

			const filteredagaRanges = ageList.filter((age) =>
				listPreferences.ageRanges.includes(age.value)
			);
			if (JSON.stringify(filteredagaRanges) !== JSON.stringify(commonAge)) {
				setCommonAge(filteredagaRanges);
			}

			const filteredBusinessTypes = businessList.filter((businessType) =>
				listPreferences.businessTypes.includes(businessType.value)
			);
			if (
				JSON.stringify(filteredBusinessTypes) !== JSON.stringify(commonBusiness)
			) {
				setCommonBusiness(filteredBusinessTypes);
			}

			const filteredPhoneTypes = phoneList.filter((phoneType) =>
				listPreferences.phoneTypes.includes(phoneType.value)
			);
			if (
				JSON.stringify(filteredPhoneTypes) !== JSON.stringify(commonPhoneType)
			) {
				setcommonPhoneType(filteredPhoneTypes);
			}

			const filteredGender = genderList.filter((gender) =>
				listPreferences.gender.includes(gender.value)
			);
			if (JSON.stringify(filteredGender) !== JSON.stringify(commonGender)) {
				setcommonGender(filteredGender);
			}

			const filteredCountries = countryList.filter((country) =>
				listPreferences.countries.includes(country.value)
			);
			if (JSON.stringify(filteredCountries) !== JSON.stringify(commonCountry)) {
				setcommonCountry(filteredCountries);
			}
		}
	}, [
		ageList,
		businessList,
		commonAge,
		commonBusiness,
		commonCountry,
		commonGender,
		commonPhoneType,
		countryList,
		genderList,
		listPreferences,
		phoneList,
	]);
	const validateProjectTab = () => {
		const { name, link, app_size, app_type } = formData;
		const allFieldsFilled = name && link && app_size && app_type;
		if (!allFieldsFilled) {
			showToastError();
			return false;
		}
		return true; // All required fields are filled
	};

	const showToastError = () => {
		const message =
			i18n?.t(
				"Please fill in all required fields in the App informations tab."
			) || "Please fill in all required fields in the App informations tab.";
		toast.error(message);
	};

	const isValidUrl = (value) => {
		const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(:[0-9]{1,5})?(\/[^\s]*)?$/;
		return urlPattern.test(value);
	};
	const handleChange = async (name, value) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
			// ...(value === "web" ? { app_size: "" } : {}),
		}));

		const filters = createFilters(name, value);
		await updateAvailableTesters(filters);
		updateTotalPrice(name, value);
	};
	const handleInputChange = async (name, value) => {
		if (name === "link" && !isValidUrl(value)) {
			toast.error(
				i18n?.t("Please enter a valid URL") || "Please enter a valid URL"
			);
			return;
		}

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
			// ...(value === "web" ? { app_size: "" } : {}),
		}));
		if (name === "nb_tester") {
			await handleTesterCountChange(value);
		} else if (name === "start_date" || name === "end_date") {
			updateTotalPrice(name, value);
		}
	};

	const createFilters = (name, value) => ({
		age_ranges: name === "age" ? value : formData.age,
		business_types: name === "business" ? value : formData.business,
		hobbies: name === "hobbies" ? value : formData.hobbies,
		phone_types: name === "app_type" ? value : formData.app_type,
		gender: name === "gender" ? value : formData.gender,
		country: name === "country" ? value : formData.country,
		nb_tester: name === "nb_tester" ? value : formData.nb_tester,
	});

	const updateAvailableTesters = async (filters) => {
		setLoading(true);
		try {
			const res = await fetchAvailableTesters(filters);
			if (res.success) {
				setAvailableTesters(res.count || 0);
				setSeletedTesters(res.selectedTesters || []);
			}
		} catch (error) {
			console.error("fetchAvailableTesters", error);
		} finally {
			setLoading(false);
		}
	};

	const updateTotalPrice = (name, value) => {
		const newTotal = calculateTotalPrice({
			...formData,
			[name]: value,
			nb_tester: formData.nb_tester,
			// start_date: formData.start_date,
			// end_date: formData.end_date,
		});
		setTotalPrice(newTotal);
	};

	const handleTesterCountChange = async (value) => {
		const newTotal = calculateTotalPrice({
			...formData,
			nb_tester: value,
		});
		setTotalPrice(newTotal);

		if (value > availableTesters) {
			toast.error(
				i18n?.t("The number of testers must not exceed the testers filter") ||
					"The number of testers must not exceed the testers filter"
			);
		}

		const filters = createFilters("nb_tester", value);
		await updateAvailableTesters(filters);
	};

	const handleUploadChange = ({ file }) => {
		const status = file.status; // Access the status of the file
		if (status === "uploading") {
			setUploading(true); // Set uploading state if the file is being uploaded
		} else if (status === "done" || status === "success") {
			// File upload completed successfully
			const filePath = file.response?.filePath;
			if (filePath) {
				setFormData((prevData) => ({
					...prevData,
					app_logo: filePath, // Update app_logo with the filePath
				}));
			} else {
				toast.error("File uploaded but no file path returned."); // Handle case where no path is returned
			}
			setUploading(false); // Reset uploading state after handling response
		} else if (status === "removed") {
			setUploading(false); // Reset uploading state when file is removed
			setFormData((prevData) => ({
				...prevData,
				app_logo: "", // Clear app_logo when the file is removed
			}));
		} else if (status === "error") {
			// Handle upload error
			setUploading(false);
			toast.error("Upload failed. Please try again."); // Notify upload failure
		}
	};
	const disableStartdDate = (current) => {
		// Disable dates before today (current < today)
		return current && current < new Date().setHours(0, 0, 0, 0);
	};
	const disabledEndDate = (current) => {
		// Convertir start_date en objet Date s'il est au format string "YYYY-MM-DD"
		const startDate = formData.start_date
			? new Date(formData.start_date)
			: null;
		// Désactiver les dates antérieures à startDate
		return current && startDate && current < startDate;
	};

	const handleTabChange = async (tab) => {
		if (tab === "testers" && !validateProjectTab()) {
			return;
		}
		setActiveTab(tab);
	};
	const resetForm = () => {
		setFormData({
			name: "",
			link: "",
			description: "",
			app_size: "",
			app_logo: "",
			app_type: "",
			nb_tester: 0,
			start_date: "",
			end_date: "",
			testers: [],
			amount: 0,
			paymentMethod: "",
		});
		setSeletedTesters([]); // Réinitialiser la sélection des testeurs
		setTotalPrice(0); // Réinitialiser le prix total si nécessaire
	};
	const handleSubmit = async () => {
		const updatedFormData = {
			...formData,
			testers: seletedTesters,
			amount: totalPrice,
			commission: commission?.rate || 0.05,
			app_logo: files?.[0]?.app_logo || ''
		};
		console.log(formData)
		// Validate form data
		if (activeTab === "testers" && !validateProjectTab()) return;
		if (formData.nb_tester > availableTesters) {
			showToast("The number of testers must not exceed the testers filter");
			return;
		}
		if (!formData.paymentMethod) {
			showToast("Choose payment method");
			return;
		}
		if (updatedFormData.amount === 0) {
			showToast("The total amount must not equal zero");
			return;
		}

		setLoad(true);

		const confirmResult = await swalAlert.confirm(
			`The ${
				updatedFormData.name
			} app you create will cost you $${updatedFormData.amount.toFixed(2)}`
		);

		if (!confirmResult.isConfirmed) {
			setLoad(false);
			return;
		}

		try {
			let response, message, paymentSuccessUrl, projectCode, projectName;

			if (updatedFormData.paymentMethod === "wallet") {
				response = await createUserAppPayWithWallet(updatedFormData);
				({ message, paymentSuccessUrl } = response || {});
			} else if (updatedFormData.paymentMethod === "cash") {
				response = await createUserAppPayWithCash(updatedFormData);
				({ message, projectCode, projectName } = response || {});
			}

			if (message) {
				handleResponseMessages(
					message,
					paymentSuccessUrl,
					projectCode,
					projectName
				);
			}
		} catch (error) {
			showToast("Error during application creation");
		} finally {
			setLoad(false);
		}
	};

	// Helper function to display error messages
	const showToast = (message) => {
		toast.error(i18n.t(message) || message);
	};

	// Helper function to handle response messages
	const handleResponseMessages = (
		message,
		paymentSuccessUrl,
		projectCode,
		projectName
	) => {
		const errorMessages = {
			"Permission Denied": "Permission Denied",
			"Insufficient funds in wallet": "Insufficient funds in wallet",
			"Please fill in all required fields":
				"Please fill in all required fields",
			"The calculated price does not match the provided price":
				"The calculated price does not match the provided price",
			"Error during application creation": "Error during application creation",
		};

		if (errorMessages[message]) {
			showToast(errorMessages[message]);
			return;
		}

		if (message === "App created successfully") {
			resetForm();
			if (paymentSuccessUrl) {
				toast.success(
					i18n.t("App created successfully") || "App created successfully"
				);
				navigate(paymentSuccessUrl);
			} else {
				swalAlert.success(
					`App ${projectName} with Code ${projectCode} created successfully with Not Paid status.`
				);
				navigate("/user/my-apps");
			}
		}
	};

	const [fileLoading, setFileLoading] = useState({
		isloading: false,
		inputName: "",
	});
	const [files, setFiles] = useState([]);
	console.log(files?.[0])
	const handleFile = async (e, input_name) => {
		const fileSupport = ["image/jpeg", "image/png", "image/jpg"];
		if (
			fileSupport.includes(e.target.files[0].type) &&
			e.target.files[0].size <= 50 * 1024
		) {
			const obj = {};
			setFileLoading({ isloading: true, inputName: input_name });
			const url = await awsFileUpload(e.target.files[0]);
			if (url) {
				obj[input_name] = url;
				const duplicateV = files?.find((dt) => dt[input_name]);
				if (!!duplicateV) {
					const filterObj = files?.filter((dt) => !dt[input_name]);
					setFiles([...filterObj, obj]);
				} else {
					setFiles((pre) => [...pre, obj]);
				}
				setFileLoading({ isloading: false, inputName: "" });
			} else {
				setFileLoading({ isloading: false, inputName: "" });
				toast.error("Something went wrong!");
			}
		} else {
			setFileLoading({ isloading: false, inputName: "" });
			toast.error("Maximum size is 50 KB! Valid files is image");
		}
	};

	if (!!routeLoading || !listPreferences) {
		return (
			<div className="h-screen flex justify-center items-center bg-gray-100">
				<Loader />
			</div>
		);
	}
	return (
		<div className="bg-gray-100 p-3">
			<div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
				<div className="flex ">
					<h2 className="text-2xl flex-1 text-left font-medium mb-1 text-gray-500">
						{i18n.t("Add the app to test") || "Add the app to test"}
					</h2>
				</div>
				<div className="flex mb-4">
					<button
						className={`flex-1 py-2 text-center font-semibold ${
							activeTab === "project"
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-600"
						}`}
						onClick={() => handleTabChange("project")}
					>
						{i18n.t("App informations") || "App informations"}
					</button>
					<button
						className={`flex-1 py-1 text-center font-semibold justify-between ${
							activeTab === "testers"
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-600"
						}`}
						onClick={() => handleTabChange("testers")}
					>
						<span>{i18n.t("Testers filter") || "Testers filter"}</span>{" "}
						<span className="ml-auto">
							{loading
								? i18n.t("Loading...") || "Loading..."
								: `(` + availableTesters + `)`}
						</span>
					</button>
				</div>

				<Form onFinish={handleSubmit}>
					{activeTab === "project" && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							<FormInput
								name="name"
								label={i18n.t("App name") || "App name"}
								required={true}
								onChange={(e) => handleInputChange("name", e.target.value)}
								style={inputStyle}
							/>
							<FormInput
								name="link"
								label={i18n.t("Test link") || "Test link"}
								type="url"
								required={true}
								onChange={(e) => handleInputChange("link", e.target.value)}
								placeholder={
									"https://sub.example.co.uk/test-path, http://www.example.com:port"
								}
								style={inputStyle}
								extra={
									"http://example.com, https://www.example.com:port/path/to/resource"
								}
							/>
							<FormInput
								name="description"
								label={i18n.t("Description") || "Description"}
								textArea={true}
								onChange={(e) =>
									handleInputChange("description", e.target.value)
								}
								style={inputStyle}
							/>
							<div className="flex space-x-4">
								<div className="w-1/2">
									<FormSelect
										name="app_type"
										label={i18n.t("App Type") || "App Type"}
										initialValue={formData.app_type}
										options={[
											{ label: "Android", value: "android" },
											{ label: "iOS", value: "ios" },
											{ label: "Web", value: "web" },
										]}
										onSelect={(value) => handleChange("app_type", value)}
										required
									/>
								</div>

								<div className="w-1/2">
									<FormSelect
										name="app_size"
										label={
											formData.app_type === "web"
												? i18n.t("Max Page Size") || "Max Page Size"
												: i18n.t("Size") || "Size"
										}
										options={appSizeList()}
										onChange={(value) => handleChange("app_size", value)}
										search
										required
									/>
								</div>
							</div>
							{/* <FileInput
								name="app_logo"
								label="App logo"
								onChange={handleUploadChange}
								loading={uploading}
								text={
									formData.app_logo
										? i18n.t("Modify your app logo") || "Modify your app logo"
										: i18n.t("Upload your app logo") || "Upload your app logo"
								}
							/> */}
							<InputFileUpload
								input_name="app_logo"
								fileTitle="App logo"
								imgURL=""
								fileLoading={fileLoading}
								handleFile={handleFile}
								files={files}
							/>
							<div className="flex justify-end mt-0">
								<button
									type="button"
									onClick={() => handleTabChange("testers")}
									className="flex items-center text-blue-500"
								>
									<span className="mr-2 font-medium">
										{i18n.t("Next") || "Next"}{" "}
									</span>
									<ArrowRightOutlined style={{ fontSize: "16px" }} />
								</button>
							</div>
						</div>
					)}

					{activeTab === "testers" && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							{/* <FormSelect
								name="hobbies"
								label="Categories"
								options={commonHobbies}
								onChange={(value) => handleChange("hobbies", value)}
								isMulti
								search
								placeholder={"Choose testers categories"}
								required
							/> */}

							{/* <FormSelect
								name="phone_types"
								label="Device"
								options={commonPhoneType}
								onChange={(value) => handleChange("phone_types", value)}
								isMulti
								search
								placeholder={"Choose kind of devices the testers must have"}
								required
							/> */}

							<FormSelect
								name="business"
								label="Activity"
								options={commonBusiness}
								onChange={(value) => handleChange("business", value)}
								isMulti
								search
								placeholder={
									i18n.t("Choose testers' sector of activity") ||
									"Choose testers' sector of activity"
								}
								required
							/>

							<FormSelect
								name="age"
								label={i18n.t("Age range") || "Age range"}
								options={commonAge}
								onChange={(value) => handleChange("age", value)}
								isMulti
								search
								placeholder={
									i18n.t("Choose age range of testers") ||
									"Choose age range of testers"
								}
								required
							/>

							{/* <FormSelect
								name="gender"
								label="Gender"
								options={commonGender}
								onChange={(value) => handleChange("gender", value)}
								isMulti
								search
								placeholder={"Choose the gender of testers"}
								required
							/> */}

							<FormSelect
								name="country"
								label={i18n.t("Country") || "Country"}
								options={commonCountry}
								onChange={(value) => handleChange("country", value)}
								isMulti
								search
								placeholder={
									i18n.t("Choose testers' countries") ||
									"Choose testers' countries"
								}
								required
							/>
							<FormInput
								name="nb_tester"
								label={i18n.t("Number") || "Number"}
								type="number"
								onChange={(e) => handleInputChange("nb_tester", e.target.value)}
								style={inputStyle}
								placeholder={
									i18n.t("How many testers do you need?") ||
									"How many testers do you need?"
								}
								required
								min={0}
								onWheel={(e) => e.target.blur()} // Désactive l'incrémentation lors du scroll
								extra={
									"The number of testers must not exceed the testers filter"
								}
							/>
							<div className="flex space-x-4">
								<div className="w-1/2">
									<FormInput
										name="start_date"
										label={i18n.t("Test start on") || "Test start on"}
										type="date"
										onChange={(value) => handleInputChange("start_date", value)}
										required
										disabledDate={disableStartdDate}
									/>
								</div>
								<div className="w-1/2">
									<FormInput
										name="end_date"
										label={i18n.t("Test end on") || "Test end on"}
										type="date"
										onChange={(value) => handleInputChange("end_date", value)}
										required
										disabledDate={disabledEndDate}
									/>
								</div>
							</div>
							<h2 className="text-lg flex-1 py-2 text-left font-semibold mb-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 rounded-lg shadow-lg flex items-center justify-between">
								<span>{i18n.t("Total Amount") || "Total Amount"}:</span>
								<span className="text-lg font-bold">$ {totalPrice}</span>
							</h2>
							<div className="payment-methods">
								<div className="flex justify-between">
									<Radio.Group
										value={formData.paymentMethod}
										onChange={(e) =>
											handleInputChange("paymentMethod", e.target.value)
										}
										className="flex items-center"
									>
										<div className="flex items-center mx-10">
											<Radio value="cash" className="flex items-center">
												<img src="/cash.png" alt="Cash" className="w-6 h-8" />
												<span className="text-lg font-medium">Cash</span>
											</Radio>
										</div>
										<div className="flex items-center mx-10">
											<Radio value="wallet" className="flex items-center">
												<img
													src="/wallet.png"
													alt="Wallet"
													className="w-6 h-6"
												/>
												<span className="text-lg font-medium">Wallet</span>
											</Radio>
										</div>
									</Radio.Group>
								</div>
							</div>

							<Button
								disabled={load}
								className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1 px-4 rounded-lg font-medium transition duration-200"
							>
								{load
									? i18n.t("Processing...") || "Processing..."
									: i18n.t("Submit") || "Submit"}
							</Button>
						</div>
					)}
				</Form>
			</div>
			<Toaster />
		</div>
	);
};

export default Project;
