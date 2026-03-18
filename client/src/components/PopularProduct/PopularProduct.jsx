import styles from './styles.module.scss';
import MainLayout from '../Layout/Layout';
import ProductItem from '../ProductItem/ProductItem';

function PopularProduct({ data }) {
    const { container } = styles;
    return (
        <>
            <MainLayout>
                <div className={container}>
                    {data?.map((item) => (
                        <ProductItem
                            key={item._id}
                            src={item.images[0]}
                            prevSrc={item.images[1]}
                            name={item.name}
                            price={item.price}
                            details={item}
                        />
                    ))}
                </div>
            </MainLayout>
        </>
    );
}

export default PopularProduct;
