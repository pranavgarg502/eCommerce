const paypal = require('../../helpers/paypal')
const Order = require('../../models/Order')
const Cart = require('../../models/Cart')
const createOrder= async(req,res)=>{
    try{
        const{userId , cartId , cartItems , addressInfo , orderStatus ,paymentMethod,
            paymentStatus,
                totalAmount,
                orderDate ,
                orderUpdateDate,
                paymentId,
                payerId ,
            } = req.body

        const create_payment_json = {
            intent : 'sale',
            payer : {
                payment_method : 'paypal',

            },
            redirect_urls :{
                return_url : 'http://localhost:5173/shop/paypal-return',
                cancel_url : 'http://localhost:5173/shop/paypal-cancel'
            },
            transactions : [
                {
                    item_list : {
                        items : cartItems.map((item)=>({
                            name : item.title,
                            sku : item.productID,
                            price : item.price.toFixed(2),
                            currency : 'USD',
                            quantity : item.quantity

                        })),

                    },
                    amount : {
                        currency : 'USD',
                        total : totalAmount.toFixed(2)
                    },
                    description : 'description'
                }
            ]

        }
        paypal.payment.create(create_payment_json , (async(error,paymentInfo)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    success : false,
                    message : 'Some Error Occured'
                })
            }
            else{
                const newlyCreatedOrder = new Order({userId , cartId, cartItems , addressInfo , orderStatus ,paymentMethod,
                    paymentStatus,
                        totalAmount,
                        orderDate ,
                        orderUpdateDate,
                        paymentId,
                        payerId 
                    })

                await newlyCreatedOrder.save();
                const approvalURL = paymentInfo.links.find(link=>link.rel=='approval_url').href;
                res.status(201).json({
                    success : true,
                    approvalURL,
                    orderId : newlyCreatedOrder._id
                })
            }

            

        }))
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : "Some Error Occured"
        })
    }
}
const capturePayment= async(req,res)=>{
    try{
        const {payerId , paymentId , orderId} = req.body;
        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({
                success : false,
                message : "Order Not Found!"
            })
        }
        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;
        const getCartId = order.cartId;
        const cart = await Cart.findByIdAndDelete(getCartId);
        await order.save();
        return res.status(200).json({ 
            success : true,
            message : "Order Confirmed",
            data : order
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
const getAllOrdersByUser = async(req,res) =>{
    try{
        const {userId} = req.params;
        const orders = await Order.find({userId});
        if(!orders.length){
            return res.status(404).json({
                success : false,
                message : "No Orders Found"
            })
        }
        return res.status(200).json({
            success : true,
            data : orders
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
const getOrderDetails = async(req,res) =>{
    try{
        const {id} = req.params;
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                success : false,
                message : "Order Not found"
            })
        }
        return res.status(200).json({
            success : true,
            data : order
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
module.exports = {createOrder , capturePayment ,getAllOrdersByUser , getOrderDetails};