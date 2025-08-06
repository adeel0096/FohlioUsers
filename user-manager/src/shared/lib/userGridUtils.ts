import { ColDef } from "ag-grid-community";
import { EUserRoles, EUserStatus, User } from "../../entities/user";
import { UserRoleCellRenderer } from "../../features/user/userRoleCellRenderer";
import CellEditor from "../ui/cellEditor";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from "../config/constants";
import { UserStatusCellRenderer } from "../../features/user/userStatusCellRenderer";
import ActionCellRenderer from "../../features/user/actionCellRenderer";

export const getColumnsDef: (onEdit:(u:User)=>void, onDelete: (id:number)=>void, callUpdate: (u:User)=>void)=> ColDef[] = (onEdit, onDelete, callUpdate) => {
  return [
    {field:'id', headerName: 'ID'},
    {field:'name', headerName: 'Name', sortable: true},
    {field:'email', headerName: 'Email', filter: true},
    {
      field: 'role',
      headerName: 'Role', 
      filter: true,
      cellRenderer: UserRoleCellRenderer,
      editable: true,
      cellEditor: CellEditor,
      cellEditorParams: {
        options: USER_ROLE_OPTIONS,
        onCellChange: (newValue:string, rowData:User) => {
          callUpdate({...rowData, role: newValue as EUserRoles});
        }
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      cellRenderer: UserStatusCellRenderer,
      editable: true,
      cellEditor: CellEditor,
      cellEditorParams: {
        options: USER_STATUS_OPTIONS,
        onCellChange: (newValue:string, rowData:User) => {
          callUpdate({...rowData, status: newValue as EUserStatus});
        }
      }
    },
    {
      field: 'createdDate', 
      headerName: 'Created Date', 
      sortable: true,
      valueFormatter: (params) => {
        if (!params.value) return '';
        return dateFormatter.format(new Date(params.value));
      },
      tooltipValueGetter: (params) => {
        if (!params.value) return '';
        return new Date(params.value).toISOString();
      }
    },
    { 
      headerName: 'Actions',  
      cellRenderer: ActionCellRenderer,
      cellRendererParams: {
        onEdit,
        onDelete
      }
    }
  ]
}

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});
