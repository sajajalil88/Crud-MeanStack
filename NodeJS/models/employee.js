const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    salary: { type: Number }
});

module.exports = { Employee };