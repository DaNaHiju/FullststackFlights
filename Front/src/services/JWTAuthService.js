import api from "../common/api"



const JWTService = {}

JWTService.whoami = function (params) {
    return api({
        url: '/me',
        params
    })
}

export default JWTService