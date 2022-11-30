import { configureStore } from '@reduxjs/toolkit';
import  todoReducer from '../features/todos/todoSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;