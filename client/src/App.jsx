import { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routers } from './routers/routers';
import { SideBarProvider } from '@/contexts/SideBarProvider';
import Sidebar from './components/Sidebar/Sidebar';
import { ToastProvider } from './contexts/ToastProvider';

function App() {
    return (
        <ToastProvider>
            <SideBarProvider>
                <Sidebar />
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {routers.map((item, index) => {
                                return (
                                    <Route
                                        path={item.path}
                                        element={<item.component />}
                                        key={index}
                                    />
                                );
                            })}
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </SideBarProvider>
        </ToastProvider>
    );
}

export default App;
