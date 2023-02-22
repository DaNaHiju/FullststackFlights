import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentFlights: [],
}
const flightsSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        setCurrentFlights: (state, action) => {

            state.currentFlights = action.payload
        }
    }
})


export const { setCurrentFlights } = flightsSlice.actions
export default flightsSlice.reducer
export const selectCurrentFlights = (state) => state.flights.currentFlights