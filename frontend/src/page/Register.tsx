import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth';
import TextInputField from '../components/form/TextInputField';
import { useAppContext } from '../hooks/useAppContext';

interface RegisterFormData {
    email: string;
    username: string;
    password: string;
}

const Register = () => {
    const { showToast } = useAppContext();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        const response = await signUp(data);
        if ('error' in response) {
            showToast({ message: response.error, type: 'ERROR' });
        } else {
            showToast({
                message: 'Account creation successful',
                type: 'SUCCESS',
            });
            navigate('/email-verification', {
                state: { user: response.data.user },
                replace: true,
            });
        }
    };

    return (
        <div className="row justify-content-center vh-90 align-items-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextInputField
                                name="email"
                                type="email"
                                label="Email Address"
                                register={register}
                                registerOptions={{
                                    required: 'Email is required',
                                }}
                                error={errors.email}
                                placeholder="johndoe@email.com"
                            />
                            <TextInputField
                                name="username"
                                type="text"
                                label="Username"
                                register={register}
                                registerOptions={{
                                    required: 'Username is required',
                                }}
                                error={errors.username}
                                placeholder="johndoe"
                            />

                            <TextInputField
                                name="password"
                                type="password"
                                label="Password"
                                register={register}
                                registerOptions={{
                                    required: 'Password is required',
                                }}
                                error={errors.password}
                            />
                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-dark"
                                    disabled={isSubmitting}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 d-flex justify-content-between">
                            <Link
                                to="/forget-password"
                                className="link-secondary"
                            >
                                Forgot Password
                            </Link>
                            <Link to="/sign-in" className="link-secondary">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
