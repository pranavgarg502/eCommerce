const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/product-routes')
const uri = 'your mongoDB Url';
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
app.use('/api/admin/products' ,adminProductRouter);
app.listen(PORT , ()=>{
    console.log(`Server is Running on ${PORT}`);
});