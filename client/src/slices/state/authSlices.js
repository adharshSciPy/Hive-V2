import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    isLoggedIn: false,
    userRole: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setCredentials: (state, action) => {
            const { token } = action.payload;
            state.token = token;
            localStorage.setItem('token', JSON.stringify(token))
        },
        setRole: (state, action) => {
            const { role } = action.payload;
            state.userRole = role;
        },
        setLoggedIn: (state, action) => {
            const { boolean } = action.payload;
            state.isLoggedIn = boolean;
        },
        setLogout: (state) => {
            state.token = null;
            state.isLoggedIn = false;
            state.userRole = null;
            localStorage.removeItem('token');
        }
    }
})


export const { setCredentials, setLoggedIn, setRole, setLogout } = authSlice.actions
export default authSlice.reducer;