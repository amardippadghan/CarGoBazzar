const CarRentPostModel = require("../models/CarRentPostModel");
const response = require("../utils/response");


const getAllRentPost = async (req, res) => {
    try {
        const rentPost = await CarRentPostModel.find();
        res.status(200).json(response(rentPost, 'Car rental post fetched successfully', null));
        
    } catch (error) {
        console.error('Get all car rental post error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
        
    }
}
const addCarRentPost = async (req, res) => {
    try {
        // Validate input data
        const { name, email, password, phone, address, license, licensePdf, age, gender, profilePicture } = req.body;
        if (!name || !email || !password || !phone || !address || !license || !licensePdf || !age || !gender || !profilePicture) {
            return res.status(400).json(response(null, 'Missing required fields', 'All required fields must be provided'));
        }

        // Sanitize input data
        // Here, you would implement appropriate sanitization methods depending on your application requirements

        const newPost = await CarRentPostModel.create(req.body);
        res.status(201).json(response(newPost, 'Car rental post created successfully', null));
    } catch (error) {
        console.error('Add car rental post error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const updateCarRentPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedData = req.body;

        // Validate input data
        // Similar to addCarRentPost, validate that required fields are present

        const existingPost = await CarRentPostModel.findById(postId);
        if (!existingPost) {
            return res.status(404).json(response(null, 'Car rental post not found', 'Car rental post not found'));
        }

        // Authorization: Check if the user has permission to update the post
        // For example, you might check if the user is the owner of the post or has admin privileges

        await CarRentPostModel.findByIdAndUpdate(postId, updatedData);

        const updatedPost = await CarRentPostModel.findById(postId);

        res.status(200).json(response(updatedPost, 'Car rental post updated successfully', null));
    } catch (error) {
        console.error('Update car rental post error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const deleteCarRentPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const existingPost = await CarRentPostModel.findById(postId);
        if (!existingPost) {
            return res.status(404).json(response(null, 'Car rental post not found', 'Car rental post not found'));
        }

        // Authorization: Check if the user has permission to delete the post
        // Similar to updateCarRentPost, perform necessary authorization checks

        await CarRentPostModel.findByIdAndDelete(postId);

        res.status(200).json(response(null, 'Car rental post deleted successfully', null));
    } catch (error) {
        console.error('Delete car rental post error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

const getByIdCarRentPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const existingPost = await CarRentPostModel.findById(postId);
        if (!existingPost) {
            return res.status(404).json(response(null, 'Car rental post not found', 'Car rental post not found'));
        }

        res.status(200).json(response(existingPost, 'Car rental post fetched successfully', null));
    } catch (error) {
        console.error('Get car rental post by id error:', error);
        res.status(500).json(response(null, 'Internal server error', error.message));
    }
}

module.exports = { addCarRentPost, updateCarRentPost, deleteCarRentPost , getAllRentPost ,getByIdCarRentPost};
