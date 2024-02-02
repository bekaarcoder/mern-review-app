/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FieldError,
    Merge,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';

interface Props {
    name: string;
    label: string;
    register: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
    [x: string]: any;
    options: string[];
}

const SelectField = ({
    name,
    label,
    register,
    registerOptions,
    error,
    options,
    ...props
}: Props) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                id={name}
                className={`form-select ${error ? 'is-invalid' : ''}`}
                {...register(name, registerOptions)}
                {...props}
            >
                <option value="">Select {label}</option>
                {options.map((val) => (
                    <option value={val} key={val}>
                        {val}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error.message}</div>}
        </div>
    );
};

export default SelectField;
