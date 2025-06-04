const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
//req.file.buffer: multer stores the uploaded file in memory as a Buffer.
//You convert the buffer into a base64 string.
// Create a data URL combining the mime type and base64 data.
// Example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."

// Pass the data URL to imageUploadUtil to upload to Cloudinary.

// If successful, respond with the upload result (Cloudinary info).

// If error, log it and respond with a failure message
const handleImageUpload = async(req,res) =>{
    try{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
        res.json({
            success : true,
            result
        })
    }  
    catch(e){
        console.log(e);
        res.json({
            success :false,
            message : "Error Occured"
        })
    }
}
//add a new Product
const addProduct = async(req,res) =>{
    try{
        console.log("AAYA HU");
        const{image , title , description , brand , category , price , salesPrice , totalStock} = req.body;
        const newProduct = new Product({
            image , title , description , brand , category , price , salesPrice , totalStock
        })
        await newProduct.save();
        res.status(200).json({
            success : true,
            message:"Product Added to the Database",
            data : newProduct
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}
//fetch all products
const fetchAllProduct = async(req,res) =>{
    try{
        const listOfProducts = await Product.find();
        res.status(200).json({
            success : true,
            data : listOfProducts
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}
//update a product
const editProduct = async(req,res) =>{
    try{
        const {id} = req.params;
        const{image, title , description , brand , category , price , salesPrice , totalStock} = req.body;

        const product = await Product.findById(id);
        if(!product){
            res.status(404).json({
                success : false,
                message : "Product Not Found"
            })
        }
        else{
            product.title = title || product.title
            product.image = image || product.image
            product.description = description || product.description
            product.brand= brand || product.brand
            product.category = category || product.category
            product.price= price === "" ? 0 : price || product.price
            product.salesPrice = salesPrice === "" ? 0 : salesPrice || product.salesPrice
            product.totalStock = totalStock || product.totalStock
            await product.save();
            res.status(200).json({
                success : true,
                data : product
            })

        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}
//delete a product
const deleteProduct = async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({
                success : false,
                message : "Product Not Found"
            })
        }
        res.status(200).json({
            success : true,
            message : "Product Deleted Successfully"
        })
        
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}
const findProduct = async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json({
            success : true,
            data : product
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}
module.exports = {handleImageUpload , addProduct , fetchAllProduct , editProduct , deleteProduct}