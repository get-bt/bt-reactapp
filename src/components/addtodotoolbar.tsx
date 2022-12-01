import { Button, FormGroup, InputLabel } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem, Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useReducer, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addTodoAsync, fetchTodosAsync } from "../features/todos/todoSlice";
import { fetchUsersAsync } from "../features/users/userSlice";

const AddTodoToolbar = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users.userData)
    const [error, setError] = useState<string>('');
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
            setError('name too short')
            return
        }
        if (formInput.user === 0) {
            setError('no user selected')
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
                            <TextField required label="Task Name" variant="outlined" name="name" fullWidth id="input-taskName" helperText={error} onChange={handleInput} />
                        </FormGroup>
                        <FormGroup>
                            <InputLabel id="userSelectLabel">User</InputLabel>
                            <Select name="user"
                                style={{width: 222}}
                                value='' required
                                id="input-user"
                                labelId="userSelectLabel"
                                label="User"
                                onChange={handleInput}>
                                    <MenuItem selected disabled value=''>Please Select a User</MenuItem>
                                    {users.map((user) => {
                                        return (
                                            <MenuItem key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</MenuItem>
                                        )})}
                            </Select>
                        </FormGroup>
                        <Button variant="contained"
                            type="submit"
                        >Add Task</Button>
                    </Stack>
                </FormControl>
            </form>
        </div>
    )
}

export default AddTodoToolbar;

