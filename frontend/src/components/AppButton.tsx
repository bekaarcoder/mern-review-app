interface Props {
    label: string;
    disabled: boolean;
    loading?: boolean;
}

const AppButton = ({ label, disabled, loading }: Props) => {
    return (
        <button
            className="btn btn-dark"
            type="submit"
            disabled={disabled || loading}
        >
            {disabled ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                    ></span>
                    <span role="status" className="ms-1">
                        Saving...
                    </span>
                </>
            ) : loading ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                    ></span>
                    <span role="status" className="ms-1">
                        {label}
                    </span>
                </>
            ) : (
                <>{label}</>
            )}
        </button>
    );
};

export default AppButton;
