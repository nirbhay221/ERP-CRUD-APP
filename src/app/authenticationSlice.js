import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: sessionStorage.getItem('token') || '',  
        isLoggedIn: !!sessionStorage.getItem('token'),  
    },
    reducers: {
        userAuthenticated: (state, action) => {
            console.log("Action Payload:", action.payload); 
            sessionStorage.setItem('token', action.payload.token);  
            console.log("Session Storage Item: ", sessionStorage.getItem('token'));  
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            sessionStorage.clear();
            state.token = '';
            state.isLoggedIn = false;
        }
    }
})

export const { userAuthenticated, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
