import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            console.log("STATE: ", state.currentUser); 
            console.log("ACTION: ", action.payload.user); 
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("token");
        },
    },
});

export const {loginSuccess, logout} = userSlice.actions;

export default userSlice.reducer;