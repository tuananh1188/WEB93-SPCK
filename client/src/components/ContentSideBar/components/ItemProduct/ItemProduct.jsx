import styles from './styles.module.scss';
import { IoIosClose } from 'react-icons/io';

function ItemProduct() {
    const { container, boxContent, title, price, boxClose,size } = styles;
    return (
        <div className={container}>
            <img
                src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-2.1-min.jpg'
                alt=''
            />
            <div className={boxClose}>
                <IoIosClose style={{ fontSize: '25px' }} />
            </div>
            <div className={boxContent}>
                <div className={title}>Tilte of product</div>
                <div className={size}>Size:M</div>
                <div className={price}>$119.98</div>
                <div className={price}>SKU: 12349</div>
            </div>
        </div>
    );
}

export default ItemProduct;
