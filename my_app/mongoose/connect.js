const mongoose = require("mongoose")

const connect = () => {
    mongoose.connect("mongodb+srv://root:root@cluster0.tkj9ubo.mongodb.net/patients", {
    }).then(() => {
        console.log("Connected to DB")
        console.log("*********************************")
    }).catch((e) => {
        console.error("Could not connect to DB" + e)
    })
}

module.exports = connect;