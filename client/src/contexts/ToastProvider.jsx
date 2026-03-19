import { children, createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const value = { toast };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
            />
        </ToastContext.Provider>
    );
};
