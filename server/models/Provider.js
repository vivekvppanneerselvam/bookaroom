const mongoose = require('./init')


const providerSchema = new mongoose.Schema({    
    provId: String,
    provName: String,
    provType: String,
    specialty: String,
    specialtyDepC:String
})

const Provider = (module.exports = mongoose.model('providerlookup', providerSchema))



module.exports.getProviderByIID = function(callback){
    var query = { 'specialtyDepC': id }
    Provider.find(query, callback);
}

module.exports.getProviders = function(callback){
    Provider.find(callback);
}



