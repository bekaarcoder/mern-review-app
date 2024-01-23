import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './page/Login';
import Register from './page/Register';
import ForgetPassword from './page/ForgetPassword';
import EmailVerification from './page/EmailVerification';
import ConfirmPassword from './page/ConfirmPassword';
import NotFound from './page/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'sign-in', element: <Login /> },
            {
                path: 'sign-up',
                element: <Register />,
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
                path: 'confirm-password',
                element: <ConfirmPassword />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
