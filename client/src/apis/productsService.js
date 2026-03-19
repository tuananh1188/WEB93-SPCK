import axiosClient from './axiosClient';

const getProducts = async (query) => {
    const { sortId, page = 1, limit = 10 } = query;
    const sortMapping = {
        0: '-createdAt',
        1: '-sold',
        2: '-rating',
        3: '-createdAt',
        4: 'price',
        5: '-price'
    };
    const finalSortType = sortMapping[sortId] || 'createdAt';
    try {
        const res = await axiosClient.get('/products', {
            params: {
                sort: finalSortType,
                page,
                limit: limit === 'all' ? 100 : limit
            }
        });
        return res.data;
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
