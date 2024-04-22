const express = require("express")
const app = express()
const apiRouter = express.Router()
const mongoose = require("mongoose")
app.use(express.json())


//routes import 
const CustomerRoute = require("./routes/CustomerRoutes")
const RenterRoute = require("./routes/RenterRoutes")
const CarRentPost = require("./routes/RentPostRoute")



apiRouter.use("/customer" , CustomerRoute)
apiRouter.use("/renter", RenterRoute)
apiRouter.use("/post", CarRentPost)




//use of apirouter 
app.use("/api", apiRouter)


mongoose.connect("mongodb+srv://amardippadghan4:admin123@cluster0.ky10qu8.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})
app.listen(7000 , ()=>{
    console.log("server is running on 7000")
})