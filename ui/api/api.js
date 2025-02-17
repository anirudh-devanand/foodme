import axios from "axios"; 

const API = axios.create({
    baseURL:"http://10.19.130.225:5000"
});

export const userSignIn = async(data) => await API.post("/login", data);
export const userSignUp = async(data) => await API.post("/register", data);

export const marketPlaceData = async() => await API.get("/marketplace");

export const addItem = async(data) => await API.post("/addItem", data);

export const delItem = async(data) => await API.post('/deleteItem', data);


export const sellerList = async(data) => await API.post('/sellerList', data);
// export const userSignUp = async(data) =>{
//     try {
//         const response = await API.post("/register", data);
//         if(response.status == 200){
//             console.log("Come");
//         }
//     } catch (error) {
//         console.error("Error in userSignUp:", error);
//     }
// };


// export const userSignIn = async (data) => {
//     try {
//         const response = await API.post("/login", data);
//         if(response.status == 200){
//             console.log("Bhadwa mc");
//         }
//     } catch (error) {
//         console.error("Error in userSignUp:", error);
//     }
// };


export default API; 