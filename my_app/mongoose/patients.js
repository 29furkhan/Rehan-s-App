const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
  aadhar: {
    type: String,
    required: true,
    minLength: 12,
    maxLength: 12,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
    min: 1,
    max: 150
  },
  present_complain: {
    type: String,
    required: true,
    maxLength: 300
  },
  history_of_present_complain: {
    type: String,
    required: true,
    maxLength: 300
  },
  history_of_other_disease: {
    type: String,
    required: true,
    maxLength: 300
  },
  surgical_history: {
    type: String,
    required: true,
    maxLength: 300
  },
  general_examination: {
    type: String,
    required: true,
    maxLength: 300
  },
  systematic_examination: {
    type: String,
    required: true,
    maxLength: 300
  },
  special_examination: {
    type: String,
    required: true,
    maxLength: 300
  },
  possible_diagnosis: {
    type: String,
    required: true,
    maxLength: 300
  },
  treatment: {
    type: String,
    required: true,
    maxLength: 300
  },
  user: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String
  }
});

const Model = mongoose.model('patients', PatientSchema);

module.exports = Model;