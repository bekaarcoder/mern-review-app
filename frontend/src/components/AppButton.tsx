interface Props {
    label: string;
    disabled: boolean;
}

const AppButton = ({ label, disabled }: Props) => {
    return (
        <button className="btn btn-dark" type="submit" disabled={disabled}>
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
            ) : (
                <>{label}</>
            )}
        </button>
    );
};

export default AppButton;
