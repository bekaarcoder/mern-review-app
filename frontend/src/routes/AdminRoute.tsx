import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const AdminRoute = () => {
    const { loggedInUser, loading } = useAppContext();
    console.log('Loading', loading);
    console.log('user', loggedInUser);
    return (
        <>
            {!loading && (
                <>
                    {loggedInUser && loggedInUser.role === 'admin' ? (
                        <Outlet />
                    ) : (
                        <Navigate to="/not-found" />
                    )}
                </>
            )}
        </>
    );
};

export default AdminRoute;
