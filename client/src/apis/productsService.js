import axiosClient from './axiosClient';

const getProducts = async () => {
    try {
        const res = await axiosClient.get('/products');
        console.log('Dữ liệu về tới Frontend:', res.data); // Kiểm tra xem data có phải mảng ko
        return res.data.data;
    } catch (error) {
        console.error(
            'Chi tiết lỗi Axios:',
            error.response?.data || error.message
        );
        // Nếu ở đây in ra "You are not login", bạn biết mình cần gửi Token rồi đấy!
        throw error;
    }
};

export { getProducts };
