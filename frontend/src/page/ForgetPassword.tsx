import { useForm } from 'react-hook-form';
import TextInputField from '../components/form/TextInputField';
import { Link } from 'react-router-dom';

interface ForgetPassowrdFormData {
    email: string;
}

const ForgetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgetPassowrdFormData>();

    const onSubmit = async (data: ForgetPassowrdFormData) => {
        console.log(data);
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
                                name="email"
                                label="Email Address"
                                register={register}
                                registerOptions={{
                                    required: 'Email is required',
                                }}
                                error={errors.email}
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
