import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { MouseEvent } from 'react';

const NotVerified = () => {
    const { loggedInUser } = useAppContext();

    const navigate = useNavigate();

    const handleNavigate = (e: MouseEvent) => {
        e.preventDefault();
        navigate('/email-verification', {
            state: { user: loggedInUser?.userId },
        });
    };

    return (
        <div>
            {loggedInUser && !loggedInUser.isVerified && (
                <div className="row justify-content-center">
                    <div className="col-md-10 col-sm-12 col-lg-6">
                        <div
                            className="alert alert-info text-center"
                            role="alert"
                        >
                            It seems that your email is not yet verified. Please{' '}
                            <a href="#" onClick={handleNavigate}>
                                click here
                            </a>{' '}
                            to verify.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotVerified;
