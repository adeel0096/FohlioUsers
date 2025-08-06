import React, { useEffect } from "react";
import { Modal, Form, Input, Select, App } from "antd";
import { User } from "../../entities/user";

const { Option } = Select;

interface UserModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: User) => void;
  user?: User;
  roleOptions:{label:string, value:string}[];
  statusOptions:{label:string, value:string}[];
}

export default function UserModal({
  visible,
  onCancel,
  onSubmit,
  user,
  roleOptions,
  statusOptions,
}: UserModalProps) {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [user, form, visible]);

  const handleSubmit = () => {
    form.validateFields().then((fields)=>{
      onSubmit( user ?{...user, ...fields} : fields);
      form.resetFields();
    })
    .catch((e) => {
      message.error("Validation Failed");
      console.error(e);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      destroyOnHidden
      open={visible}
      title={user ? "Edit User" : "Add User"}
      okText={user ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="User name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select placeholder="Role">
            {roleOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select Status" }]}
        >
          <Select placeholder="Status">
            {statusOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
