const CustomerModel = require("../models/CustomerModel");
const bcrypt = require('bcryptjs');
const response = require("../utils/response");


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await CustomerModel.findOne({ email });

        if (!user) {
            return res.status(404).json(response(null, 'User not found', 'User not found'));
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json(response(null, 'Invalid password', 'Invalid password'));
        }

        res.status(200).json(response(user, 'Login successful', null));
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const updateCustomer = async (req, res) => {
     try {
        const customerId = req.params.id;
        const updatedData = req.body;

        // Check if customer exists
        const existingCustomer = await CustomerModel.findById(customerId);
        if (!existingCustomer) {
            return res.status(404).json(response(null, 'Customer not found', 'Customer not found'));
        }

        // Update customer data
        await CustomerModel.findByIdAndUpdate(customerId, updatedData);

        // Fetch updated customer data
        const updatedCustomer = await CustomerModel.findById(customerId);

        res.status(200).json(response(updatedCustomer, 'Customer updated successfully', null));
    } catch (error) {
        console.error('Update customer error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}


const DeleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;

        // Check if customer exists
        const existingCustomer = await CustomerModel.findById(customerId);
        if (!existingCustomer) {
            return res.status(404).json(response(null, 'Customer not found', 'Customer not found'));
        }

        // Delete customer
        await CustomerModel.findByIdAndDelete(customerId);

        res.status(200).json(response(null, 'Customer deleted successfully', null));
    } catch (error) {
        console.error('Delete customer error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const getAllCustomer = async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        res.status(200).json(response(customers, 'Customers fetched successfully', null));
    } catch (error) {
        console.error('Get all customers error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const getByIdCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await CustomerModel.findById(customerId);
        res.status(200).json(response(customer, 'Customer fetched successfully', null));
    } catch (error) {
        console.error('Get customer by id error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

module.exports = {   Login ,updateCustomer , DeleteCustomer ,getAllCustomer , getByIdCustomer};
