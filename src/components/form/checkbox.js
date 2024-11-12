import React from "react";
import { Form, Checkbox } from "antd";

const FormCheckbox = ({ name, label, initialValue }) => {
    return (
        <Form.Item
            name={name}
            label={label}
            valuePropName="checked" // This tells Ant Design to use 'checked' for the checkbox
            initialValue={initialValue || false}
        >
            <Checkbox />
        </Form.Item>
    );
};

export default FormCheckbox;
