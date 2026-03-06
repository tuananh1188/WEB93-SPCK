import styles from './styles.module.scss';
import reloadIcon from '@icons/reloadIcon.svg';
import heartIcon from '@icons/heartIcon.svg';
import cartIcon from '@icons/cartIcon.svg';

function ProductItem({ src, prevSrc, name, price }) {

    const { boxImg, showImgWhenHover, showFncWhenHover, boxIcon, title, priceClass } = styles;
    return (
        <div>
            <div className={boxImg}>
                <img
                    src={src}
                    alt=''
                />
                <img
                    src={prevSrc}
                    alt=''
                    className={showImgWhenHover}
                />
                <div className={showFncWhenHover}>
                    <div className={boxIcon}>
                        <img src={cartIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={heartIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={reloadIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={cartIcon} alt='' />
                    </div>
                </div>
            </div>
            <div className={title}>{name}</div>
            <div className={priceClass}>{price}</div>
        </div>
    );
}

export default ProductItem;
