import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import flightsReducer from './features/flights/flightsSlice'
import cartReducer from './features/cart/cartSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        flights: flightsReducer,
        cart: cartReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: true
});
