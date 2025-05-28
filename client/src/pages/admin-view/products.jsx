import ProductImageUpload from "@/components/admin-view/image_upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useState } from "react";

const intialForm ={
    image : null,
    title :'',
    description : '',
    category : '',
    brand:'',
    price : '',
    salesPrice :'',
    totalStock : ''
} 
function AdminProducts(){
    const [openCreateProductDialog,setOpenCreateProductDialog] = useState(false);
    const [formData,setFormData] = useState(intialForm);
    const [imageFile , setImageFile] = useState(null);
    const [uploadImageUrl , setUploadImageUrl] = useState('');
    const [imageLoading ,setImageLoading] = useState(false);
    function onSubmit(){

    }
    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick = {()=> setOpenCreateProductDialog(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"> </div>

                <Sheet open = {openCreateProductDialog} onOpenChange = {()=>{
                    setOpenCreateProductDialog(false);
                }}>
                    <SheetContent side= "right" className = "overflow-auto">
                        <SheetHeader>
                            <SheetTitle>
                                Add New Product
                            </SheetTitle>
                        </SheetHeader>
                        <ProductImageUpload imageFile = {imageFile} setImageFile = {setImageFile} uploadImageUrl = {uploadImageUrl} setUploadImageUrl = {setUploadImageUrl} setImageLoading = {setImageLoading}/>
                            <div className="py-6">
                    <CommonForm buttonText = 'Add' formData = {formData} setFormData = {setFormData} onSubmit = {onSubmit} formControls={addProductFormElements}/>
                </div>
                    </SheetContent>

                </Sheet>
        </Fragment>
    )
}
export default AdminProducts;