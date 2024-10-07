// controllers/productController.js
const Product = require('../models/productsModels');
const Category = require('../models/categoryModel')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the DB
        if (products && products.length > 0) {
            res.status(200).json({ message: 'Products fetched successfully', products });
        } else {
            res.status(404).json({ message: 'No products found' });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};


// const createProduct = async (req, res) => {
//     const { name, quantity, desc, price, rating } = req.body;
    
//     // Get the uploaded files
//     const image = req.files['image'] ? req.files['image'][0].filename : null; // single image
//     const images = req.files['images'] ? req.files['images'].map(file => file.filename) : []; // multiple images

//     if (!name || !quantity || !desc || !price || !image || images.length === 0 || !rating) {
//         return res.status(401).json({ message: "All fields are mandatory" });
//     } else {
//         const products = await Product.create({
//             name,
//             quantity,
//             desc,
//             price,
//             rating,
//             image,
//             images
//         });
//         console.log('Request Body:', req.body);
// console.log('Files:', req.files);

//         res.status(201).json({ message: "Product created successfully" });
//     }
// }

const createProduct = async (req, res) => {
    const { name, quantity, desc, price, rating, categoryId } = req.body;

    // Log req.files to debug file uploads
    console.log('Files received:', req.files);

    // Get the uploaded files
    const image = req.files?.image ? req.files.image[0].filename : null; // Single image
    const images = req.files?.images ? req.files.images.map(file => file.filename) : []; // Multiple images

    // Validate the required fields
    if (!name || !quantity || !desc || !price || !categoryId) {
        return res.status(400).json({ message: "Name, quantity, description, price, and category are required." });
    }

    // Ensure at least one image is uploaded
    if (!image && images.length === 0) {
        return res.status(400).json({ message: "At least one image is required." });
    }

    try {
        // Find the category by ID
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Create the product in the database
        const product = await Product.create({
            name,
            quantity,
            desc,
            price,
            rating,
            image,
            images,
            category: categoryId
        });

        // Log the created product
        console.log('Product created:', product);

        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ message: "Error creating product", error });
    }
};





const findProduct = async (req, res) => {
    const { name } = req.body; 

    if (!name) {
        return res.status(400).json({ message: "You have to pass in a product name" });
    }

    try {
        
        const products = await Product.find({ name });

        if (products.length === 0) {
            return res.status(404).json({ message: `No products found with the name "${name}"` });
        }

        
        res.status(200).json({
            message: `Products found with name: ${name}`,
            products: products.map(product => ({
                name: product.name,
                price: product.price,
            })),
        });
    } catch (error) {
        console.error("Error finding products:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};
 

// const createProduct = async (req, res) => {
//     const { name, quantity, desc, price, rating } = req.body;
    
//     // Get the uploaded files
//     const image = req.files?.image ? req.files.image[0].filename : null; // Single image
//     const images = req.files?.images ? req.files.images.map(file => file.filename) : []; // Multiple images

//     // Validate the required fields
//     if (!name || !quantity || !desc || !price || !rating) {
//         return res.status(400).json({ message: "Name, quantity, description, price, and rating are required." });
//     }

//     if (!image && images.length === 0) {
//         return res.status(400).json({ message: "At least one image is required." });
//     }

//     try {
//         const product = await Product.create({
//             name,
//             quantity,
//             desc,
//             price,
//             rating,
//             image, // Single image
//             images  // Array of multiple images
//         });

//         console.log('Request Body:', req.body);
//         console.log('Files:', req.files);

//         return res.status(201).json({ message: "Product created successfully", product });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Error creating product", error });
//     }
// };

const findAllProducts = async (req, res) => {
    const product = await Product.find()
    try {
        if(product && product.length > 0){
            res.status(201).json({
                message: "These are all the products we have",
                product
            })
        }else{
            res.status(400).json({message : 'No Products found'})
        }
    } catch (error) {
        res.status(500).json("Internal Error")
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" }); 
        }

        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};


module.exports = { getAllProducts, createProduct, findAllProducts, deleteProduct };
