import ProductImageUpload from "@/components/admin-view/image_upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice/feature";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard(){
    const [imageFile , setImageFile] = useState(null);
    const [uploadImageUrl , setUploadImageUrl] = useState('');
    const [imageLoading ,setImageLoading] = useState(false);
    const {featureImageList} = useSelector(state=>state.commonFeature);
    const dispatch = useDispatch();
    console.log(uploadImageUrl);
    function handleUploadFeatureImage(){
        dispatch(addFeatureImage(uploadImageUrl)).then(data=>{
            if(data?.payload?.success){
                dispatch(getFeatureImages());
                setImageFile(null);
                setUploadImageUrl("");
            }
        })
    }
    useEffect(()=>{
        dispatch(getFeatureImages());
    },[dispatch])
    console.log(featureImageList);
    return (
        <div>
            <ProductImageUpload //isEditMode = {currentEditedID!==null} 
                                imageFile = {imageFile} 
                                setImageFile = {setImageFile} 
                                uploadImageUrl = {uploadImageUrl} 
                                setUploadImageUrl = {setUploadImageUrl} 
                                setImageLoading = {setImageLoading} 
                                imageLoading = {imageLoading}
                                isCustomStyling = {true}/>   
            <Button onClick = {handleUploadFeatureImage} className = "mt-5 w-full">Upload</Button>
           <div className="flex flex-col gap-4 mt-5">
                {featureImageList && featureImageList.length > 0
                ? featureImageList.map((featureImgItem) => (
                    <div className="relative">
                        <img
                        src={featureImgItem.image}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                        />
                    </div>
                    ))
                : null}
            </div>
        </div>
    )
}
export default AdminDashboard;