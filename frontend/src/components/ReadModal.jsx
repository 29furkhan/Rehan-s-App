const ReadModal = ({ modal_id, patient }) => {
    return (
        <>
            <div className="modal modal-app modal-lg" id={modal_id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="text-center modal-header modal-header-bg">
                            <h5 className="mx-auto modal-title">{patient.name}'s information</h5>
                        </div>

                        <div className="modal-body modal-body-bg">
                            <img
                                className="photo-app mx-auto d-block"
                                src="/images/passport_photo.png"
                                alt="This basically shows image of the patient"
                            />
                            <hr />
                            {/* skip cols are filtered */}
                            {Object.keys(patient).filter(column => !(column in { "_id": 0, "user": 0 })).map(column => (
                                <div key={column} className="row">
                                    <div className="col-md-4">
                                        <div key={column} className="mb-2 text-wrap">
                                            <strong>{column}</strong>
                                        </div>
                                    </div>

                                    <div className="col-md-8">
                                        <div key={column} className="mb-2 text-wrap">
                                            {patient[column]}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="modal-footer modal-footer-bg">
                        <button
                            data-bs-dismiss="modal"
                            type="button"
                            className="btn btn-app"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReadModal;