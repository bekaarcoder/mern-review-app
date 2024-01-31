import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './page/Login';
import Register from './page/Register';
import ForgetPassword from './page/ForgetPassword';
import EmailVerification from './page/EmailVerification';
import ConfirmPassword from './page/ConfirmPassword';
import NotFound from './page/NotFound';
import Home from './page/Home';
import PublicRoute from './routes/PublicRoute';
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from './page/admin/AdminDashboard';
import Books from './page/admin/Books';
import Authors from './page/admin/Authors';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            {
                path: 'sign-in',
                element: <PublicRoute />,
                children: [{ index: true, element: <Login /> }],
            },
            {
                path: 'sign-up',
                element: <PublicRoute />,
                children: [
                    {
                        index: true,
                        element: <Register />,
                    },
                ],
            },
            {
                path: 'forget-password',
                element: <ForgetPassword />,
            },
            {
                path: 'email-verification',
                element: <EmailVerification />,
            },
            {
                path: 'reset-password',
                element: <ConfirmPassword />,
            },
            {
                path: 'admin',
                element: <AdminRoute />,
                children: [
                    { index: true, element: <AdminDashboard /> },
                    { path: 'books', element: <Books /> },
                    { path: 'authors', element: <Authors /> },
                ],
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
