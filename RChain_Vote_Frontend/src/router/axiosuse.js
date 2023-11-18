import axios from "axios";
export const instance = axios.create({
    baseURL:"http://localhost:8080",
    timeout:0
})
export function get(url,params){
    return instance.get(url,{
        params
    });
}

export function post (url,data){
    return instance.post(url,data);
}