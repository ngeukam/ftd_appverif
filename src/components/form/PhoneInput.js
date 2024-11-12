import PhoneInput from "react-phone-number-input";
import { Form } from "antd";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneNumberInput = ({
	name,
	label,
	required = false,
	initialValue = "",
	rules = [],
	dependencies = [],
	isEmail,
	readOnly,
	onChange,
	placeholder,
}) => {
	let initRules = [
		{
			required: required,
			message: `Please provide ${label?.toLowerCase() || "a value"}`,
		},
		() => ({
			validator(_, value) {
				if (value && !isValidPhoneNumber(value)) {
					return Promise.reject(new Error("Invalid Phone number"));
				}
				return Promise.resolve();
			},
		}),
	];
	const inputStyle = {
		border: "1px solid #d9d9d9",
		borderRadius: "4px",
		padding: "8px",
		width: "100%",
		fontSize: "16px", // Adjust font size for the input field
		outline: "none",
	};

	return (
		<Form.Item
			name={name}
			label={label}
			dependencies={dependencies}
			initialValue={initialValue}
			rules={[...initRules, ...rules]}
		>
			<PhoneInput
				style={inputStyle}
				international
				onChange={onChange}
				defaultCountry="CM"
				className="w-full focus:outline-none"
			/>
		</Form.Item>
	);
};

export default PhoneNumberInput;
