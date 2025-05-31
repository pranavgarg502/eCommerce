const Cart  = require("../../models/Cart");
const Product = require("../../models/Product");

//400 -> Bad Request
//404 ->Not Found
//500 ->Internal Server Error
//200 -> Success
const addToCart = async(req,res)=>{
    try{
        const {userId , productId , quantity } =req.body;
        if(!userId || !productId || quantity <=0 ){
            return res.status(400).json({
                success : false,
                message : "Invalid Data Provided"
            })
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success : false,
                message : "Product Not Found"
            })
        }
        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({
                userId ,
                items : []
                
            })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if(findCurrentProductIndex === -1){
            cart.items.push({productId , quantity })
        }
        else{
            cart.items[findCurrentProductIndex].quantity +=quantity;
        }
        await cart.save();
        return res.status(200).json({
            success : true,
            message : "Item Added to Cart",
            data : cart
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}
const fetchCartItems = async(req,res)=>{
    try{
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                success : false,
                message : "User Id not provided!"
            })
        }
        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : "image title price salesPrice"
        });
        if(!cart){
            return res.status(404).json({
                succes : false,
                message : "Cart Not Found"
            }) 
        }
        const validItems = cart.items.filter(productItem => productItem.productId);
        if(validItems.length < cart.items.length){
            cart.items = validItems;
            await cart.save();
        }
        const populateCartItems = validItems.map(item =>({
            productId : item.productId._id,
            image : item.productId.image,
            title : item.productId.title,
            price : item.productId.price,
            salesPrice : item.productId.salesPrice,
            quantity : item.quantity,

        }))

        return res.status(200).json({
            success : true,
            message : "Items Fetching successful",
            data : {
                ...cart._doc,
                items : populateCartItems

            }
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            succes : false,
            message : "Some Error Occured"
        })
    }
}
const updateCartItemQuantity = async(req,res)=>{
    try{
        const {userId , productId , quantity } =req.body;
        if(!userId || !productId || quantity <=0 ){
            return res.status(400).json({
                success : false,
                message : "Invalid Data Provided"
            })
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success : false,
                message : "Product Not Found"
            })
        }

        let cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({
                success : false,
                message : "Cart Not found!",
                data : cart
            })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if(findCurrentProductIndex === -1){
            return res.status(404).json({
                success : false,
                message : "Cart Item Not present!",
            })
        }
        else{
            cart.items[findCurrentProductIndex].quantity = quantity;
        }
        await cart.save();
        await cart.populate({
            path : 'items.productId',
            select : 'image title price salesPrice'
        })

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
            }));
        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
            });


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
module.exports = {addToCart , updateCartItemQuantity,deleteCartItem,fetchCartItems};