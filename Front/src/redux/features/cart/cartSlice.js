import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItem: {},
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItem: (state, action) => {

            state.cartItem = action.payload
        }
    }
})


export const { setCartItem } = cartSlice.actions
export default cartSlice.reducer
export const selectCheckoutFlight = (state) => state.cart.cartItem.flight