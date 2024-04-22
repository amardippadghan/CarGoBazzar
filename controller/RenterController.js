const Renter = require("../models/RenterModel");
const bcrypt = require('bcryptjs');
const response = require("../utils/response");

const addRenter = async (req, res) => {
    try {
        // Check if email already exists
        const existingRenter = await Renter.findOne({ email: req.body.email });
        if (existingRenter) {
            return res.status(400).json(response(null, "Email already exists", "Email already exists"));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new renter
        const newRenter = await Renter.create({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            password: hashedPassword,
            lisense: req.body.lisense,
            lisensePdf: req.body.lisensePdf,
            aadharNumber: req.body.aadharNumber,
            rc: req.body.rc,
            rcPdf: req.body.rcPdf,
            isVerified: req.body.isVerified,
            poc: req.body.poc,
            pocImage: req.body.pocImage,
            insurence: req.body.insurence,
            insurenceImage: req.body.insurenceImage,
            carModel: req.body.carModel,
            carNumber: req.body.carNumber,
            carImage: req.body.carImage,
            carName: req.body.carName,
            carType: req.body.carType,
            profilePicture: req.body.profilePicture
        });

        res.status(201).json(response(newRenter, "Renter has been created", null));
    } catch (error) {
        res.status(500).json(response(null, "Error", error.message));
    }
}

const loginRenter = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the renter exists
        const renter = await Renter.findOne({ email });

        if (!renter) {
            return res.status(404).json(response(null, 'Renter not found', 'Renter not found'));
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, renter.password);

        if (!isPasswordValid) {
            return res.status(401).json(response(null, 'Invalid password', 'Invalid password'));
        }

        res.status(200).json(response(renter, 'Login successful', null));
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const updateRenter = async (req, res) => {
    try {
        const renterId = req.params.id;
        const updatedData = req.body;

        // Check if renter exists
        const existingRenter = await Renter.findById(renterId);
        if (!existingRenter) {
            return res.status(404).json(response(null, 'Renter not found', 'Renter not found'));
        }

        // Update renter data
        await Renter.findByIdAndUpdate(renterId, updatedData);

        // Fetch updated renter data
        const updatedRenter = await Renter.findById(renterId);

        res.status(200).json(response(updatedRenter, 'Renter updated successfully', null));
    } catch (error) {
        console.error('Update renter error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const deleteRenter = async (req, res) => {
    try {
        const renterId = req.params.id;

        // Check if renter exists
        const existingRenter = await Renter.findById(renterId);
        if (!existingRenter) {
            return res.status(404).json(response(null, 'Renter not found', 'Renter not found'));
        }

        // Delete renter
        await Renter.findByIdAndDelete(renterId);

        res.status(200).json(response(null, 'Renter deleted successfully', null));
    } catch (error) {
        console.error('Delete renter error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const getAllRenters = async (req, res) => {
    try {
        const renters = await Renter.find();
        res.status(200).json(response(renters, 'Renters fetched successfully', null));
    } catch (error) {
        console.error('Get all renters error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const getRenterById = async (req, res) => {
    try {
        const renterId = req.params.id;
        const renter = await Renter.findById(renterId);
        res.status(200).json(response(renter, 'Renter fetched successfully', null));
    } catch (error) {
        console.error('Get renter by id error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

module.exports = { addRenter, loginRenter, updateRenter, deleteRenter, getAllRenters ,getRenterById};
