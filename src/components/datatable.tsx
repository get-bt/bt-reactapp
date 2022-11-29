import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from "@mui/x-data-grid";
import { UserList, UserType } from '../Interfaces/user.interface';
import { TodoList } from '../Interfaces/todo.interface';
import { useDataGridProps } from '@mui/x-data-grid/DataGrid/useDataGridProps';
import { isDifferentPointerPosition } from '@testing-library/user-event/dist/types/system/pointer/shared';

let users:UserList;

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Task ID', width: 70, },
  { field: 'name', headerName: 'Name', width: 400 },
  { field: 'user', headerName: 'User', hide: true },
  { field: 'UserName', headerName: 'User', width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${getUserName(params.row.user)} `
  },
  { field: 'isComplete', headerName: 'Completed', width: 120,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.isComplete ? 'Yes' : 'No'}`
  },
  { field: 'actions', headerName: 'Actions', width: 200 },
];

export default function DataTable(prop: {todos:TodoList, users:UserList}) {
  const todos = prop.todos
  users = prop.users
  return (
    <div style={{ height: 400, width: 'auto' }}>
      <DataGrid
        rows={todos}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

function getUserName(id: number):string {
  let user = users.find(user => user.id === id)
  if (user)
    return (user?.firstName + " " + user?.lastName);
  return '';
}