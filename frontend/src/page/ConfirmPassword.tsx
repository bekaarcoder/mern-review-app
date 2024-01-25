import { useForm } from 'react-hook-form';
import TextInputField from '../components/form/TextInputField';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/auth';
import { useAppContext } from '../hooks/useAppContext';
import { useEffect } from 'react';

interface ConfirmPasswordFormData {
    newPassword: string;
    confirmPassword: string;
}

const ConfirmPassword = () => {
    const { showToast } = useAppContext();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const userId = searchParams.get('id');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ConfirmPasswordFormData>();

    const onSubmit = async (data: ConfirmPasswordFormData) => {
        const response = await resetPassword({ token, userId, ...data });
        if ('error' in response) {
            showToast({ message: response.error, type: 'ERROR' });
        } else {
            showToast({
                message: 'You have successfully changed your password',
                type: 'SUCCESS',
            });
            navigate('/sign-in');
        }
    };

    useEffect(() => {
        if (!token || !userId) {
            navigate('/');
        }
    }, [token, userId, navigate]);

    return (
        <div className="row justify-content-center vh-90 align-items-center">
            <div className="col-sm-12 col-md-8 col-lg-5">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">
                            Change Your Password
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextInputField
                                name="newPassword"
                                type="password"
                                label="New Password"
                                register={register}
                                registerOptions={{
                                    required: 'Password is required',
                                }}
                                error={errors.newPassword}
                            />
                            <TextInputField
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                register={register}
                                registerOptions={{
                                    required: 'Confirm Password is required',
                                }}
                                error={errors.confirmPassword}
                            />
                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-dark"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div className="d-flex justify-content-between mt-4">
                            <Link to="/sign-in" className="link-secondary">
                                Sign In
                            </Link>
                            <Link to="/sign-up" className="link-secondary">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPassword;
