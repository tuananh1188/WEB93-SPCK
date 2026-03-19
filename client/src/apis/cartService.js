import axiosClient from './axiosClient';

const addProductToCart = async (data) => {
    return await axiosClient.post('/carts/add', data);
};

const getCart = async (userId) => {
    return await axiosClient.get(`/carts/${userId}`);
};

const deleteItem = async (productId, size) => {
    return await axiosClient.delete(`/carts/${productId}/${size} `);
};

export { addProductToCart, getCart, deleteItem };
