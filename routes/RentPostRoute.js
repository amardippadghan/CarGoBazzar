const express = require('express');
const router = express.Router();
const RentPostController = require("../controller/RentPostController")

//get routes 
router.get('/', RentPostController.getAllRentPost);
router.get('/:id', RentPostController.getByIdCarRentPost);

//post routes 
router.post('/', RentPostController.addCarRentPost);

//update routes
router.put('/:id', RentPostController.updateCarRentPost);

//delete routes
router.delete('/:id', RentPostController.deleteCarRentPost);


module.exports = router;

