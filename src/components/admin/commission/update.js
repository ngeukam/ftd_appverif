import React, { useEffect } from "react";
import Card from "../../common/card";
import { Form } from "antd";
import FormInput from "../../form/input";
import Button from "../../common/button";
import { useI18n } from "../../../context/i18n";
import { fetchCurrentCommission, updateCommissionRate } from "../../../helpers/backend_helpers";
import { useFetch } from "../../../helpers/hooks";
import { hideLoader, showLoader } from "../../common/preloader";
import toast from "react-hot-toast";

const inputStyle = {
	border: "1px solid #d9d9d9",
	borderRadius: "4px",
	padding: "8px",
	width: "30%",
	outline: "none",
	transition: "border-color 0.3s",
	fontSize: "15px",
};

const UpdateRate = () => {
	const [form] = Form.useForm();
	const { t } = useI18n();
	const [commission, { loading }] = useFetch(fetchCurrentCommission);
	useEffect(() => {
		form.setFieldsValue({
			rate: (commission?.rate ?? 0.05) * 100,
		});
	}, [commission?.rate]);

	const onFinish = async (values) => {
		const data = {
			rate: values.rate / 100,
			rateId: commission?._id,
		};
		try {
            showLoader();
			const response = await updateCommissionRate(data);
			const { msg, error } = response || {};
			if (!error && msg === "Successfully updated") {
				toast.success("Successfully updated");
			} else {
				toast.error(msg || "Error updating commission rate");
			}
		} catch (error) {
			console.error("Error updating rate:", error);
			toast.error("Unexpected error occurred");
		} finally {
			hideLoader();
		}
	};

	return (
		<section>
			<Card className="shadow-sm">
				<h1 className="text-gray-600 text-[16px] font-semibold tracking-wider">
					{t("Commission rate")}
				</h1>
			</Card>
			<Card className="shadow-sm text-font_color font-semibold">
				<Form form={form} onFinish={onFinish} layout="vertical">
					<FormInput
						name="rate"
						label={t("The rate to apply on each project")}
						required
						placeholder={t("Please enter rate")}
						type="number"
						style={inputStyle}
						extra={t("Vary in the range 1 to 10%")}
						min={1}
					/>
					<Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1 px-4 rounded-lg font-medium transition duration-200">
						{loading ? t("Processing...") : t("Submit")}
					</Button>
				</Form>
			</Card>
		</section>
	);
};

export default UpdateRate;
