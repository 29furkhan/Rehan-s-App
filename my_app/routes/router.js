const express = require('express')
const router = express.Router()
const Model = require('../mongoose/patients')

// Home route
router.get('/', async (req, res) => {
    const data = await Model.find()
    res.render('index', {title: 'वैद्य. रेहान शेख', payload: data});
});

router.get('/api/get', async (req, res) => {
    const data = await Model.find()
    res.render('index', {
        title: 'वैद्य. रेहान शेख',
        status: "ok",
        payload: data
    })
})

module.exports = router;