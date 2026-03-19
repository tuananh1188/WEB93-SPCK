import { children, createContext, useState, useEffect } from 'react';
import { getProducts } from '../apis/productsService';

export const OurShopContext = createContext();

export const OurShopProvider = ({ children }) => {
    const sortOptions = [
        { label: 'Default sorting', value: '0' },
        { label: 'Sort by popularity', value: '1' },
        { label: 'Sort by average rating', value: '2' },
        { label: 'Sort by latest', value: '3' },
        { label: 'Sort by price: low to high', value: '4' },
        { label: 'Sort by price: high to low', value: '5' }
    ];

    const showOptions = [
        { label: '8', value: '8' },
        { label: '12', value: '12' },
        { label: 'All', value: 'all' }
    ];

    const [sortId, setSortId] = useState('0');
    const [showId, setShowId] = useState('8');
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchProducts = (isLoadMore = false) => {
        const targetPage = isLoadMore ? page + 1 : 1;

        const query = {
            sortId: sortId,
            page: targetPage,
            limit: showId
        };
        if (!isLoadMore) setIsLoading(true);
        getProducts(query)
            .then((res) => {
                if (isLoadMore) {
                    setProducts((prev) => {
                        const existingIds = new Set(
                            prev.map((item) => item._id)
                        );
                        const newItems = res.data.filter(
                            (item) => !existingIds.has(item._id)
                        );
                        return [...prev, ...newItems];
                    });
                } else {
                    setProducts(res.data);
                }

                setPage(res.pagination.page);
                setTotal(res.pagination.total);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    const handleLoadMore = () => {
        fetchProducts(true);
    };

    useEffect(() => {
        fetchProducts(false);
    }, [sortId, showId]);

    const isShowAll = showId === 'all';

    const values = {
        sortOptions,
        showOptions,
        setSortId,
        setShowId,
        setIsShowGrid,
        products,
        isShowGrid,
        isLoading,
        handleLoadMore,
        total,
        page,
        isShowAll
    };

    return (
        <OurShopContext.Provider value={values}>
            {children}
        </OurShopContext.Provider>
    );
};
