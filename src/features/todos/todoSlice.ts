import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoList, TodoType } from "../../interfaces/todo.interface";
import { TodoService } from "../../Services/axios.service";

export interface TodoState {
    loading: boolean,
    todoData: TodoList,
}

const initialState: TodoState = {
    loading: false,
    todoData: []
}

export const fetchTodosAsync = createAsyncThunk(
    'todos/fetchTodos',
    async (): Promise<TodoList> => {
        const response = await TodoService.getTodos();
        return response;
    }
)

export const fetchTodoAsync = createAsyncThunk(
    'todos/fetchTodobyID',
    async (todoId: number): Promise<TodoType> => {
        const response = await TodoService.getATodo(todoId)
        return response;
    },
)

export const editTodoAsync = createAsyncThunk(
    'todos/editTodobyID',
    async (newTodo: TodoType): Promise<TodoType> => {
        const {id, ...fields} = newTodo;
        const response = await TodoService.updateTodo(id!, fields);
        return response;
    }
)

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodobyID',
    async(todoId: number): Promise<void> => {
        await TodoService.deleteTodo(todoId);
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        //TODO: What, if any, reducers would I need here? I understand I'm exporting todoSlice.reducer, but would that cover everything?
    },
    extraReducers(builder) {
        builder.addCase(fetchTodosAsync.pending, (state: TodoState) => {
            state.loading = true;
        })
        builder.addCase(fetchTodosAsync.fulfilled, (state: TodoState, action: PayloadAction<TodoList>) => {
            state.loading = false;
            state.todoData = action.payload;
        })
        builder.addCase(fetchTodosAsync.rejected, (state: TodoState) => {
            state.loading = false;
        })
        builder.addCase(editTodoAsync.pending, (state: TodoState) => {
            state.loading = true;
        })
        builder.addCase(editTodoAsync.rejected, (state: TodoState, everything) => {
            console.log(everything.error)
            state.loading = false;
            console.log('failed')
        })
        //TODO: Do I need to add cases for every function I've created? Or is that purely if I'm to keep using state.loading? 
    },

})

export default todoSlice.reducer;