const cloudinary = require('cloudinary').v2;
const multer = require('multer');

    // Configuration
    cloudinary.config({ 
        cloud_name: '', 
        api_key: '', 
        api_secret: '' 
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
      
