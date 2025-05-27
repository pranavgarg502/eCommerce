const express = require('express');
const { registerUser, loginUser , logoutUser , authMiddleWare} = require('../../controllers/auth-controller');
const router = express.Router();

router.post('/register' , registerUser);
router.post('/login' , loginUser);
router.post('/logout' , logoutUser);
router.get('/check-auth' , authMiddleWare , (req,res) =>{
    const user = req.user;
    res.status(200).json({
        success : true,
        message : "User is Authenticated !",
        user
    })
});
module.exports = router;