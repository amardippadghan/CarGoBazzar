const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    // renter Schema
    renterId : {
        type : String,
        required : true
    },
    age : {
        type : String,
        requireed : true
    },
    gender : {
        type : String,

    },
    name: {
        type: String,
        required: true
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
    lisense : {
        type : String,
        required : true
    },

    lisensePdf :{
        type : String,
        required : true
    },
 
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
    profilePicture : {type: String, required: true} ,

// customer Schema 
name: { type: String, required: true, default: "" },
email: { type: String, required: true, default: "" },
password: { type: String, required: true, default: "" },
phone: { type: String, required: true, default: "" },
address: { type: String, required: true, default: "" },
license: { type: String, required: true, default: "" },
licensePdf: { type: String, required: true, default: "" },
age: { type: String, required: true, default: "" },
gender: { type: String, required: true, default: "" },
isVerified: { type: Boolean, default: false },
profilePicture: { type: String, default: "" },



    // status cheak 
    ispickup : {type: Boolean, default: false},
    isdrop : {type: Boolean, default: false},
    pickupOtp : {type: String, default: null},
    dropOtp : {type: String, default: null},
    status : {type: String, default: "pending"}
    ,
    startDate : {type: String, default: null},
    endDate : {type: String, default: null},
    pickupAddress : {type: String, default: null},
    price : {type: String , default: null}




})


const CarRentPostModel = mongoose.model("carrentpost", postSchema)
module.exports = CarRentPostModel