import axios from "axios"

export type User = {
    _id:string,
    username?:string,
    email:string,
    password:string,
}
export const registerUser = (data:User) =>{
    return axios.post("/auth/register", data)
}
export const LoginUser = (data:User) =>{
    return axios.post("/auth/login", data)
}