import axios from "axios"; 

const API = axios.create({
    baseURL:"http://10.19.130.225:5000"
});

// export const userSignIn = async(data) => API.post("/login", data);
export const userSignUp = async(data) => API.post("/register", data);

export const userSignIn = async (data) => {
    try {
        const response = await API.post("/login", data);
        if(response.status == 200){
            console.log("Bhadwa mc");
        }
    } catch (error) {
        console.error("Error in userSignUp:", error);
    }
};


export default API; 