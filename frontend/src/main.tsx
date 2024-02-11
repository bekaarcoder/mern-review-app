import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes.tsx';
import { AppContextProvider } from './context/AppContext.tsx';
import { AuthorContextProvider } from './context/AuthorContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppContextProvider>
            <AuthorContextProvider>
                <RouterProvider router={router} />
            </AuthorContextProvider>
        </AppContextProvider>
    </React.StrictMode>
);
