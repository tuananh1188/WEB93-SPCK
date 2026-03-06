import MyHeader from '../Header/Header';
import Banner from '../Banner/Banner';
import AdvanceHeadling from '../AdvanceHeadling/AdvanceHeadling';
import Info from '../Info/Info';
import HeadingListProducts from '../HeadingListProducts/HeadingListProducts';
import { useEffect, useState } from 'react';
import { getProducts } from '../../apis/productsService';
import PopularProduct from '../PopularProduct/PopularProduct';
import SaleHomepage from '../SaleHomepage/SaleHomepage';
import MyFooter from '../Footer/Footer';

function HomePage() {
    const [listProducts, setListProducts] = useState([]);
    useEffect(() => {
        getProducts().then((res) => {
            setListProducts(res.contents);
        });
    }, []);
    return (
        <>
            <MyHeader />
            <Banner />
            <Info />
            <AdvanceHeadling />
            <HeadingListProducts data={listProducts.slice(0, 2)} />
            <PopularProduct data={listProducts.slice(2, listProducts.length)} />
            <SaleHomepage />
            <MyFooter />
        </>
    );
}

export default HomePage;
