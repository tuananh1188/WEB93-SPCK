import MainLayout from '../Layout/Layout';
import styles from './styles.module.scss';
import CountdownBanner from '../CountdownBanner/CountdownBanner';
import ProductItem from '../ProductItem/ProductItem';

function HeadingListProducts({ data }) {
    const { container, containerItem } = styles;
    return (
        <MainLayout>
            <div className={container}>
                <CountdownBanner />
                <div className={containerItem}>
                    {data.map((item, index) => {
                        <ProductItem
                            key={index}
                            src={item.images[0]}
                            preSrc={item.images[1]}
                            name={item.name}
                            price={item.price}
                        />;
                    })}
                </div>
            </div>
        </MainLayout>
    );
}

export default HeadingListProducts;
