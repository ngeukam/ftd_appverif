import React from "react";
import { Form, Select } from "antd";

const FormSelect = ({
	name,
	label,
	initialValue,
	options = [],
	onSelect,
	onChange,
	placeholder,
	required = false,
	rules = [],
	search = false,
	isMulti = false,
	className,
    style,
	disabled,
	allowClear=false,
	marginBottom="mb-2"
}) => {
	let initRules = [
		{ required: required, message: `Please select ${label?.toLowerCase() || "a option"}` },
	];
	return (
		<Form.Item
			name={name}
			label={label}
			initialValue={initialValue}
			rules={[...initRules, ...rules]}
			className={marginBottom}
		>
			<Select
                style={style}
				className={className}
				onChange={onChange}
				size="large"
				onSelect={onSelect}
				placeholder={placeholder}
				mode={isMulti ? "multiple" : ""}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				showSearch={search}
				disabled={disabled}
				allowClear={allowClear}
			>
				{options?.map((option, index) => (
					<Select.Option key={index} value={option?.value || option?._id}>
						{option.label || option?.name}
					</Select.Option>
				))}
			</Select>
		</Form.Item>
	);
};
export default FormSelect;
