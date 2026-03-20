import React from 'react';
import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import Steps from './components/steps/Steps';
import Contents from './components/contents/Contents';
import styles from './styles.module.scss';

function Cart() {
    const { container } = styles;
    return (
        <>
            <MyHeader />
            <div className={container}>
                <Steps />
                <Contents />
            </div>
            <MyFooter />
        </>
    );
}

export default Cart;
