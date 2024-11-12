import { Form, Switch, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import FormSelect from "./form/FormSelect";
import CountryInput from "./form/country";
import FormInput, { HiddenFormItem } from "./form/input";
import PhoneNumberInput from "./form/PhoneInput";
import Button from "./common/button";
import { toast, Toaster } from "react-hot-toast";
import {
	fetchProfile,
	postUserProfileByToken,
} from "../helpers/backend_helpers";
import { useFetch } from "../helpers/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserDataContext } from "../context/userDataContext";
import { hideLoader, Loader, showLoader } from "./common/preloader";
import { useI18n } from "../context/i18n";
import {
	// useHobbiesList,
	useGenderList,
	useBusinessTypeOptions,
	useAgeList,
	useTerminalList,
} from "../helpers/data";
import swalAlert from "./common/alert";
const inputStyle = {
	border: "1px solid #d9d9d9",
	borderRadius: "4px",
	padding: "8px",
	width: "100%",
	outline: "none",
	transition: "border-color 0.3s",
	// fontSize: "18px",
};
const Profile = () => {
	const { isLoggedIn } = useUserDataContext();
	// const hobbiesList = useHobbiesList();
	const genderList = useGenderList();
	const ageList = useAgeList();
	const businessList = useBusinessTypeOptions();
	const terminalList = useTerminalList();
	const i18n = useI18n();
	const [routeLoading, setRouteLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState();
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const role = searchParams.get("role");
	const [user] = useFetch(fetchProfile);
	const [selectedHobbies, setSelectedHobbies] = useState([]);
	const [istester, setIsTester] = useState(false);
	const handleChange = (checked) => {
		setIsTester(checked);
	};
	const getProfile = () => {
		fetchProfile().then(({ error, data }) => {
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

	const getInitial = (email) => {
		return email ? email.charAt(0).toUpperCase() : "";
	};

	useEffect(() => {
		getProfile();
	}, [isLoggedIn]);

	useEffect(() => {
		if (!!user) {
			form.setFieldsValue({
				...user,
				name: user?.name,
				email: user?.email,
				gender: user?.gender,
				country: user?.country,
				phone: user?.phone,
				phone_types: user?.phone_types,
				business_types: user?.business_types,
				age_ranges: user?.age_ranges,
				isTester: user?.is_tester,
				hobbies: user?.hobbies.map((hobby) => ({ value: hobby })),
			});
			setSelectedHobbies(user?.hobbies);
			setImageUrl(user?.image);
			setIsTester(user?.is_tester);
		}
	}, [form, user, user?._id]);

	const onFinish = async (values) => {
		const data = {
			image: imageUrl,
			name: values.name,
			email: values.email,
			gender: values.gender,
			country: values.country,
			phone_types: values.phone_types,
			age_ranges: values.age_ranges,
			phone: values.phone,
			business_types: Array.isArray(values.business_types)
				? values.business_types
				: [values.business_types],
			hobbies: selectedHobbies,
			is_tester: istester,
		};
		try {
			showLoader();
			const response = await postUserProfileByToken(data);
			const { error, msg } = response || {};
			if (role && error === "false") {
				switch (role) {
					case "user":
						navigate("/user/dashboard");
						break;
					case "admin":
						navigate("/admin");
						break;
					case "employee":
						navigate("/employee");
						break;
					default:
						navigate("/");
				}
			} else if (msg === "Successfully updated") {
				swalAlert.success("Successfully updated");
			} else if (msg === "Unauthorized action") {
				toast.error("Unauthorized action");
			}
		} catch (error) {
			console.error("Error when updating", error);
			toast.error("Error when updating");
		} finally {
			hideLoader();
		}
	};

	const onFinishFailed = () => {
		toast.error(
			!!i18n?.t
				? i18n?.t("Please fill out the correct information")
				: "Please fill out the correct information"
		);
	};

	if (!!routeLoading || !user) {
		return (
			<div className="h-screen flex justify-center items-center bg-gray-100">
				<Loader />
			</div>
		);
	}

	return (
		<>
			<div className="font-sans h-screen flex justify-center items-center bg-gray-100">
				<div className="my-10 max-w-[900px] w-full mx-auto shadow-lg rounded-xl p-8 bg-white">
					<h2 className="text-3xl font-bold text-center text-[#333] mb-6">
						{i18n?.t("Profile Information") || "Profile Information"}
					</h2>
					<Tabs
						defaultActiveKey="1"
						centered
						onChange={(key) => console.log("Tab changed:", key)}
						items={[
							{
								label: !!i18n?.t
									? i18n?.t("Personal Information")
									: "Personal Information",
								key: "1",
								children: (
									<div className="mt-6">
										<Form
											form={form}
											layout="vertical"
											// onValuesChange={handleValuesChange}
											onFinish={onFinish}
											onFinishFailed={onFinishFailed}
										>
											<HiddenFormItem name="_id" />
											<h3 className="font-medium text-lg text-center text-gray-600 mb-4">
												{i18n?.t("Your Profile Picture") ||
													"Your Profile Picture"}
											</h3>
											{imageUrl ? (
												<img
													src={imageUrl}
													alt="avatar"
													className="mx-auto mb-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
													style={{
														width: "100px",
														height: "100px",
														objectFit: "cover",
													}}
												/>
											) : (
												<div className="mx-auto mb-2 flex justify-center items-center bg-gray-300 rounded-full w-[100px] h-[100px] text-2xl text-gray-700">
													{getInitial(user.email)}
												</div>
											)}
											<div className="grid gap-x-[22px] md:grid-cols-2 grid-cols-1 items-center">
												<FormInput
													name="name"
													label={i18n?.t("Name") || "Name"}
													required
													style={inputStyle}
												/>
												<FormInput
													type="email"
													name="email"
													label={i18n?.t("Email") || "Email"}
													required
													style={inputStyle}
													rules={[{ type: "email", message: "Invalid email" }]}
												/>
												<FormSelect
													name="gender"
													label={i18n?.t("Gender") || "Gender"}
													required
													options={genderList}
												/>
												<CountryInput
													name="country"
													label={i18n?.t("Country") || "Country"}
													searchable={true}
													required
												/>
											</div>
										</Form>
									</div>
								),
							},
							{
								label:
									i18n?.t("Account & Preferences") || "Account & Preferences",
								key: "2",
								children: (
									<div className="w-full profile mt-6">
										<Form
											form={form}
											layout="vertical"
											// onValuesChange={handleValuesChange}
											onFinish={onFinish}
										>
											<div className="grid gap-4 md:grid-cols-2">
												<FormSelect
													name="phone_types"
													label={i18n?.t("Terminals") || "Terminals"}
													isMulti={true}
													options={terminalList}
													placeholder={"What type of terminal do you have?"}
													required
													marginBottom="mb-1"
												/>
												<FormSelect
													name="business_types"
													label={i18n?.t("Main Activity") || "Main Activity"}
													search={true}
													options={businessList}
													placeholder={
														i18n?.t("Choose your main activity") ||
														"Choose your main activity"
													}
													required
													disabled={!!user.business_types}
													marginBottom="mb-1"
												/>
												<FormSelect
													name="age_ranges"
													label={i18n?.t("Age Range") || "Age Range"}
													search
													options={ageList}
													placeholder={
														i18n?.t("Choose your age range") ||
														"Choose your age range"
													}
													required
													disabled={!!user.age_ranges}
													marginBottom="mb-1"
												/>
												{/* <FormSelect
													name="hobbies"
													label="Your preferred application categories"
													isMulti
													search
													options={hobbiesList.map((hobby) => ({
														label: hobby.label,
														value: hobby.value,
														key: hobby.value, // Ajoutez la clé ici
													}))}
													placeholder="Which application categories would you like to test?"
													required
													marginBottom="mb-1"
													onChange={handleChange}
													value={selectedHobbies} // Lier l'état des hobbies sélectionnés
												/> */}

												<PhoneNumberInput
													label={i18n?.t("Phone Number") || "Phone Number"}
													name="phone"
													required
												/>
												<div className="flex items-center">
													<Form.Item name="isTester" valuePropName="checked">
														<Switch
															checked={istester}
															onChange={handleChange}
															className="!w-25 !h-6" // Tailwind to make the switch smaller
															checkedChildren="I'm tester"
															unCheckedChildren="I'm not a tester"
														/>
													</Form.Item>{" "}
												</div>
											</div>
											<div className="flex justify-center">
												<Button
													className="bg-gradient-to-r from-blue-500 to-indigo-600 w-[30%] text-white text-medium"
													htmltype="submit"
												>
													{i18n?.t("Save") || "Save"}
												</Button>
											</div>
										</Form>
									</div>
								),
							},
						]}
					/>
				</div>
			</div>
			<Toaster />
		</>
	);
};

export default Profile;
