// axios.get("/api/flights/")
//             .then(resp => {

//                 dispatch(setCurrentFlights(resp.data))
//             })
import api from "../common/api"



const FlightsService = {}

FlightsService.fetchFlights = function (params) {
    return api({
        url: '/api/flights/',
        params
    })
}
FlightsService.deleteFlight = function (flight_id) {
    return api({
        url: `/api/flights/${flight_id}`,
        method : "DELETE"
    })
}
FlightsService.uploadFlightImage = function (data) {
    return api({
        url: '/api/flights/image_upload/',
        data,
        headers: {'Content-Type': 'multipart/form-data' },
        method : 'POST'
    })
}
export default FlightsService