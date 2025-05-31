import ProductImageUpload from "@/components/admin-view/image_upload";
import AdminProductTile from "@/components/admin-view/product_tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { toast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    const {productList} = useSelector(state => state.adminProducts)
    const [openCreateProductDialog,setOpenCreateProductDialog] = useState(false);
    const [formData,setFormData] = useState(intialForm);
    const [imageFile , setImageFile] = useState(null);
    const [uploadImageUrl , setUploadImageUrl] = useState('');
    const [imageLoading ,setImageLoading] = useState(false);
    const [currentEditedID , setCurrentEditedID] = useState(null);
    const dispatch = useDispatch();
    function isFormValid() {
        const requiredFieldsFilled = Object.keys(formData)
            .filter((key) => key !== 'salesPrice') 
            .every((key) => formData[key] !== "");

        if (currentEditedID) {
            return requiredFieldsFilled;
        }

        return imageFile !== null && requiredFieldsFilled;
    }


    function handleDelete(getCurrentProductId){
        dispatch(deleteProduct({
            id : getCurrentProductId
        })) .then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllProduct());
            }
        })

    }
    function onSubmit(event){
        event.preventDefault();
        currentEditedID!==null? 
        dispatch(editProduct({
             formData  , id : currentEditedID
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllProduct());
                setFormData(intialForm);
                setCurrentEditedID(null);
                setOpenCreateProductDialog(false);
            }
        }) :

        dispatch(addNewProduct({
            ...formData , 
            image : uploadImageUrl
        }
        )).then((data)=>{
            if(data?.payload?.success){
                toast({
                    title : 'Product Added Successfully'
                })
                dispatch(fetchAllProduct());
                setImageFile(null);
                setFormData(intialForm);
                setOpenCreateProductDialog(false);
            }
            else{
                toast({
                    title : 'Some Error Occured',
                    variant : 'destructive'
                })
            }
        })
    }
    useEffect(()=>{
        dispatch(fetchAllProduct());
    } , [dispatch])
    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick = {()=> setOpenCreateProductDialog(true)}>Add New Product</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"> 
                {
                    productList && productList.length> 0 ? 
                    productList.map(productItem => <AdminProductTile setFormData = {setFormData} setOpenCreateProductDialog = {setOpenCreateProductDialog} setCurrentEditedID = {setCurrentEditedID} key ={productItem._id} product={productItem} handleDelete = {handleDelete} />) : null
                }


            </div>


                <Sheet open = {openCreateProductDialog} onOpenChange = {()=>{
                    setOpenCreateProductDialog(false);
                    setCurrentEditedID(null);
                    setFormData(intialForm);
                }}>
                    <SheetContent side= "right" className = "overflow-auto">
                        <SheetHeader>
                            {currentEditedID===null ? <SheetTitle>Add New Product </SheetTitle>: <SheetTitle>Edit Product</SheetTitle> }
                        </SheetHeader>
                        <ProductImageUpload isEditMode = {currentEditedID!==null} imageFile = {imageFile} setImageFile = {setImageFile} uploadImageUrl = {uploadImageUrl} setUploadImageUrl = {setUploadImageUrl} setImageLoading = {setImageLoading} imageLoading = {imageLoading}/>
                            <div className="py-6">
                    <CommonForm buttonText = {currentEditedID!==null ? 'Edit' :'Add' } formData = {formData} setFormData = {setFormData} onSubmit = {onSubmit} formControls={addProductFormElements} isBtnDisabled={!isFormValid()}/>
                </div>
                    </SheetContent>

                </Sheet>
        </Fragment>
    )
}
export default AdminProducts;