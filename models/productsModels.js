const mongoose = require('mongoose')

const products = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : false
    },
    price : {
        type : Number,
        required : true
    },
    image: {
        type: String, 
        required: false, 
    },
    images: [
        {
            type: String,
            required: false,
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true // Make it mandatory to link a product to a category
    }
})


module.exports = mongoose.model("Products", products)