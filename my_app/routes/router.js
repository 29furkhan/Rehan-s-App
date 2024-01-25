const express = require('express')
const router = express.Router()
const Model = require('../mongoose/patients')
const patients_data = require('../patients_fields.json')
const xlsx = require('xlsx')

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

    try {
        const workbook = xlsx.utils.book_new();
        console.log(payload)
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

module.exports = router;