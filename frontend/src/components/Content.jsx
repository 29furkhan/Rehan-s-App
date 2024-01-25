import { useState, useEffect } from "react";
import axios from 'axios';

const Content = ({ core_url }) => {
    const [payload, setPayload] = useState([])
    const [columns, setColumns] = useState({})
    const [searchString, setSearchString] = useState("")

    const fetchData = async () => {
        const response = await axios.get(core_url + '/api/get')
        setPayload(response.data.payload)
        setColumns(response.data.patients_columns)
    }

    const onSearchStringChange = (e) => {
        const { name, value } = e.target
        // console.log(value)
        setSearchString(value)
    }

    const filterData = async () => {
        const query_params = {
            searchString: searchString
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        const res = await axios.get(core_url + "/api/get/filter", { headers, params: query_params })
        const data = res.data

        setPayload(data.payload)
    }

    const downloadData = async () => {
        try {
            const response = await axios.post(core_url + "/api/download", { payload }, {
                responseType: 'arraybuffer',
            });

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'patients_list.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        catch (error) {
            console.error('Error downloading Excel file:', error.response);
        }
    }

    // fetch initial data
    useEffect(() => {
        fetchData()
    }, [])

    return (
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
                                                {columns.name}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <input type="text" className="form-app form-control" id="name"
                                                placeholder="Enter the name of patient" required />
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.age}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <input type="number" className="form-app form-control" id="age"
                                                placeholder="Enter the age of patient" required />
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.present_complain}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <input type="text" className="form-app form-control" id="healthConcern"
                                                placeholder="Enter the current concerns" required />
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.history_of_present_complain}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea className="form-app form-app form-control" id="illnessChronology"
                                                placeholder="Enter the history of illness" required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.history_of_other_disease}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea className="form-app form-control" id="otherIllness"
                                                placeholder="Enter the history of other disease" required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.surgical_history}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea className="form-app form-control" id="surgicalHistory"
                                                placeholder="Enter the history of Surgical History" required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.general_examination}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea className="form-app form-control" id="generalExamination"
                                                placeholder="Enter the comments of examination" required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.systematic_examination}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea className="form-app form-control" id="systematicExamination"
                                                placeholder="Enter the comments of systematic examination" required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.special_examination}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea className="form-app form-control" id="specialExamination"
                                                placeholder="Enter the comments of special examination" required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.possible_diagnosis}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea className="form-app form-control" id="possibleDiagnosis"
                                                placeholder="Enter the comments of diagnosis" required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.treatment}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea className="form-app form-control" id="treatment"
                                                placeholder="Enter the comments of treatment" required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.photo}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <input
                                                type="file"
                                                className="form-app form-control"
                                                id="image"
                                                accept="image/*"
                                                required
                                            />
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
                                    <input
                                        type="text"
                                        className="form-app form-control"
                                        placeholder="Enter patient's name"
                                        name="searchBar"
                                        value={searchString}
                                        onChange={onSearchStringChange}
                                    />
                                    <button onClick={filterData} className="btn btn-primary ms-2">SEARCH</button>
                                    <button onClick={downloadData} className="btn btn-success ms-2">EXCEL</button>
                                    <button className="btn btn-danger ms-2">PDF</button>
                                </div>
                                <hr />
                                {/* <!-- THis is a responsive table --> */}
                                {payload.length === 0 ? <p>No Data</p> :
                                    <div className="table-responsive">
                                        <table>
                                            <thead className="sticky-head">
                                                <tr>
                                                    <th>{columns.photo}</th>
                                                    <th>{columns.aadhar}</th>
                                                    <th>{columns.name}</th>
                                                    <th>{columns.age}</th>
                                                    <th>{columns.present_complain}</th>
                                                    <th>{columns.history_of_present_complain}</th>
                                                    <th>{columns.history_of_other_disease}</th>
                                                    <th>{columns.surgical_history}</th>
                                                    <th>{columns.general_examination}</th>
                                                    <th>{columns.systematic_examination}</th>
                                                    <th>{columns.special_examination}</th>
                                                    <th>{columns.possible_diagnosis}</th>
                                                    <th>{columns.treatment}</th>
                                                    <th>{columns.user}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Add table rows with data dynamically */}
                                                {payload.map((patient, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{patient.photo}</td>
                                                            <td>{patient.aadhar}</td>
                                                            <td>{patient.name}</td>
                                                            <td>{patient.age}</td>
                                                            <td>{patient.present_complain}</td>
                                                            <td>{patient.history_of_present_complain}</td>
                                                            <td>{patient.history_of_other_disease}</td>
                                                            <td>{patient.surgical_history}</td>
                                                            <td>{patient.general_examination}</td>
                                                            <td>{patient.systematic_examination}</td>
                                                            <td>{patient.special_examination}</td>
                                                            <td>{patient.possible_diagnosis}</td>
                                                            <td>{patient.treatment}</td>
                                                            <td>{patient.user}</td>

                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Content;