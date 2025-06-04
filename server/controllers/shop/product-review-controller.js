const ProductReview = require('../../models/Review')
const Order = require('../../models/Order')
const Product = require('../../models/Product')

const addProductReview = async(req,res)=>{
    try{
        const {
        productId,
        userId ,
        userName ,
        reviewMessage ,
        reviewValue
        }  = req.body
        //quotes are required with string containing special symbol
        const order = await Order.findOne({
            userId,
            "cartItems.productId" : productId,
            orderStatus : "confirmed"
        })
        if(!order){
            return res.status(403).json({
                success : false,
                message : "You need to purchase product to review it."
            })
        }
        const checkExistingReview = await ProductReview.findOne({
            productId , userId
        })
        if(checkExistingReview){
            return res.status(400).json({
                success : false,
                message : "You already review this product"
            })
        }
        const newReview = new ProductReview({
                productId,
                userId ,
                userName ,
                reviewMessage ,
                reviewValue
        })
        await newReview.save();
        const reviews = await ProductReview.find({
            productId
        })
        const totalReviewsLength = reviews.length;

        const avgReview = reviews.reduce((sum,reviewItem)=>sum + reviewItem.reviewValue,0) / totalReviewsLength;
        await Product.findByIdAndUpdate(productId , {avgReview});

        return res.status(201).json({
            success : true,
            data : newReview
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}


const getProductReviews = async (req, res) => {
  try {
    const {productId} = req.params;
    console.log(productId);
    const reviews = await ProductReview.find({
        productId
    })
        return res.status(200).json({
            success : true,
            data : reviews
        })

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};






module.exports = {getProductReviews , addProductReview};