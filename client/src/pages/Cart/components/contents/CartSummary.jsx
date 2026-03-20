import React from 'react';
import styles from '../../styles.module.scss';
import Button from '@components/Button/Button';
import cls from 'classnames';

function CartSummary() {
    const { containerSummary, title, boxTotal, price, subTotal, totals,containerMethods } =
        styles;
    return (
        <>
            <div className={containerSummary}>
                <div className={title}>CART TOTAL</div>
                <div className={cls(boxTotal, subTotal)}>
                    <div>SubTotal</div>
                    <div className={price}>$2.99</div>
                </div>
                <div className={cls(boxTotal, totals)}>
                    <div className={totals}>TOTAL</div>
                    <div>$2.99</div>
                </div>

                <Button content={'PROCEED CHECK OUT'} />
                <div className={space} style={{height:'10px'}}/>
                <Button content={'CONTINUE SHOPPING'} isPrimary={false} />
            </div>
            <div className={containerMethods}>
                <div></div>

            </div>
        </>
    );
}

export default CartSummary;
