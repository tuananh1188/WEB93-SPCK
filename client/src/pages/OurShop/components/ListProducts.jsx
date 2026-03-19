import React, { useContext } from 'react';
import MainLayout from '@components/Layout/Layout';
import { OurShopContext } from '@contexts/OurShopProvider';
import ProductItem from '@components/ProductItem/ProductItem';
import styles from '../styles.module.scss';
import Button from '../../../components/Button/Button';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

function ListProducts() {
    const { containerProduct, containerGrid, sectionListProduct, rotate } =
        styles;
    const {
        products,
        isShowGrid,
        isLoading,
        handleLoadMore,
        total,
        isShowAll
    } = useContext(OurShopContext);

    return (
        <div className={sectionListProduct}>
            <MainLayout>
                {isLoading ? (
                    <>Loading...</>
                ) : (
                    <>
                        <div
                            className={
                                isShowGrid ? containerProduct : containerGrid
                            }
                        >
                            {products?.map((item) => (
                                <ProductItem
                                    key={item._id}
                                    src={item.images[0]}
                                    prevSrc={item.images[1]}
                                    name={item.name}
                                    price={item.price}
                                    details={item}
                                    isHomepage={false}
                                />
                            ))}
                        </div>
                        {products.length < total && !isShowAll && (
                            <div
                                style={{
                                    width: '180px',
                                    margin: '50px auto'
                                }}
                            >
                                <Button
                                    content={
                                        isLoading ? (
                                            <LoadingTextCommon />
                                        ) : (
                                            'LOAD MORE PRODUCT'
                                        )
                                    }
                                    onClick={handleLoadMore}
                                    disabled={isLoading}
                                />
                            </div>
                        )}
                    </>
                )}
            </MainLayout>
        </div>
    );
}

export default ListProducts;
