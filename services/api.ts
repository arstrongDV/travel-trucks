import axios from "axios";

const baseURL = 'http://localhost:3000/api';

const nextServer = axios.create({
    baseURL: baseURL,
})

export default nextServer;