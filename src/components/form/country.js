import { Form } from "antd";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useI18n } from "../../context/i18n";
import ReactFlagsSelect from "react-flags-select";
import React from "react";
// const allowedCountries = ["US", "FR", "DE", "IT", "ES"]; // Liste des codes des pays

const inputStyle = {
	border: "1px solid #d9d9d9", // Light gray border
	borderRadius: "4px", // Slightly rounded corners
	padding: "8px", // Padding inside the input
	width: "100%", // Full width
	outline: "none", // Remove default outline
	transition: "border-color 0.3s", // Smooth transition for border color
};
const CountryInput = ({
	name = "country",
	label = "Country",
	setCountry,
	whitelist,
	required,
}) => {
	const i18n = useI18n();
	return (
		<Form.Item
			name={name}
			label={!!i18n.t ? i18n.t(label) : label}
			rules={[{ required: required, message: "Please provide country" }]}
			initialValue=""
		>
			<CountryDropdown
				valueType="full"
				whitelist={whitelist} // Passer la liste blanche ici
				onChange={(val) => setCountry && setCountry(val)}
				className="form-input bg-white"
                style={inputStyle}
			/>
		</Form.Item>
	);
};
export default CountryInput;

export const CityInput = ({
	name = "city",
	label = "City",
	country,
	required,
}) => {
	const i18n = useI18n();
	return (
		<Form.Item
			name={name}
			label={!!i18n.t ? i18n.t(label) : label}
			rules={[{ required: required, message: "Please provide country" }]}
			initialValue=""
		>
			<RegionDropdown
				valueType="full"
				country={country}
				countryValueType="full"
				className="form-input"
			/>
		</Form.Item>
	);
};

export const CountryFlagInput = ({
	name = "country",
	label = "Country",
	setCountry,
	whitelist,
	required,
}) => {
	const i18n = useI18n();
	return (
		<Form.Item
			name={name}
			label={!!i18n.t ? i18n.t(label) : label}
			rules={[{ required: required, message: "Please provide country" }]}
			initialValue=""
		>
			<FlatSelect />
		</Form.Item>
	);
};

const FlatSelect = ({ value, onChange }) => {
	return <ReactFlagsSelect selected={value} searchable onSelect={onChange} />;
};
