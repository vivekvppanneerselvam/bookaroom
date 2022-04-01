const mongoose = require('./init')
const Schema = mongoose.Schema


const locationSchema = new Schema({
    locId: { type: String, index: true, required: true },
    locName: { type: String, required: true },
    suite: { type: String, required: true }
    
})
  
const Location = (module.exports = mongoose.model('locations', locationSchema))