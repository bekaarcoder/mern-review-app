import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
    show: boolean;
    handleClose: () => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    progress: string | undefined;
    setProgress: Dispatch<SetStateAction<string | undefined>>;
    progressType: string;
    setProgressType: Dispatch<SetStateAction<string>>;
    pages: number;
    markFinished: () => void;
}

const UpdateProgressModal = ({
    show,
    handleClose,
    handleSubmit,
    progress,
    setProgress,
    progressType,
    setProgressType,
    pages,
    markFinished,
}: Props) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>Update Progress</Modal.Header>
            <Modal.Body>
                <form
                    className="row row-cols-lg-auto g-3 align-items-center justify-content-center"
                    onSubmit={handleSubmit}
                >
                    <div className="col-12">
                        <label className="visually-hidden">Progress</label>
                        <div className="input-group">
                            <div className="input-group-text">
                                {progressType === 'percentage' ? '%' : '#'}
                            </div>
                            <input
                                type="number"
                                className="form-control"
                                name="progress"
                                value={progress}
                                onChange={(e) => setProgress(e.target.value)}
                            />
                            {progressType === 'pages' && (
                                <div className="input-group-text">
                                    of {pages}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-12">
                        <label className="visually-hidden">Progress Type</label>
                        <select
                            className="form-select"
                            name="progressType"
                            value={progressType}
                            onChange={(e) => setProgressType(e.target.value)}
                        >
                            <option value="percentage">%</option>
                            <option value="pages">Pages</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={!progress}
                        >
                            Save
                        </button>
                    </div>
                </form>
                <div className="d-flex justify-content-end mt-4">
                    <button
                        onClick={markFinished}
                        className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                    >
                        <i className="bi bi-check-circle"></i> Mark As Finished
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateProgressModal;
