/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props {
    name: string;
    label: string;
    register: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    error?: FieldError;
    [x: string]: any;
}

const TextInputField = ({
    name,
    label,
    register,
    registerOptions,
    error,
    ...props
}: Props) => {
    return (
        <div className="mb-3">
            <label htmlFor={name}>{label}</label>
            <input
                className={`form-control ${error && 'is-invalid'}`}
                id={name}
                {...register(name, registerOptions)}
                {...props}
            />
            {error && <div className="invalid-feedback">{error.message}</div>}
        </div>
    );
};

export default TextInputField;
