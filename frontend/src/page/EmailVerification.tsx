import {
    ChangeEvent,
    FormEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api/auth';
import { useAppContext } from '../hooks/useAppContext';

const EmailVerification = () => {
    const { showToast } = useAppContext();

    const [verificationCode, setVerificationCode] = useState<string[]>(
        new Array(6).fill('')
    );
    const [activeField, setActiveField] = useState<number>(0);
    const [formState, setFormState] = useState<boolean>(true);

    const { state } = useLocation();
    const user = state?.user;

    const navigate = useNavigate();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const focusPreviousInputField = (index: number) => {
        const diff = index - 1;
        const nextIndex = diff !== 0 ? diff : 0;
        setActiveField(nextIndex);
    };

    const focusNextInputField = (index: number) => {
        setActiveField(index < 5 ? index + 1 : index);
    };

    const isVerificationCodeValid = useCallback((): boolean => {
        return verificationCode.every((val) => val !== '');
    }, [verificationCode]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        let value = e.target.value;

        if (value.length > 1) {
            value = value.slice(0, 1);
        }

        if (!value) {
            console.log('input');
            focusPreviousInputField(index);
        } else {
            focusNextInputField(index);
        }

        setVerificationCode((prev) => {
            const newVerificationCode = [...prev];
            newVerificationCode[index] = value;
            return newVerificationCode;
        });
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === 'Backspace') {
            if (!verificationCode[index]) {
                focusPreviousInputField(index);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await verifyEmail({
            userId: user,
            verificationCode: verificationCode.join(''),
        });

        if ('error' in response) {
            console.log(response.error);
            showToast({ message: response.error, type: 'ERROR' });
        } else {
            console.log(response.data);
            showToast({
                message: 'Email verification successful',
                type: 'SUCCESS',
            });
            navigate('/sign-in');
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeField]);

    useEffect(() => {
        if (!user) {
            // navigate('/not-found');
        }
    }, [user, navigate]);

    useEffect(() => {
        setFormState(!isVerificationCodeValid());
    }, [isVerificationCodeValid, verificationCode]);

    console.log('Formstate: ', formState);

    return (
        <div className="row justify-content-center vh-90 align-items-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">
                            Email Verification
                        </h2>
                        <p className="card-text text-center">
                            Enter your verification code sent to your email
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-center">
                                {verificationCode.map((_, index) => (
                                    <div
                                        style={{ width: '50px' }}
                                        className="mx-2"
                                        key={index}
                                    >
                                        <input
                                            type="number"
                                            value={verificationCode[index]}
                                            className="form-control text-center"
                                            maxLength={1}
                                            min={0}
                                            max={9}
                                            onChange={(e) =>
                                                handleChange(e, index)
                                            }
                                            ref={
                                                activeField === index
                                                    ? inputRef
                                                    : null
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, index)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-dark px-5"
                                    disabled={formState}
                                >
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
