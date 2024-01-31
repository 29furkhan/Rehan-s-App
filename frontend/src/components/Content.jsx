import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import ActionButton from "./ActionButton";
import * as XLSX from 'xlsx';

const Content = ({ core_url }) => {
    const [payload, setPayload] = useState([])
    const [columns, setColumns] = useState({})
    const [searchString, setSearchString] = useState("")
    const [newPatient, setNewPatient] = useState({})
    const fileInputRef = useRef(null);

    const [errors, setErrors] = useState({
        aadhar: "",
        name: "",
        age: "",
        present_complain: "",
        history_of_present_complain: "",
        history_of_other_disease: "",
        surgical_history: "",
        general_examination: "",
        systematic_examination: "",
        special_examination: "",
        possible_diagnosis: "",
        treatment: "",
        user: ""
    })

    const handleFileClick = () => {
        fileInputRef.current.click()
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Assuming there's only one sheet in the Excel file
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert sheet to JavaScript OBJ
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                // Now you can use the jsonData in your component state or do other operations
                let jsonValidData = []
                jsonData.forEach(patient => {
                    if ("aadhar" in patient) {
                        jsonValidData = [...jsonValidData, patient]
                    }
                    else {
                        window.alert("aadhar column is missing, not a valid file.")
                    }
                })

                try {
                    const res = await axios.put(core_url + "/api/update", jsonValidData);
                    window.alert(res.data.message)
                    if (res.data.status === "OK")
                        window.location.reload()
                }
                catch (e) {
                    console.log(e.message)
                }

            };

            reader.readAsArrayBuffer(file);
        }
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;

        setNewPatient({
            ...newPatient,
            [name]: value
        })
    }
    const createNewPatient = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(core_url + "/api/create_new_patient", newPatient);
            console.log(res.data.errors)
            if (res.data.errors) {
                const errors_2 = res.data.errors
                setErrors({
                    ...errors,
                    ...errors_2
                })
                const formContainer = document.getElementById("formDiv")
                formContainer.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            else {
                window.alert(res.data.message)
                window.location.reload()
            }
        }
        catch (e) {
            console.log(core_url + "/api/create_new_patient")
            window.alert(e.message)
        }
    }

    const fetchData = async () => {
        const response = await axios.get(core_url + '/api/get')
        setPayload(response.data.payload)
        setColumns(response.data.patients_columns)
    }

    const onSearchStringChange = (e) => {
        const { value } = e.target
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
                                <form
                                    onSubmit={createNewPatient}
                                    id="form"
                                >
                                    <div className="form-container-app" id="formDiv">
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.aadhar}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <input onChange={onInputChange} name="aadhar" type="text" className="form-app form-control" id="aadhar"
                                                placeholder="Enter aadhar no. of patient" required />
                                            {errors.aadhar.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.aadhar}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.name}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <input onChange={onInputChange} name="name" type="text" className="form-app form-control" id="name"
                                                placeholder="Enter the name of patient" required />
                                            {errors.name.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.name}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.age}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <input onChange={onInputChange} name="age" type="number" className="form-app form-control" id="age"
                                                placeholder="Enter the age of patient" required />
                                            {errors.age.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.age}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.present_complain}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <input onChange={onInputChange} name="present_complain" type="text" className="form-app form-control" id="healthConcern"
                                                placeholder="Enter the current concerns" required />
                                            {errors.present_complain.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.present_complain}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.history_of_present_complain}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea onChange={onInputChange} name="history_of_present_complain" className="form-app form-app form-control" id="illnessChronology"
                                                placeholder="Enter the history of illness" required></textarea>
                                            {errors.history_of_present_complain.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.history_of_present_complain}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.history_of_other_disease}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea onChange={onInputChange} name="history_of_other_disease" className="form-app form-control" id="otherIllness"
                                                placeholder="Enter the history of other disease" required></textarea>
                                            {errors.history_of_other_disease.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.history_of_other_disease}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.surgical_history}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea onChange={onInputChange} name="surgical_history" className="form-app form-control" id="surgicalHistory"
                                                placeholder="Enter the history of Surgical History" required></textarea>
                                            {errors.surgical_history.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.surgical_history}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.general_examination}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea onChange={onInputChange} name="general_examination" className="form-app form-control" id="generalExamination"
                                                placeholder="Enter the comments of examination" required></textarea>
                                            {errors.general_examination.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.general_examination}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.systematic_examination}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea onChange={onInputChange} name="systematic_examination" className="form-app form-control" id="systematicExamination"
                                                placeholder="Enter the comments of systematic examination" required></textarea>
                                            {errors.systematic_examination.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.systematic_examination}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.special_examination}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea onChange={onInputChange} name="special_examination" className="form-app form-control" id="specialExamination"
                                                placeholder="Enter the comments of special examination" required></textarea>
                                            {errors.special_examination.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.special_examination}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.possible_diagnosis}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea onChange={onInputChange} name="possible_diagnosis" className="form-app form-control" id="possibleDiagnosis"
                                                placeholder="Enter the comments of diagnosis" required></textarea>
                                            {errors.possible_diagnosis.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.possible_diagnosis}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.treatment}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <textarea onChange={onInputChange} name="treatment" className="form-app form-control" id="treatment"
                                                placeholder="Enter the comments of treatment" required></textarea>
                                            {errors.treatment.trim().length > 0 ? < span className="text-start alert-warning-app" role="alert">
                                                {errors.treatment}
                                            </span> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <h6 className="form-label">
                                                {columns.photo}
                                                <span className="text-danger">*</span>
                                            </h6>
                                            <input
                                                name="photo"
                                                type="file"
                                                className="form-app form-control"
                                                id="image"
                                                accept="image/*"
                                                onChange={onInputChange}
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
                                    <button
                                        onClick={filterData}
                                        className="btn btn-primary ms-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Search by patient's name or aadhar"
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                    <button
                                        onClick={downloadData}
                                        className="btn btn-success ms-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Download the excel report"
                                    >
                                        <i className="fa-solid fa-download"></i>
                                    </button>
                                    {/* Upload button */}
                                    <button
                                        onClick={handleFileClick}
                                        className="btn btn-danger ms-2"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Upload the input excel file"
                                    >
                                        <i className="fa-solid fa-upload"></i>
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <hr />
                                {/* <!-- THis is a responsive table --> */}
                                {payload.length === 0 ? <p>No Data</p> :
                                    <div className="table-responsive">
                                        <table>
                                            <thead className="sticky-head">
                                                <tr>
                                                    <th>Action</th>
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
                                                            <td>
                                                                <ActionButton
                                                                    core_url={core_url}
                                                                    patient={patient}
                                                                    primary_key={patient.aadhar}
                                                                />
                                                            </td>
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
                </div >
            </main >
        </>
    )
}

export default Content;