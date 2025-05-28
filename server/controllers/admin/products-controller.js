const { imageUploadUtil } = require("../../helpers/cloudinary");
//req.file.buffer: multer stores the uploaded file in memory as a Buffer.
//You convert the buffer into a base64 string.
// Create a data URL combining the mime type and base64 data.
// Example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."

// Pass the data URL to imageUploadUtil to upload to Cloudinary.

// If successful, respond with the upload result (Cloudinary info).

// If error, log it and respond with a failure message
const handleImageUpload = async(req,res) =>{
    try{
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
        res.json({
            success : true,
            result
        })
    }  
    catch(e){
        console.log(e);
        res.json({
            success :false,
            message : "Error Occured"
        })
    }
}
module.exports = {handleImageUpload}