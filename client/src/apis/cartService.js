import axiosClient from './axiosClient';

const addProductToCart = async (data) => {
    return await axiosClient.post('/cart', data);
};

export { addProductToCart };
