// import * as React from 'react';
// import SearchToolbar from './searchtoolbar';
// import { DataGrid, GridValueGetterParams} from '@mui/x-data-grid';
// import { useCallback } from 'react';
// import { TodoService, UserService } from '../Services/axios.service';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import Button from '@mui/material/Button';
// import { TodoList } from '../interfaces/todo.interface';
// import { UserList } from '../interfaces/user.interface';

// function escapeRegExp(value: string): string {
//     return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
//   }

// export default function QuickFilteringGrid() {

//   const[todos, setTodos] = React.useState<TodoList>([]);
//   const[users, setUsers] = React.useState<UserList>([]);
  
//   const [searchValue, setSearchValue] = React.useState<string>('')
//   const [userValue, setUserValue] = React.useState<string>('0')
//   const [completeValue, setCompleteValue] = React.useState<boolean>(false)
//   const [rows, setRows] = React.useState<any[]>(todos);

//   const getData = async () => {
//     const todos = await TodoService.getTodos();
//     const users = await UserService.getUsers();
//     setTodos(todos);
//     setUsers(users);
//   }
  
//   const getUserName = (id: number):string => {
//     let user = users.find(user => user.id === id)
//     if (user)
//       return (user?.firstName + " " + user?.lastName);
//     return '';
//   }

//   const onDeleteClick = async (event:any) => {
//     console.log(event.currentTarget.id)
//     await TodoService.deleteTodo(event.currentTarget.id)
//   }

//   const requestSearch = useCallback(() => {
//     let rowsToBe = todos;
//     if (searchValue) {
//         const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
//         const filteredRows = rowsToBe.filter((row: any) => {
//           return Object.keys(row).some((field: any) => {
//             return searchRegex.test(row[field].toString());
//           });
//         });
//         rowsToBe = filteredRows
//     }
//     if (userValue !== '0') {
//         const filteredRows = rowsToBe.filter((row:any) => {
//             return row.user === userValue
//         })
//         rowsToBe = filteredRows
//     }
//     if (completeValue !== null) {
//         console.log(completeValue)
//         const filteredRows = rowsToBe.filter((row:any) => {
//             return row.isComplete === completeValue
//         })
//         rowsToBe = filteredRows
//     }
//     setRows(rowsToBe)
//   }, [todos, searchValue, userValue, completeValue]);

//   React.useEffect(() => {
//     getData();
//   }, [rows]);

//   return (
//     <div style={{ height: '600px', width: '100%' }}>
//       <DataGrid
//         components={{ Toolbar: SearchToolbar}}
//         rows={rows}
//         columns={
//           [
//             { field: 'id', headerName: 'ID', width: 50 },
//             { field: 'name', headerName: 'Name', width: 400 },
//             { field: 'UserName', headerName: 'User', width: 200,
//                 valueGetter: (params: GridValueGetterParams) =>
//                   `${getUserName(params.row.user)} `
//             },
//             { field: 'isComplete', headerName: 'Completed', width: 120,
//                 valueGetter: (params: GridValueGetterParams) =>
//                   `${params.row.isComplete ? 'Yes' : 'No'}`
//             },
//             { field: 'actions', headerName: 'Actions', width: 200, renderCell(params) {
//               return (
//                 <div>
//                   <Button
//                     id={params.row.id}
//                     color="primary"
//                     ><EditIcon />
//                   </Button>
//                   <Button
//                     id={params.row.id!}
//                     onClick={onDeleteClick}
//                     color="error"
//                     ><DeleteIcon />
//                   </Button>
//                 </div>
//                 );
//               },
//             }
//           ]
//         }
//         componentsProps={{
//           toolbar: {
//             users: users,
//             onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => {
//               setSearchValue(event.target.value)
//               requestSearch()
//             },
//             onUserChange(selected: string ) {
//               setUserValue(selected)
//               requestSearch()
//             },
//             onCompleteChange(selected: boolean) {
//               console.log(selected)
//               setCompleteValue(selected)
//               requestSearch()
//             }
//           },
//         }}
//       />
//     </div>
//   );
// }

export {}