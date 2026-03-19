import BoxIcon from './BoxIcon/BoxIcon';
import { dataBoxIcon, dataMenu } from './constants';
import Menu from './Menu/Menu';
import styles from './styles.module.scss';
import logo from '@images/Logo-retina.webp';
import useScrollHandling from '../../hooks/useScrollHandling';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { SideBarContext } from '../../contexts/SideBarProvider';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { TfiReload } from 'react-icons/tfi';

function MyHeader() {
    const {
        containerMenu,
        containerBoxIcon,
        containerHeader,
        containerBox,
        container,
        fixedHeader,
        topHeader,
        boxCart,
        quantity
    } = styles;

    const { scrollPosition } = useScrollHandling();
    const [fixePosition, setFixedPosition] = useState(false);
    const { setIsOpen, setType, listProductCart } = useContext(SideBarContext);

    const handleOpenSideBar = (type) => {
        setIsOpen(true);
        setType(type);
    };

    useEffect(() => {
        setFixedPosition(scrollPosition > 80);
    }, [scrollPosition]);

    return (
        <div
            className={classNames(container, topHeader, {
                [fixedHeader]: fixePosition
            })}
        >
            <div className={containerHeader}>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        {dataBoxIcon.map((item, index) => {
                            return (
                                <BoxIcon
                                    type={item.type}
                                    href={item.href}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                    <div className={containerMenu}>
                        {dataMenu.slice(0, 3).map((item, index) => {
                            return (
                                <Menu
                                    content={item.content}
                                    href={item.href}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </div>
                <div>
                    <img src={logo} alt='logo' width={153} />
                </div>
                <div className={containerBox}>
                    <div className={containerMenu}>
                        {dataMenu
                            .slice(3, dataMenu.length)
                            .map((item, index) => {
                                return (
                                    <Menu
                                        content={item.content}
                                        href={item.href}
                                        key={index}
                                    />
                                );
                            })}
                    </div>
                    <div className={containerBoxIcon}>
                        <TfiReload
                            style={{ fontSize: '25px' }}
                            onClick={() => handleOpenSideBar('compare')}
                        />
                        <FaRegHeart
                            style={{ fontSize: '25px' }}
                            onClick={() => handleOpenSideBar('wishlist')}
                        />
                        <div className={boxCart}>
                            <MdOutlineShoppingCart
                                style={{ fontSize: '25px' }}
                                onClick={() => handleOpenSideBar('cart')}
                            />
                            <div className={quantity}>
                                {listProductCart.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHeader;
