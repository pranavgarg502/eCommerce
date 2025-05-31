const Product = require('../../models/Product')
const getFilteredProducts = async(req,res) =>{
    try{
        const {Category = [] , Brand = [] , sortBy ="price-lowtohigh"}= req.query;
        let filters= {};
        if(Category.length){
            filters.category = {$in : Category.split(',')}
        }
        if(Brand.length){
            filters.brand = {$in : Brand.split(',')}
        }
        let sort = {};
        switch (sortBy) {
            case "price-lowtohigh": 
                sort.salesPrice = 1;
                break;
            case "price-hightolow": 
                sort.salesPrice = -1;
                break;
        
            case "title-ztoa": 
                sort.title = -1;
                break;
        
            case "title-atoz": 
                sort.title = 1;
                break;
            default:
                sort.salesPrice = 1;
                break;
        }
        const products = await Product.find(filters).sort(sort)
        return res.status(200).json({
            success : true,
            message : "Filtered Products Fetched",
            data : products
        })
        
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}
const getProductDetails = async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(id);
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({
                success : false,
                message : "Product Not Found"
            })   
        }
        else{
            return res.status(200).json({
                success : true,
                message : "Product Found",
                data : product
            })           
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })   
    }
}
module.exports = {getFilteredProducts , getProductDetails};