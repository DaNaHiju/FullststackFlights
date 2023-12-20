import { createSlice } from "@reduxjs/toolkit";

// Retrieving user credentials from local storage
const { access, refresh, user, permissions } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};
const initialState = {
    access: access,
    refresh: refresh,
    user: user,
    permissions: permissions
};

// Redux Slice for Authentication
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to set user credentials in the Redux store
        setCredentials: (state, action) => {
            const { access, refresh, user, permissions } = action.payload;
            state.access = access;
            state.refresh = refresh;
            state.user = user;
            state.permissions = permissions;

            // Saving credentials to local storage for persistent user sessions
            localStorage.setItem("auth", JSON.stringify(action.payload));
        },
        // Action to log out the user and clear credentials from the Redux store and local storage
        logOut: (state, action) => {
            state.access = null;
            state.refresh = null;
            state.user = null;
            state.permissions = null;
            localStorage.removeItem("auth");
        },
        // Additional action for setting permissions if needed in the future
        // setPermissions: (state, action) => {
        //     // ... (see your code)
        // },
    }
});

// Exporting Redux actions and reducer
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// Selectors for accessing current user and token from the Redux store
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.access;
