const mongoose = require('mongoose');


const RenterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
       age : {
        type : String,
        requireed : true
    },
    gender : {
        type : String,

    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    license : {
        type : String,
        required : true
    },

    licensePdf :{
        type : String,
        required : true
    },
    aadharNumber : {type: String, required: true},
    rc : {type: String, required: true},
    rcPdf : {type: String, required: true}
    ,
    isVerified : {type: Boolean, default: false},
    poc : {type: String, required: true},
    pocImage : {type: String, required: true}
    ,
    insurence : {type: String, required: true},
    insurenceImage : {type: String, required: true},
    carModel : {type: String, required: true},
    carNumber : {type: String, required: true},
    carImage : {type: String, required: true},
    carName : {type: String, required: true},
    carType : {type: String, required: true},
    profilePicture : {type: String, required: true}

})

const Renter = mongoose.model('renter', RenterSchema);
module.exports = Renter;

