import axios from "axios";


const api = axios.create({
    baseURL : "http://localhost:4135" ,
    withCredentials : true
})

export { api };
