import axios from "axios"; 

const API = axios.create({
    baseURL:"http://localhost:5100/api/"
});

export const userSignIn = async(data) => API.post("/user/signIn", data);
export const userSignUp = async(data) => API.post("/user/signUp", data);
