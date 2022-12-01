import { Button, FormGroup, TextField, MenuItem, FormControl } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useReducer, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addTodoAsync, fetchTodosAsync } from "../features/todos/todoSlice";
import { fetchUsersAsync } from "../features/users/userSlice";

const AddTodoToolbar = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.userData)
    const loading = useAppSelector(state => state.todos.loading);
    const [dataPresent, setDataPresent] = useState<boolean>(false);
    
    useEffect(() => {
        if (!dataPresent) {
            dispatch(fetchUsersAsync());
            setDataPresent(true);
        }
    }, [dispatch, dataPresent])

    const [formInput, setFormInput] = useReducer(
        (state:any, newState:any) => ({ ...state, ...newState }),
        {
        name: "",
        user: 0,
        isComplete: false
    })

    const handleInput = (event:any) => {
        console.log(event.target.name + ":" + event.target.value)
        const name = event.target.name
        const newValue = event.target.value
        setFormInput({[name]: newValue})
    }

    const onSubmitClicked = (event:any) => {
        event.preventDefault()
        if (formInput.name  === '') {
            return
        }
        if (formInput.user === 0) {
            return 
        }
        dispatch(addTodoAsync(formInput))
        dispatch(fetchTodosAsync())
        }

    return (
        <div className="AddTodoToolBar">
            <form onSubmit={onSubmitClicked}>
                <FormControl>
                    <Stack direction={"row"} spacing={2}>
                        <FormGroup>
                            <TextField required label="Task Name" variant="outlined" name="name" fullWidth id="input-taskName" onChange={handleInput} />
                        </FormGroup>
                        <FormGroup>
                            <TextField name="user"
                                select
                                style={{width: 222}}
                                defaultValue=''
                                required
                                id="input-user"
                                label="User"
                                onChange={handleInput}>
                                    {users.map((user) => {
                                        return (
                                            <MenuItem key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</MenuItem>
                                        )})}
                            </TextField>
                        </FormGroup>
                        <Button variant="contained"
                            disabled={loading}
                            type="submit"
                        >Add Task</Button>
                    </Stack>
                </FormControl>
            </form>
        </div>
    )
}

export default AddTodoToolbar;

