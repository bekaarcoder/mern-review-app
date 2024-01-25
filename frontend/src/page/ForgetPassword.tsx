import { useForm } from 'react-hook-form';
import TextInputField from '../components/form/TextInputField';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../api/auth';
import { useAppContext } from '../hooks/useAppContext';

interface ForgetPassowrdFormData {
    emailOrUsername: string;
}

const ForgetPassword = () => {
    const { showToast } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgetPassowrdFormData>();

    const onSubmit = async (data: ForgetPassowrdFormData) => {
        const response = await requestPasswordReset(data);
        if ('error' in response) {
            showToast({ message: response.error, type: 'ERROR' });
        } else {
            showToast({
                message: 'Please check you email to reset your password',
                type: 'SUCCESS',
            });
        }
    };

    return (
        <div className="row justify-content-center vh-90 align-items-center">
            <div className="col-sm-12 col-md-8 col-lg-5">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">
                            Forget Password
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextInputField
                                name="emailOrUsername"
                                label="Email Address / Username"
                                register={register}
                                registerOptions={{
                                    required: 'Email or username is required',
                                }}
                                error={errors.emailOrUsername}
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

export default ForgetPassword;
