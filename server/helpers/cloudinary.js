const cloudinary = require('cloudinary').v2;
const multer = require('multer');

    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
        api_key:  CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    });
    const storage = new multer.memoryStorage();
    async function imageUploadUtil(file){
        const result = await cloudinary.uploader
       .upload(
            file , {
               resource_type:'auto'
           }
       )
       return result;
//It returns the upload result object (includes URLs, public ID, metadata, etc.).
    }
    // upload is also a middleware to handle file uploads
    const upload = multer({storage});
    module.exports = {upload , imageUploadUtil};
      
