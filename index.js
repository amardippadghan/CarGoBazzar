//imports 
const express = require("express")
const app = express()
const apiRouter = express.Router()
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const response = require("./utils/response")
const bcrypt = require("bcrypt")
const path = require("path")
app.use(cors())
app.use(express.json())



//models imports 
const Customer = require("./models/CustomerModel")



//routes import 
const CustomerRoute = require("./routes/CustomerRoutes")
const RenterRoute = require("./routes/RenterRoutes")
const CarRentPost = require("./routes/RentPostRoute")

//multer 
const storage = multer.diskStorage({
    destination: path.join(__dirname, "./public/uploads/"),
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  




//api router routes 
apiRouter.use("/customer" , CustomerRoute)
apiRouter.use("/renter", RenterRoute)
apiRouter.use("/post", CarRentPost)




//use of apirouter 
app.use("/api", apiRouter)


//upload routes for customer 
app.post("/api/customer/upload", upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "licensePdf", maxCount: 1 },
]), async (req, res) => {

  const { name, email, phone, address, license, aadharNumber, age, gender, password } = req.body;
    try {
        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ email: req.body.email });
        if (existingCustomer) {
            return res.status(400).json({ error: "User already exists" });
        }
        console.log("req.body", req.body)

        // Extract file paths and URLs
        const profilePicturePath = req.files.profilePicture[0].path;
        const licensePdfPath = req.files.licensePdf[0].path;
        const profilePictureUrl = `http://localhost:8000/public/uploads/${req.files.profilePicture[0].filename}`;
        const licensePdfUrl = `http://localhost:8000/public/uploads/${req.files.licensePdf[0].filename}`;
        console.log("profilePictureUrl" , profilePictureUrl)
        console.log("licensePdfUrl" , licensePdfUrl)
        

        const hashpassword = await bcrypt.hash(password, 10);
        // Create new customer instance
        const newCustomer = {
            name,
            email,
            phone,
            address,
            license,
            aadharNumber,
            age,
            gender,
            password : hashpassword,
            profilePicture : profilePictureUrl || "",
            licensePdf: licensePdfUrl || ""
         
        };

        // Save new customer to the database
        const savedCustomer = await Customer.create(newCustomer);

        // Return success response
        res.status(201).json(response(savedCustomer , "user has been created " , null ));
    } catch (error) {
        console.error(error);
        res.status(500).json(response(null , "internal server error " , error.message));
    }
});



mongoose.connect("mongodb+srv://amardippadghan4:admin123@cluster0.ky10qu8.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})
app.listen(7000 , ()=>{
    console.log("server is running on 7000")
})

