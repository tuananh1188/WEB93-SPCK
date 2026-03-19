import { deleteItem } from '@apis/cartService';
import styles from './styles.module.scss';
import { IoIosClose } from 'react-icons/io';
import { useContext, useState } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

function ItemProduct({
    src,
    nameProduct,
    priceProduct,
    skuProduct,
    sizeProduct,
    quantity,
    productId,
    userId
}) {
    const {
        container,
        boxContent,
        title,
        price,
        boxClose,
        size,
        boxImg,
        confirmToast,
        boxBtnConfirm,
        btnCancel,
        btnDelete,
        overLayLoading
    } = styles;

    const { handleGetListProductCart } = useContext(SideBarContext);
    const { toast } = useContext(ToastContext);
    const [isDelete, setIsDelete] = useState(false);

    const executeDelete = async () => {
        setIsDelete(true);
        try {
            await deleteItem(productId, sizeProduct);
            toast.success(` ${nameProduct} deleted successfully! `);
            handleGetListProductCart(userId, 'cart');
        } catch (error) {
            console.error(error);
            toast.error("Product can't delete !");
        } finally {
            setIsDelete(false);
        }
    };

    const handleRemoveItem = () => {
        const toastId = toast(
            <div className={confirmToast}>
                <p>
                    Delete <b>{nameProduct}</b>(Size: {sizeProduct})?
                </p>
                <div className={boxBtnConfirm}>
                    <button
                        className={btnCancel}
                        onClick={() => toast.dismiss(toastId)}
                    >
                        Cancle
                    </button>
                    <button
                        className={btnDelete}
                        onClick={async () => {
                            toast.dismiss(toastId);
                            await executeDelete();
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false
            }
        );
    };

    return (
        <div
            className={container}
            style={{
                opacity: isDelete ? 0.5 : 1,
                pointerEvents: isDelete ? 'none' : 'auto'
            }}
        >
            <div className={boxImg}>
                <img src={src} alt='' />
            </div>
            <div className={boxClose} onClick={handleRemoveItem}>
                <IoIosClose
                    style={{
                        fontSize: '25px',
                        cursor: isDelete ? 'not-allowed' : 'pointer'
                    }}
                />
            </div>
            <div className={boxContent}>
                <div className={title}>{nameProduct}</div>
                <div className={size}>Size: {sizeProduct}</div>
                <div className={price}>
                    {quantity} x ${priceProduct}
                </div>
                <div className={price}>SKU: {skuProduct}</div>
            </div>
            {isDelete && (
                <div className={overLayLoading}>
                    <LoadingTextCommon />
                </div>
            )}
        </div>
    );
}

export default ItemProduct;
