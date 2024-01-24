const mongoose = require("mongoose")

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/patients", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to DB")
    }).catch((e) => {
        console.error("Could not connect to DB" + e)
    })
}

module.exports = connect;