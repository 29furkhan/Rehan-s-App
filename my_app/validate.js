const validate = (data) => {
    const errors = {
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
        user: "",
        flag: false
    };

    // Validate Aadhar
    if (data.aadhar.length !== 12) {
        errors.aadhar = 'Aadhar number must be 12 characters long.';
        errors.flag = true;
    }

    // Validate Name
    if (!/^[A-Za-z\s]+$/g.test(data.name)) {
        errors.name = 'Please enter a valid name';
        errors.flag = true;
    }

    // Validate Age
    if (isNaN(data.age) || data.age <= 0 || data.age > 150) {
        errors.age = 'Please provide a valid age between 1 and 150.';
        errors.flag = true;
    }

    // Validate Present Complain
    if (data.present_complain.length >= 300) {
        errors.present_complain = 'This field should be less than 300 characters.';
        errors.flag = true;
    }

    // Validate History of Present Complain
    if (data.history_of_present_complain.length >= 300) {
        errors.history_of_present_complain = 'This field should be less than 300 characters.';
        errors.flag = true;
    }

    // Validate History of Other Disease
    if (data.history_of_other_disease.length >= 300) {
        errors.history_of_other_disease = 'This field should be less than 300 characters.';
        errors.flag = true;
    }

    // Validate Surgical History
    if (data.surgical_history.length >= 300) {
        errors.surgical_history = 'This field should be less than 300 characters.';
        errors.flag = true;
    }

    // Validate General Examination
    if (data.general_examination.length >= 300) {
        errors.general_examination = 'This field should be less than 300 characters.';
        errors.flag = true;
    }

    // Validate Systematic Examination
    if (data.systematic_examination.length >= 300) {
        errors.systematic_examination = 'This field should be less than 300 characters.';
        errors.flag = true;
    }

    // Validate Special Examination
    if (data.special_examination.length >= 300) {
        errors.special_examination = 'This field should be less than 300 characters.';
        errors.flag = true;
    }

    // Validate Possible Diagnosis
    if (data.possible_diagnosis.length >= 300) {
        errors.possible_diagnosis = 'This field should be less than 300 characters.';
        errors.flag = true;
    }

    // Validate Treatment
    if (data.treatment.length >= 300) {
        errors.treatment = 'This field should be less than 300 characters.';
        errors.flag = true;
    }

    return errors;
};

module.exports = validate;