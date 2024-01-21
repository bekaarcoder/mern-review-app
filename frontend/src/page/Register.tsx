import { Link } from 'react-router-dom';
import TextInputField from '../components/form/TextInputField';
import { useForm } from 'react-hook-form';

interface RegisterFormData {
    email: string;
    username: string;
    password: string;
}

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        console.log(data);
    };

    return (
        <div className="container">
            <div className="row justify-content-center vh-90 align-items-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign Up</h5>
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
                                <a href="#" className="link-secondary">
                                    Forgot Password
                                </a>
                                <Link to="/sign-in" className="link-secondary">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
