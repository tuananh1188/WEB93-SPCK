import styles from './styles.module.scss';
import reloadIcon from '@icons/reloadIcon.svg';
import heartIcon from '@icons/heartIcon.svg';
import cartIcon from '@icons/cartIcon.svg';
import cls from 'classnames';
import Button from '../Button/Button';
import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';

function ProductItem({
    src,
    prevSrc,
    name,
    price,
    details,
    isHomepage = true
}) {
    const { isShowGrid } = useContext(OurShopContext);
    const {
        boxImg,
        showImgWhenHover,
        showFncWhenHover,
        boxIcon,
        title,
        priceClass,
        boxSize,
        size,
        textCenter,
        boxBtn,
        content,
        containerItem,
        leftBtn,
        largImg
    } = styles;
    return (
        <div className={isShowGrid ? '' : containerItem}>
            <div className={cls(boxImg, { [largImg]: !isShowGrid })}>
                <img src={src} alt='' />
                <img src={prevSrc} alt='' className={showImgWhenHover} />
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
            <div className={isShowGrid ? '' : content}>
                {!isHomepage && (
                    <div className={boxSize}>
                        {details.attributes.size.map((item, index) => {
                            return (
                                <div key={index} className={size}>
                                    {item.name}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div
                    className={cls(title, {
                        [textCenter]: !isHomepage
                    })}
                >
                    {name}
                </div>
                {!isHomepage && <div className={textCenter}>Brand 01</div>}
                <div
                    className={cls(priceClass, {
                        [textCenter]: !isHomepage
                    })}
                >
                    {price}
                </div>
                {!isHomepage && (
                    <div className={cls(boxBtn, { [leftBtn]: !isShowGrid })}>
                        <Button content='ADD TO CART' />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductItem;
