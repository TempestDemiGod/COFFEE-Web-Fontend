import axios from "axios";
const URI_BACKEND = 'https://coffeeprojectbackend.glitch.me/api/v1'


const instance = axios.create({
    baseURL: URI_BACKEND,
    withCredentials: true,
})

export default instance