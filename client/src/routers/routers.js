import { lazy } from 'react';

const routers = [
    {
        path: '/',
        component: lazy(() => import('@components/HomePage/HomePage'))
    },
    {
        path: '/Blog',
        component: lazy(() => import('@components/Blog/Blog'))
    }
];

export { routers };
