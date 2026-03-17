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
        window.location.reload();
    };

    useEffect(() => {
        if (userId) {
            getInfo(userId)
                .then((res) => {
                    setUserInfo(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userId]);
    const contextValue = {
        userInfo,
        setUserInfo
    };
    return (
        <StoreContext.Provider
            value={{ contextValue, handleLogOut, setUserId }}
        >
            {children}
        </StoreContext.Provider>
    );
};
