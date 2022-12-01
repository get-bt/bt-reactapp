import { Button, Toolbar } from "@mui/material";
import { Clear, Done, Delete } from "@mui/icons-material";
import { DataGrid, getGridBooleanOperators, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { TodoType } from "../../interfaces/todo.interface";
import { fetchUsersAsync } from "../users/userSlice";
import { deleteTodoAsync, editTodoAsync, fetchTodosAsync } from "./todoSlice";


const TodoDisplayer = () => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todos.todoData);
    const users = useAppSelector(state => state.users.userData);
    const [dataPresent, setDataPresent] = useState<boolean>(false);

    useEffect(() => {
        if (!dataPresent) {
            dispatch(fetchTodosAsync())
            dispatch(fetchUsersAsync())     
            setDataPresent(true)
        }
    }, [dispatch, dataPresent])


    const getUserName = (id: number):string => {
        let user = users.find(user => user.id === id)
        if (user)
          return (user?.firstName + " " + user?.lastName);
        return '';
    }

    const handleCompleteClick = (params:any) => {
        const updatedTodo = {
            ...params.row,
            isComplete: !params.row.isComplete
        };
        dispatch(editTodoAsync(updatedTodo))
        dispatch(fetchTodosAsync())
    }

    const handleDeleteClick = (id:number) => {
        dispatch(deleteTodoAsync(id))
        dispatch(fetchTodosAsync())
    }

    const QuickSearch = () => {
        return (
            <Toolbar className="QuickSearchToolbar">
                <GridToolbarQuickFilter/>
                <GridToolbarFilterButton/>
                <p>Edit Tasks by clicking on the data you wish to change.</p>
            </Toolbar>
        )
    }

    return (
        <div className="DataGridDiv">
            <DataGrid
                columns={[
                    { field: 'name', headerName: 'Name', width: 400, editable: true},
                    { field: 'user',
                        headerName: 'User',
                        width: 200,
                        type: "singleSelect",
                        valueOptions: users.map((e) => {
                            return (e.id!)
                        }),
                        valueFormatter(params) {
                            return getUserName(params.value)
                        },
                        editable: true,

                    },
                    { field: 'isComplete',
                        headerName: 'Completed',
                        headerAlign: 'center',
                        width: 120,
                        type: "singleSelect",
                        valueOptions: [`false`, `true`],
                        filterOperators: getGridBooleanOperators(),
                        valueFormatter(params) {
                            return params.value ==='true' ? 'Complete' : 'Not Complete'
                        },

                        renderCell: (params) => {
                            if (params.row.isComplete) {
                                return <Button color="success" fullWidth
                                onClick={() => {
                                    handleCompleteClick(params)
                                }}>
                                    <Done/>
                                </Button>
                            } else {
                                return <Button color="error" fullWidth
                                onClick={() => {
                                    handleCompleteClick(params)
                                }}>
                                    <Clear/>
                                </Button>
                            }
                        },
                    },
                    { field: 'Delete',
                        headerName: 'Delete',
                        headerAlign: 'center',
                        width: 100,
                        filterable: false,
                        renderCell: (params) => {
                            return (
                                <Button color='error' fullWidth
                                    onClick={() => 
                                        handleDeleteClick(params.row.id!)
                                }>
                                    <Delete />
                                </Button>
                            );
                          }
                    }
                ]} 
                rows={todos}
                editMode="row"
                loading = {useAppSelector(state => state.todos.loading)}
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={(newRow: any) => {
                    const updatedRow = { ...newRow} as TodoType;
                    dispatch(editTodoAsync(updatedRow))
                    return updatedRow;
                }}
                components = {{
                    Toolbar: QuickSearch
                }}
                />
            </div>
    );
}

export default TodoDisplayer;