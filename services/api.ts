import axios from "axios";

const nextServer = axios.create({
    baseURL: '/api',
})

export default nextServer;