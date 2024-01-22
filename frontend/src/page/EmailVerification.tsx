import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

const EmailVerification = () => {
    const [verificationCode, setVerificationCode] = useState<string[]>(
        new Array(6).fill('')
    );
    const [activeField, setActiveField] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const focusPreviousInputField = (index: number) => {
        const diff = index - 1;
        const nextIndex = diff !== 0 ? diff : 0;
        setActiveField(nextIndex);
    };

    const focusNextInputField = (index: number) => {
        setActiveField(index < 5 ? index + 1 : index);
    };

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

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeField]);

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
                        <form>
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
                                <button className="btn btn-dark px-5">
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
