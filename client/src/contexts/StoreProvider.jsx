import { useEffect, useState, createContext } from 'react';
import { getInfo } from '../apis/authService';
import Cookies from 'js-cookie';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(Cookies.get('userId'));

    const handleLogOut = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('userId');
        setUserInfo(null);
        setUserId(null);
        window.location.reload();
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (userId && token && !userInfo) {
            getInfo(userId)
                .then((res) => {
                    setUserInfo(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userId, userInfo]);
    return (
        <StoreContext.Provider
            value={{ userInfo, setUserInfo, handleLogOut, setUserId, userId }}
        >
            {children}
        </StoreContext.Provider>
    );
};
