import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserList } from "../../interfaces/user.interface";
import { UserService } from "../../Services/axios.service";

export interface UserState {
    loading: boolean,
    userData: UserList,
}

const initialState: UserState = {
    loading: false,
    userData: []
}

export const fetchUsersAsync = createAsyncThunk(
    'users/fetchUsers',
    async (): Promise<UserList> => {
        const response = await UserService.getUsers();
        return response;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchUsersAsync.pending, (state: UserState) => {
            state.loading = true;
        })
        builder.addCase(fetchUsersAsync.fulfilled, (state: UserState, action: PayloadAction<UserList>) => {
            state.loading = false;
            state.userData = action.payload;
        })
        builder.addCase(fetchUsersAsync.rejected, (state: UserState) => {
            state.loading = false;
        })
    },
})

export default userSlice.reducer;