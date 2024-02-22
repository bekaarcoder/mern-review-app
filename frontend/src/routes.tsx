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
import AddBook from './page/admin/AddBook';
import AddAuthor from './page/admin/AddAuthor';
import EditAuthor from './page/admin/EditAuthor';
import EditBookDetail from './page/admin/EditBookDetail';
import { BookContextProvider } from './context/BookContext';
import { AuthorContextProvider } from './context/AuthorContext';

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
                    {
                        index: true,
                        element: (
                            <BookContextProvider>
                                <AdminDashboard />
                            </BookContextProvider>
                        ),
                    },
                    {
                        path: 'books',
                        element: (
                            <BookContextProvider>
                                <Books />
                            </BookContextProvider>
                        ),
                    },
                    { path: 'create-book', element: <AddBook /> },
                    { path: 'edit-book/:bookId', element: <EditBookDetail /> },
                    {
                        path: 'authors',
                        element: (
                            <AuthorContextProvider>
                                <Authors />
                            </AuthorContextProvider>
                        ),
                    },
                    { path: 'create-author', element: <AddAuthor /> },
                    { path: 'edit-author/:authorId', element: <EditAuthor /> },
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
