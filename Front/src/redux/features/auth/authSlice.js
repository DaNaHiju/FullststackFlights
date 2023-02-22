import { createSlice } from "@reduxjs/toolkit";


const { access, refresh, user, permissions } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {}
const initialState = {
    access: access,
    refresh: refresh,
    user: user,
    permissions: permissions
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {

            const { access, refresh, user, permissions } = action.payload
            state.access = access
            state.refresh = refresh
            state.user = user
            state.permissions = permissions

            localStorage.setItem("auth", JSON.stringify(action.payload))
        },
        logOut: (state, action) => {
            // state.user = null
            state.access = null
            state.refresh = null
            state.user = null
            state.permissions = null
            localStorage.removeItem("auth")
        },
        // setPermissions: (state, action) => {
            
        //     state.access = null
        //     state.refresh = null
        //     state.user = null
        //     state.permissions = null
        //     localStorage.removeItem("auth")

        // },

    }
})


export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.access