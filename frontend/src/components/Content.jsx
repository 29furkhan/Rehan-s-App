const Content = () => {
    return(
    <>
        <main className="container mt-4">
            <div className="row">
                {/* <!-- This is left card --> */}
                <div className="col-md-5 mb-4">
                    {/* <!-- This is a form --> */}
                    <div className="card-app card text-center">
                        <div className="card-body">
                            <h4 className="card-title">Patient Information Form</h4>
                            <hr />
                            <form>
                                <div className="form-container-app">
                                    <div className="mb-3">
                                        <h6 className="form-label">
                                            Name of Patient
                                            <span className="text-danger">*</span>
                                        </h6>
                                        <input type="text" className="form-app form-control" id="name"
                                        placeholder="Enter the name of patient" required />
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">Age
                                        <span className="text-danger">*</span>
                                    </h6>
                                    <input type="number" className="form-app form-control" id="age"
                                        placeholder="Enter the age of patient" required />
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">Current Health Concern <span
                                            className="text-danger">*</span></h6>
                                    <input type="text" className="form-app form-control" id="healthConcern"
                                        placeholder="Enter the current concerns" required />
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">Present Illness Chronology <span
                                            className="text-danger">*</span></h6>
                                    <textarea className="form-app form-app form-control" id="illnessChronology"
                                        placeholder="Enter the history of illness" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">Other Illness Chronology <span
                                            className="text-danger">*</span></h6>
                                    <textarea className="form-app form-control" id="otherIllness"
                                        placeholder="Enter the history of other disease" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">Surgical History <span
                                            className="text-danger">*</span></h6>
                                    <textarea className="form-app form-control" id="surgicalHistory"
                                        placeholder="Enter the history of Surgical History" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">General Examination <span
                                            className="text-danger">*</span></h6>
                                    <textarea className="form-app form-control" id="generalExamination"
                                        placeholder="Enter the comments of examination" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">Systematic Examination <span
                                            className="text-danger">*</span></h6>
                                    <textarea className="form-app form-control" id="systematicExamination"
                                        placeholder="Enter the comments of systematic examination" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">Special Examination <span
                                            className="text-danger">*</span></h6>
                                    <textarea className="form-app form-control" id="specialExamination"
                                        placeholder="Enter the comments of special examination" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">Possible Diagnosis <span
                                            className="text-danger">*</span></h6>
                                    <textarea className="form-app form-control" id="possibleDiagnosis"
                                        placeholder="Enter the comments of diagnosis" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <h6 className="form-label">Treatment
                                        <span className="text-danger">*</span>
                                    </h6>
                                    <textarea className="form-app form-control" id="treatment"
                                        placeholder="Enter the comments of treatment" required></textarea>
                                </div>
                            </div>
                            <hr />
                            <button type="submit" className="btn btn-app">Insert</button>
                        </form>
                    </div>
                </div>
                </div>
            {/* <!-- This is right card --> */}
            <div className="col-md-7 mb-4">
                <div className="card-app card text-center">
                    <div className="card-body">
                        <h4 className="card-title">Patient Records</h4>
                        <hr />
                        {/* <!-- Search bar and buttons --> */}
                        <div className="d-flex mb-3">
                            <input type="text" className="form-app form-control" placeholder="Enter patient's name" />
                            <button className="btn btn-primary ms-2">SEARCH</button>
                            <button className="btn btn-success ms-2">EXCEL</button>
                            <button className="btn btn-danger ms-2">PDF</button>
                        </div>
                        <hr />
                        {/* <!-- THis is a responsive table --> */}
                        <div className="table-responsive">
                            <table>
                                <thead className="sticky-head">
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Current Health Concern</th>
                                        <th>Present Illness Chronology</th>
                                        <th>Other Illness Chronology</th>
                                        <th>Surgical History</th>
                                        <th>General Examination</th>
                                        <th>Systematic Examination</th>
                                        <th>Special Examination</th>
                                        <th>Possible Diagnosis</th>
                                        <th>Treatment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <!-- Add table rows with data dynamically --> */}
                                    {// for loop
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    }
                                    {/* <!-- Add more rows as needed --> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </main>
    </>
    )
}

export default Content;