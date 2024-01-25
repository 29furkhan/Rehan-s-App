const mongoose = require("mongoose")

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/patients", {
    }).then(() => {
        console.log("Connected to DB")
        console.log("*********************************")
    }).catch((e) => {
        console.error("Could not connect to DB" + e)
    })
}

module.exports = connect;