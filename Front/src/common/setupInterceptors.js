import axiosInstance from './api'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import axios from 'axios';
import history from './history';
import { logOut, setCredentials } from '../redux/features/auth/authSlice';


const AUTH_TOKEN = "auth"
const TOKEN_PAYLOAD_KEY = 'authorization'

const setup = (store) => {



    const { dispatch } = store;
    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        async (config) => {

            let { access, refresh } = localStorage.getItem(AUTH_TOKEN) ? JSON.parse(localStorage.getItem(AUTH_TOKEN)) : {}

            if (access) {

                const user = jwt_decode(access)

                const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

                if (!isExpired) {
                    config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + access
                } else {

                    try {
                        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/refresh`, { refresh: refresh })

                        localStorage.setItem(AUTH_TOKEN, JSON.stringify(data))
                        dispatch(setCredentials({ ...data }));
                        config.headers[TOKEN_PAYLOAD_KEY] = "Bearer " + data.access
                    }
                    catch (errr) {
                        dispatch(logOut())

                        history.replace("/login")
                    }

                }
            }
            return config;
        }, (error) => {
            // Do something with request error
            return Promise.reject(error);
        });

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            // const originalConfig = err.config;
            // if (originalConfig.url !== "/auth" && err.response) {
            //     // Access Token was expired
            //     if (err.response.status === 401 && !originalConfig._retry) {
            //         originalConfig._retry = true;
            //         try {
            //             axiosInstance.post("/refresh", {
            //                 refresh: TokenService.getLocalRefreshToken(),
            //             })
            //                 .then((resp) => {

            //                     dispatch(setCredentials({ ...resp.data }));
            //                     // TokenService.updateLocalAccessToken(rs.data.access);
            //                     return axiosInstance(originalConfig);
            //                 }).catch(err => {
            //                     console.log("Failed to refresh token")
            //                     dispatch(logOut())

            //                     history.replace("/login")

            //                     return Promise.reject(err);
            //                 })

            //             // // const { accessToken } = rs.data;

            //         } catch (_error) {
            //             return Promise.reject(_error);
            //         }
            //     }
            // }
            return Promise.reject(err);
        }
    );

}

export default setup;