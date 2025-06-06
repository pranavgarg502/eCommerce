import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
function ProductImageUpload({imageFile , setImageFile,uploadImageUrl , setUploadImageUrl ,setImageLoading , imageLoading , isEditMode , isCustomStyling = false}){
    const inputRef = useRef(null);
    function handleImageFileChange(event){
        const selectedFile = event.target.files?.[0]
        if(selectedFile){
            setImageFile(selectedFile);
        }

    }
    function handleDragOver(event){
        event.preventDefault();
    }
    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile){
            setImageFile(droppedFile);
        }
    }
    function handleRemoveImage(){
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value = "";
        }
    }
    async function uploadImageToCloudinary(){
        setImageLoading(true);
        const data = new FormData();
        data.append('my-file' , imageFile);
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image` , data);
        if(res?.data?.success){
            setUploadImageUrl(res.data.result.url);
            setImageLoading(false);
        }
    }
    useEffect(()=>{
        if(imageFile !== null){
            uploadImageToCloudinary();

        }
    } , [imageFile])
    return(
        <div className={`w-full mt-4 ${isCustomStyling ? '' : ' max-w-md mx-auto'}`}>
            <Label className = "text-lg font-semibold mb-2 block">Upload Image</Label>

            <div onDragOver = {handleDragOver} onDrop = {handleDrop} className={`${isEditMode ? 'opacity-60 ' : ''} border-2 border-dashed rounded-lg p-4`}>
                <Input id = "image-upload" type = "file"  ref = {inputRef} className = "hidden" onChange = {handleImageFileChange} disabled= {isEditMode} ></Input>
                {
                    !imageFile ?
                    <Label htmlFor="image-upload" className = {`${isEditMode ? 'cursor-not-allowed ' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`}>
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"></UploadCloudIcon>
                        <span>Drag & Drop or Click to Upload image</span>

                    </Label> : 
                    (imageLoading? <Skeleton className= 'h-10 bg-gray-100'/> : 
                    <div className="flex items-center justify-between">
                        {/* <div className="flex items-center">
                            <FileIcon className="w-8 h-8 text-primary mr-2 "></FileIcon>
                        </div>  */}
        
                            <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Uploaded preview"
                            className="mx-auto max-h-48 object-contain"
                            />

                        <Button variant = "ghost" size ='icon' className = "text-muted-foreground hover:text-foreground " onClick = {handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                    
                    )

                }
            </div>
        </div>
    )
}
export default ProductImageUpload;