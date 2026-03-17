import axiosClient from "./axiosClient";

const register = async (body) => {
    return await axiosClient.post('/users/register',body)
}

const signIn = async (body) => {
    return await axiosClient.post('/users/login',body);
}

export {register,signIn};