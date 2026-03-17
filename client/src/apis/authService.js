import axiosClient from './axiosClient';

const register = async (body) => {
    return await axiosClient.post('/users/register', body);
};

const signIn = async (body) => {
    return await axiosClient.post('/users/login', body);
};

const getInfo = async (id) => {
    return await axiosClient.get(`/users/info/${id}`)
}

export { register, signIn, getInfo };
