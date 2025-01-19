import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginSuccess: (state, action) => {
            state.currentUser = action.payload.existingUser;
            localStorage.setItem("joblens-app-token", action.payload.token);
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("joblens-app-token");
        },
    },
});

export const {loginSuccess, logout} = userSlice.actions;

export default userSlice.reducer;