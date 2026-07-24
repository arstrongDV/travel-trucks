import axios from "axios";

const baseURL = '/api';

const nextServer = axios.create({
    baseURL: baseURL,
})

export default nextServer;