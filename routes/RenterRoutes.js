const express = require('express');
const router = express.Router();
const RenterController = require("../controller/RenterController")


//get routes 
router.get('/', RenterController.getAllRenters);
router.get('/:id', RenterController.getRenterById);

//post routes 
router.post('/register', RenterController.addRenter);
router.post('/login', RenterController.loginRenter);


//patch routes 
router.patch('/:id', RenterController.updateRenter);

//delete routes
router.delete('/:id', RenterController.deleteRenter);


module.exports = router 

