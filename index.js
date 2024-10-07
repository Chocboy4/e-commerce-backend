const express = require("express")
require("dotenv").config()
const connectDb = require("./config/db")

const app = express()

connectDb()
port = process.env.PORT || 3000


app.use(express.json())
app.use("/api/user", require('./routes/userRoutes'))

app.use('/api/products', require('./routes/productsRoutes'))
// app.use("/api/category", require('./routes/categoryRoutes'))
app.use('/api/category', require('./routes/categoryRoutes'))
app.use('/api/order', require('./routes/orderRoutes'))

app.listen(port, () => {

    console.log(`Server Connected on ${port}`)
})