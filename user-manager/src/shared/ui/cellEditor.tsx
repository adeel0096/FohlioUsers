import { useState, useImperativeHandle, forwardRef } from 'react';
import { Select } from 'antd';
import { ICellEditorParams } from 'ag-grid-community';
import { User } from '../../entities/user';

interface RoleEditorParams extends ICellEditorParams {
  options: { label: string; value: string }[];
  onCellChange?: (newValue: string, rowData: any) => void; // custom callback
}
export const CellEditor = forwardRef((props: RoleEditorParams, ref) => {
  const [value, setValue] = useState(props.value);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  
  const handleChange = (val: string) => {
    setValue(val);
    if (props.onCellChange) {
      props.onCellChange(val, props.node.data);
    }
  }
  return (
    <Select
      value={value}
      onChange={handleChange}
      options={props.options}
      style={{ width: '100%' }}
    />
  );
});

export default CellEditor;
