const mongoose = require('./init')
const Schema = mongoose.Schema

const instituteSchema = new mongoose.Schema({
    instituteGroupName: { type: String, required: true },
    specialty: { type: String, required: true },
    specialtyDepC: { type: String, required: true, index: true },
})

const Institute = (module.exports = mongoose.model('institutegroups', instituteSchema))


module.exports.getAllInstitute = function (callback) {
    Institute.find(callback)
}