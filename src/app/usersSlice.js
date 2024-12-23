import { createSlice, createAction } from "@reduxjs/toolkit";

export const setUsersError = createAction('setUsersError');

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        error: null,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setUsersError, (state, action) => {
            state.error = action.payload;
        });
    }
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;