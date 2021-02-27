import axios from "axios";

const instance = axios.create({
    //the API url
    baseURL : 'http://localhost:5001/fir-e3fd9/us-central1/api'
})

export default instance;