import ManageAuthorForm from '../../components/ManageAuthorForm';

const AddAuthor = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-12 col-xl-8">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Add Author</h3>
                        <ManageAuthorForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAuthor;
