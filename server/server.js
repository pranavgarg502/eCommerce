const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/product-routes')
const shopProductRouter = require('./routes/shop/product-routes')
const shopCartRouter =  require('./routes/shop/cart-routes')
const shopAddressRouter =  require('./routes/shop/address-routes')
const shopOrderRouter =  require('./routes/shop/order-routes')
const adminOrderRouter =  require('./routes/admin/order-routes')
const shopSearchRouter = require("./routes/shop/search-routes");
const uri = '';
mongoose.connect(uri)
.then(()=>{
    console.log("MONGODB connected");
})
.catch((error) =>{
    console.log(error);
})

const app = express();
const PORT = process.env.PORT || 5002 ;

app.use(
    cors({
        origin : "http://localhost:5173",
        methods : ['GET','POST','PUT','DELETE'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Express",
            "Pragma"
        ],
        credentials : true
    })
)
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth' , authRouter);
app.use('/api/shop/products' , shopProductRouter);
app.use('/api/admin/products' ,adminProductRouter);
app.use('/api/shop/cart' , shopCartRouter)
app.use('/api/shop/address' , shopAddressRouter)
app.use('/api/shop/order' , shopOrderRouter)
app.use('/api/admin/orders' , adminOrderRouter)
app.use("/api/shop/search", shopSearchRouter);
app.listen(PORT , ()=>{
    console.log(`Server is Running on ${PORT}`);
});