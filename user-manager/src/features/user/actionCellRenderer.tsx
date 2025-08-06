import React from "react";
import { Button, Space } from "antd";
import { User } from "../../entities/user";

interface Props {
  onEdit: (data:User) => void;
  onDelete: (data: number) => void;
  data: User;
}

const ActionCellRenderer = ({ data, onEdit, onDelete }: Props) => {
  return (
    <Space>
      <Button size="small" onClick={() => onEdit(data)}>
        Edit
      </Button>
      <Button size="small" danger onClick={() => onDelete(data.id)}>
        Delete
      </Button>
    </Space>
  );
};

export default ActionCellRenderer;
