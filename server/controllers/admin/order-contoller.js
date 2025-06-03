const paypal = require('../../helpers/paypal')
const Order = require('../../models/Order')
const Cart = require('../../models/Cart')


const getAllOrdersOfAllUser = async(req,res) =>{
    try{
        const orders = await Order.find({});
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

const updateOrderStatus = async(req,res)=>{
    try{
        const {id}  = req.params;
        const {orderStatus} = req.body
        if(!orderStatus){
            return res.status(404).json({
                success : false,
                message : "Order Status Not found"
            })
        }
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                success : false,
                message : "Order Not found"
            })
        }
        await Order.findByIdAndUpdate(id , {orderStatus});
        return res.status(200).json({
            success : true,
            message : 'Order Status is Updated Successfully!'
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
module.exports = {getAllOrdersOfAllUser , getOrderDetails , updateOrderStatus};