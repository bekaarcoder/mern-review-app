import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import TextInputField from '../components/form/TextInputField';

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        console.log(data);
    };

    return (
        <div className="container">
            <div className="row justify-content-center vh-90 align-items-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign In</h5>
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
                                        Sign In
                                    </button>
                                </div>
                            </form>
                            <div className="mt-4 d-flex justify-content-between">
                                <a href="#" className="link-secondary">
                                    Forgot Password
                                </a>
                                <Link to="/sign-up" className="link-secondary">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
