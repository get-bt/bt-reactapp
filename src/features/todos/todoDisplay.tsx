import { DataGrid, GridRowEditStopParams } from "@mui/x-data-grid";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { TodoType } from "../../interfaces/todo.interface";
import { fetchUsersAsync } from "../users/userSlice";
import { editTodoAsync, fetchTodosAsync } from "./todoSlice";

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

    const user = useRef(null);
    const complete = useRef(null);

    return (
        <div style={{ height: '600px', width: '100%' }}>
            <DataGrid
                columns={[
                    { field: 'id', headerName: 'ID', width: 50},
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
                        preProcessEditCellProps: ({ props }) => {
                        user.current = props.value;
                        return props;
                        }
                    },
                    { field: 'isComplete',
                        headerName: 'Completed',
                        width: 120,
                        type: "singleSelect",
                        valueOptions: [`false`, `true`],
                        valueFormatter(params) {
                            return params.value==='true' ? 'Complete' : 'Not Complete'
                        },
                        preProcessEditCellProps: ({ props }) => {
                            complete.current = props.value;
                            return props;
                        },
                        editable: true,
                    },
                ]} 
                rows={todos}
                editMode="row"
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={(newRow: any) => {
                    const updatedRow = { ...newRow} as TodoType;
                    dispatch(editTodoAsync(updatedRow))
                    return updatedRow;
                }}
                />
            </div>
    );
}

export default TodoDisplayer;