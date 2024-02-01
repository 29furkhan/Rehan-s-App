const express = require('express')
const router = express.Router()
const Model = require('../mongoose/patients')
const patients_data = require('../patients_fields.json')
const validate = require('../validate.js')
const xlsx = require('xlsx')

// Testing route
router.get("/", async (req, res) => {
    res.status(200).json({
        message: "Connected to backend"
    })    
})

// Home route
router.get('/api/get', async (req, res) => {
    const data = await Model.find()
    const patients_columns = patients_data

    res.status(200).json({
        status: "ok",
        patients_columns,
        payload: data,
        length: data.length
    })
})

// This route is used to filter the data
// Based upon aadhar no. and name
router.get("/api/get/filter", async (req, res) => {
    let { searchString } = req.query

    searchString = searchString.toLowerCase()
    let data = await Model.find()

    try {
        if (searchString.trim().length > 0) {
            data = data.filter((patient) => {
                return (
                    patient.aadhar.toLowerCase().includes(searchString)
                    ||
                    patient.name.toLowerCase().includes(searchString)
                )
            })
        }

        res.status(200).json({
            status: "ok",
            payload: data,
            length: data.length
        })
    }
    catch (e) {
        res.status(400).json({
            status: "Bad request",
            message: e.message,
        })
    }
})

router.post('/api/download', async (req, res) => {
    let { payload } = req.body;

    payload.forEach(patient => {
        delete patient["_id"]
        delete patient["user"]
    })

    try {
        const workbook = xlsx.utils.book_new();
        const sheet = xlsx.utils.json_to_sheet(payload);

        xlsx.utils.book_append_sheet(workbook, sheet, 'Patients Information');
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        res.setHeader('Content-Disposition', 'attachment; filename=patients_list.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelBuffer);
    }
    catch (e) {
        console.error('Error creating Excel file:', e);
        res.status(500).end();
    }
})

router.post('/api/create_new_patient', async (req, res) => {
    const patientData = req.body;
    try {
        const errors = validate(patientData)
        console.log(errors)
        if (errors.flag) {
            res.status(200).json({
                errors
            })
        }
        else {
            const patients = await Model.find({ aadhar: patientData.aadhar })
            if (patients.length === 0) {
                let newPatient = new Model(patientData);

                await newPatient.save();
                res.status(201).json({
                    status: "OK",
                    message: "Data added successfully!"
                })
            }
            else {
                res.status(201).json({
                    status: "OK",
                    message: `Aadhar ${patientData.aadhar} is already present with name ${patients[0].name}`
                })
            }
        }
    }
    catch (e) {
        res.status(400).json({
            status: "Bad request",
            message: e.message,
        })
    }
})

router.delete("/api/delete", async (req, res) => {
    const aadhar = req.query.aadhar;

    try {
        const result = await Model.findOneAndDelete({
            aadhar
        })

        res.status(200).json({
            status: "OK",
            message: "Data deleted successfully!",
        })
    }
    catch (e) {
        res.status(400).json({
            status: "Bad request",
            message: e.message,
        })
    }
})

router.put('/api/update', async (req, res) => {
    const uploaded_patient_file = req.body; // always have aadhar
    const total_patients = await Model.find()
    let stat = 0
    let status_code = ""
    let message = ""
    let matching_cnt = 0;

    try {
        for (patient of uploaded_patient_file) {
            let foundPatient = total_patients.find(input => {
                return (input.aadhar === patient.aadhar)
            })
            if (foundPatient) {
                matching_cnt += 1;
            }
        }

        console.log(matching_cnt, uploaded_patient_file.length)
        if (matching_cnt !== uploaded_patient_file.length) {
            status_code = 200
            message = "Some aadhar values are invalid, please check and re-upload."
            stat = "Bad Request"
        }
        else {
            status_code = 201
            message = "Data updated successfully."
            stat = "OK"

            for (patient of uploaded_patient_file) {
                await Model.findOneAndUpdate({
                    aadhar: patient.aadhar
                }, {
                    $set: { ...patient }
                })
            }
        }

        res.status(status_code).json({
            status: stat,
            message
        })
    }
    catch (e) {
        res.status(400).json({
            status: "Bad Request",
            message: e.message
        })
    }
})

module.exports = router;
