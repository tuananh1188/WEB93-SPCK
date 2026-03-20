import { IoCartOutline } from 'react-icons/io5';
import HeaderSidebar from '../components/HeaderSidebar/HeaderSidebar';
import ItemProduct from '../components/ItemProduct/ItemProduct';
import styles from './styles.module.scss';
import Button from '../../Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const {
        container,
        total,
        boxBtn,
        price,
        containerListProductCart,
        overLayLoading,
        isEmpty,
        boxEmpty,
        boxBtnEmpty,
        footerCart
    } = styles;

    const navigate = useNavigate();
    const { listProductCart, isLoading, setIsOpen } =
        useContext(SideBarContext);

    const handleNavigateToShop = () => {
        navigate('/shop');
        setIsOpen(false);
    };

    const subTotal = listProductCart.reduce((acc, item) => {
        return acc + (Number(item.price) * Number(item.quantity) || 0);
    }, 0);

    return (
        <div className={cls(container, { [isEmpty]: !listProductCart.length })}>
            <HeaderSidebar
                icon={<IoCartOutline style={{ fontSize: '30px' }} />}
                title={'CART'}
            />
            {listProductCart.length ? (
                <>
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
                    <div className={footerCart}>
                        <div className={total}>
                            <p>SUBTOTAL</p>
                            <p className={price}>
                                $
                                {subTotal.toLocaleString(undefined, {
                                    minimumFractionDigits: 2
                                })}
                            </p>
                        </div>
                        <div className={boxBtn}>
                            <Button content={'VIEW CART'} isPrimary={false} />
                            <Button content={'CHECKOUT'} isPrimary={false} />
                        </div>
                    </div>
                </>
            ) : (
                <div className={boxEmpty}>
                    <div>No product in the cart.</div>
                    <div className={boxBtnEmpty}>
                        <Button
                            content={'RETURN TO SHOP'}
                            onClick={handleNavigateToShop}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
