import { IoCartOutline } from 'react-icons/io5';
import HeaderSidebar from '../components/HeaderSidebar/HeaderSidebar';
import ItemProduct from '../components/ItemProduct/ItemProduct';
import styles from './styles.module.scss';
import Button from '../../Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

function Cart() {
    const {
        container,
        total,
        boxBtn,
        price,
        containerListProductCart,
        overLayLoading
    } = styles;
    const { listProductCart, isLoading } = useContext(SideBarContext);

    return (
        <div className={container}>
            <div>
                <HeaderSidebar
                    icon={<IoCartOutline style={{ fontSize: '30px' }} />}
                    title={'CART'}
                />
                <div className={containerListProductCart}>
                    {listProductCart.map((item, index) => {
                        const productInfo = item.productId || {};
                        return (
                            <ItemProduct
                                key={index}
                                src={productInfo.images?.[0]}
                                nameProduct={productInfo.name}
                                priceProduct={item.price}
                                skuProduct={productInfo.sku}
                                sizeProduct={item.size}
                                quantity={item.quantity}
                                productId={productInfo._id}
                                userId={item._id}
                            />
                        );
                    })}
                    {isLoading && (
                        <div className={overLayLoading}>
                            <LoadingTextCommon />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className={total}>
                    <p>SUBTOTAL</p>
                    <p className={price}>$199.99</p>
                </div>
                <div className={boxBtn}>
                    <Button content={'VIEW CART'} isPrimary={false} />
                    <Button content={'CHECKOUT'} isPrimary={false} />
                </div>
            </div>
        </div>
    );
}

export default Cart;
