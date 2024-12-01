import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: sessionStorage.getItem('token') || '',
        isLoggedIn: !!sessionStorage.getItem('token'),
        userId: sessionStorage.getItem('userId') || null,
        userName: sessionStorage.getItem('userName') || null
    },
    reducers: {
        userAuthenticated: (state, action) => {
            console.log("Authentication Action Payload:", action.payload);
            
            sessionStorage.setItem('token', action.payload.token);
            state.token = action.payload.token;
            state.isLoggedIn = true;

            if (action.payload.userName) {
                sessionStorage.setItem('userName', action.payload.userName);
                state.userName = action.payload.userName;
            }

            if (action.payload.userId) {
                console.log("Storing userId:", action.payload.userId);
                sessionStorage.setItem('userId', action.payload.userId);
                state.userId = action.payload.userId;
            }
        },
        logout: (state) => {
            sessionStorage.clear();
            state.token = '';
            state.userId = null;
            state.userName = null;
            state.isLoggedIn = false;
        }
    }
});

export const { userAuthenticated, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;