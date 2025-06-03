const express = require('express');
const {getAllOrdersOfAllUser , getOrderDetails,  updateOrderStatus} = require('../../controllers/admin/order-contoller');

const router = express.Router();

router.get('/get' ,getAllOrdersOfAllUser);
router.get('/details/:id' ,getOrderDetails);
router.put('/update/:id' ,updateOrderStatus);


module.exports = router;

