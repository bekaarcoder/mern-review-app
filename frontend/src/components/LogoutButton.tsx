import { useNavigate } from 'react-router-dom';
import { signOut } from '../api/auth';
import { useAppContext } from '../hooks/useAppContext';

const LogoutButton = () => {
    const { onLogout, showToast } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await signOut();
        if ('error' in response) {
            showToast({ message: response.error, type: 'ERROR' });
        } else {
            onLogout();
            showToast({ message: 'You are logged out', type: 'SUCCESS' });
            navigate('/');
        }
    };

    return (
        <button onClick={handleLogout} className="btn btn-outline-light">
            <i className="bi bi-box-arrow-left"></i> Logout
        </button>
    );
};

export default LogoutButton;
