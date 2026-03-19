import { useContext, useState } from 'react';
import styles from '../styles.module.scss';
import { SideBarContext } from '../../../contexts/SideBarProvider';
import { StoreContext } from '../../../contexts/storeProvider';
import { useNavigate } from 'react-router-dom';

function Menu({ content, href }) {
    const { menu, subMenu } = styles;
    const { setIsOpen, setType } = useContext(SideBarContext);
    const { userInfo, handleLogOut } = useContext(StoreContext);
    const [isShowSubMenu, setIsShowSubMenu] = useState(false);
    const navigate = useNavigate();
    const handleClickShowLogin = () => {
        if (content === 'Sign in' && !userInfo) {
            setIsOpen(true);
            setType('login');
        }
        if (content === 'Our Shop') {
            navigate('/shop');
        }
    };

    const handleClickLogOut = () => {
        handleLogOut();
        setIsShowSubMenu(false);
    };

    const handleRenderText = (content) => {
        if (content === 'Sign in' && userInfo) {
            return `Hello: ${userInfo?.email}`;
        } else {
            return content;
        }
    };

    const handleHover = () => {
        if (content === 'Sign in' && userInfo) {
            setIsShowSubMenu(true);
        }
    };

    return (
        <div
            className={menu}
            onClick={handleClickShowLogin}
            onMouseEnter={handleHover}
            onMouseLeave={() => setIsShowSubMenu(false)}
        >
            {handleRenderText(content)}
            {isShowSubMenu && (
                <div
                    onMouseLeave={() => setIsShowSubMenu(false)}
                    className={subMenu}
                    onClick={handleClickLogOut}
                >
                    LOG OUT
                </div>
            )}
        </div>
    );
}

export default Menu;
