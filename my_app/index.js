const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
const app = express()
const path = require('path');
const connect = require('./mongoose/connect')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(cors())
app.use("/patients", router)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.listen(8080, () => {
    console.log("\n\n*********************************")
    console.log("Connected to backend.")
})

connect()