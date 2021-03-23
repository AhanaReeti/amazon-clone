import axios from "axios";

const instance = axios.create({
    //the API url
    baseURL : 'https://us-central1-fir-e3fd9.cloudfunctions.net/api'
   // baseURL : 'http://localhost:5001/fir-e3fd9/us-central1/api'
})

export default instance;
