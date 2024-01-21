import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './page/Login';
import Register from './page/Register';

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
        ],
    },
]);

export default router;
