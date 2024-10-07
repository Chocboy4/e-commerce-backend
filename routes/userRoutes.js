const express = require("express")
const {registerUser, registerAdmin, loginUser, forgotPassword, getAllUsers, updateUserProfile, getSingleUser} = require("../controllers/userControllers")
const { protect, admin } = require("../middleware/authMiddleWare")
const { getAllProducts } = require("../controllers/productsConrtoller")
const route = express.Router()

route.post("/register", registerUser)

route.post("/register/admin", registerAdmin)

route.post("/login", loginUser)

route.post("/login/admin", loginUser)

route.post("/forgetPassword", forgotPassword)

route.get('/:id', getSingleUser);

route.get('/', getAllUsers)

route.put('/:id', updateUserProfile);

route.get('/products', getAllProducts)




module.exports = route