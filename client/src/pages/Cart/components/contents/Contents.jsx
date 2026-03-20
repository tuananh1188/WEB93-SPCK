import React from 'react';
import styles from '../../Styles.module.scss';
import CartTable from './CartTable';
import { SideBarContext } from '@contexts/SideBarProvider';
import { useContext } from 'react';
import CartSummary from './CartSummary';

function Contents() {
    const { containerContents } = styles;
    const {listProductCart,handleDelete, handleUpdate, handleClear} = useContext(SideBarContext);
    return (
        <div className={containerContents}>
            <div>
                <CartTable
                    listProductCart={listProductCart || []} 
                    onRemoveItem={handleDelete} // Hàm xóa từ context/API
                    onUpdateQuantity={handleUpdate} // Hàm update từ context/API
                    onClearCart={handleClear}
                />
            </div>
            <div><CartSummary/></div>
        </div>
    );
}

export default Contents;
