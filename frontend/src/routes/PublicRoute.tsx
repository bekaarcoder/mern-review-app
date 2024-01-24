import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const PublicRoute = () => {
    const { loggedInUser } = useAppContext();

    return <>{!loggedInUser ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PublicRoute;
