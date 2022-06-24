import axios from "axios";
const api = axios.create({
    BaseURL: "http://127.0.0.1:5000/",
})

export  default  api;
