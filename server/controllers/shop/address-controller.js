const Cart  = require("../../models/Cart");
const Address= require("../../models/Address");
//400 -> Bad Request
//404 ->Not Found
//500 ->Internal Server Error
//200 -> Success
//201 ->  indicates that a request has been fulfilled, and a new resource has been created as a result
const addAddress = async(req,res)=>{
    try{
        const {userId ,address, city,pincode , phone,notes} = req.body
        if(!userId || !address || !city || !pincode || !phone || !notes){
            return res.status(400).json({
                succes : false,
                message : "Invalid Data Provided"
            })
        }
        const newAddress = new Address({
            userId ,address, city,pincode , phone,notes
        })
        await newAddress.save();
        return res.status(201).json({
            success : true,
            message : "Address added Succesfully",
            data : newAddress
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
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );
    //new : true gives us the updated document and not the old one

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};





const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndDelete({_id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
module.exports = {addAddress , fetchAllAddress , editAddress , deleteAddress};