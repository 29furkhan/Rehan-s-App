const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
    aadhar: {
        type: String,
        min: 12,
        max: 12,
        default: 123456789012
        // Should not allow non-integers
    },
    age: {
        type: Number,
        min: 1,
        max: 150,
        default: 1
    },
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
        default: "Anonymous"
        // General Regex for Name
    },
    current_concern: {
        type: String,
        minLength: 1,
        maxLength: 300,
        defualt: "NA"
        // General Regex for address textarea
    },
    current_concern_history: {
        type: String,
        minLength: 1,
        maxLength: 300,
        defualt: "NA"
        // General Regex for address textarea
    },
    other_illness_history: {
        type: String,
        minLength: 1,
        maxLength: 300,
        defualt: "NA"
        // General Regex for address textarea
    },
    surgical_history: {
        type: String,
        minLength: 1,
        maxLength: 300,
        defualt: "NA"
        // General Regex for address textarea
    },
    general_examination: {
        type: String,
        minLength: 1,
        maxLength: 300,
        defualt: "NA"
        // General Regex for address textarea
    },
    systematic_examination: {
        type: String,
        minLength: 1,
        maxLength: 300,
        defualt: "NA"
        // General Regex for address textarea
    },
    special_examination: {
        type: String,
        minLength: 1,
        maxLength: 300,
        defualt: "NA"
        // General Regex for address textarea
    },
    possible_diagnosis: {
        type: String,
        minLength: 1,
        maxLength: 300,
        defualt: "NA"
        // General Regex for address textarea
    },
    treatment: {
        type: String,
        minLength: 1,
        maxLength: 300,
        defualt: "NA"
        // General Regex for address textarea
    },
    user: {
        type: String,
        default: "admin",
        // Used to identify who made the changes.
    }
}, {
    timestamps: true
})

const Model = mongoose.model('patients', PatientSchema);

module.exports = Model;