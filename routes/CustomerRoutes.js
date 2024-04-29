const express = require('express');
const CustomerController = require("../controller/CustomerController")
const router = express.Router();


//get router 
router.get("/", CustomerController.getAllCustomer)
router.get("/:id", CustomerController.getByIdCustomer)

//post router

router.post("/login", CustomerController.Login)

//patch router
router.patch("/update/:id", CustomerController.updateCustomer)

//delete router 
router.delete("/delete/:id", CustomerController.DeleteCustomer)


module.exports = router