const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    license: { type: String, required: true, unique: true },
    licensePdf: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    profilePicture: { type: String, required: true }
});

const CustomerModel = mongoose.model("customer", CustomerSchema);
module.exports = CustomerModel;
