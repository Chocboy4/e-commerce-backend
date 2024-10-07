const mongoose = require("mongoose")
require("dotenv").config()

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`MongoDb Database Connected: ${connect.connection.name} ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDb