import React from "react";
import { Button, Typography, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface Props {
  title: string;
  buttonText?: string;
  onAdd?: () => void;
}

export default function UserHeader({ title, buttonText = "Add", onAdd }: Props) {
  const { token } = theme.useToken();
  return (
    <div style={{ backgroundColor: token.colorBgContainer }} className={`flex justify-between items-center p-4 shadow rounded`}>
      <Title style={{ color: token.colorText }} level={3} className={`!mb-0`}>
        {title}
      </Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onAdd}
      >
        {buttonText}
      </Button>
    </div>
  );
}
