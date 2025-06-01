import { addressFormControls } from "@/config";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import { toast } from "@/hooks/use-toast";
import AddressCard from "./address-card";
const intitalAddressFormData = {
    address : '',
    pincode : '',
    phone :'',
    notes : '',
    city : ''

}
function Address(){
    const [formData, setFormData] = useState(intitalAddressFormData)
    const dispatch = useDispatch();
    const {user} = useSelector(state =>state.auth);
    const {addressList} = useSelector(state => state.shopAddress)
    const [currentEditedID ,setCurrentEditedId] = useState(null);
    useEffect(()=>{
        dispatch(fetchAllAddresses(user?.id));
    } , [dispatch])

    function handleDeleteAddress(getCurrentAddress){
        dispatch(deleteAddress({
            userId : user?.id,
            addressId : getCurrentAddress?._id
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                toast({
                title : "Address Deleted Successfully"
            })
                
            }
        })
    }
    function handleEditAddress(getCurrentAddress){
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData ,
            address : getCurrentAddress?.address,
            pincode : getCurrentAddress?.pincode,
            phone :getCurrentAddress?.phone,
            notes : getCurrentAddress?.notes,
            city : getCurrentAddress?.city
        }
        );
    }
    function handleManageAddress(event){
        event.preventDefault();
        if(addressList.length >= 3 && currentEditedID === null){
            toast({
                title : "You’ve reached the limit of 3 saved addresses.",
                variant : "destructive"
            })
            return;
        }
        if(currentEditedID !==null){
            dispatch(editaAddress(
                {
                    formData , 
                    userId : user?.id ,
                    addressId : currentEditedID
                }

            )).then(data =>{
                if(data?.payload?.success){
                    dispatch(fetchAllAddresses(user?.id));
                    setCurrentEditedId(null);
                    setFormData(intitalAddressFormData);
                }
                toast({
                    title : "Address Edited Successfully"
                })
            })
        }
        else{
            dispatch(addAddress(
                {
                    ...formData , 
                    userId : user?.id        
                }

            )).then(data =>{
                if(data?.payload?.success){
                    dispatch(fetchAllAddresses(user?.id));
                    setFormData(intitalAddressFormData);
                }
                toast({
                    title : "Address Added Successfully"
                })
            })
        }

    }
function isFormValid(formValid) {
  return Object.values(formData).every(value => value?.trim() !== "");
}

    console.log(addressList);
    return(
        <Card>
            <div className="mb-5 p-4 gap-2 grid grid-cols-1 sm:grid-cols-2">
                {
                    addressList && addressList.length > 0? addressList.map(singleAddressItem => <AddressCard handleDeleteAddress = {handleDeleteAddress} handleEditAddress = {handleEditAddress} setFormData = {setFormData} addressInfo={singleAddressItem}/>) : null
                }
                
            </div>
            <CardHeader >
                <CardTitle>
                    {currentEditedID !==null ? 'Edit Address' : 'Add New Address'}
                </CardTitle>

            </CardHeader>
            <CardContent className = "space-y-3">
                <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={currentEditedID !==null ? 'Edit' : 'Add'} onSubmit={handleManageAddress} isBtnDisabled={!isFormValid()}/>
            </CardContent>
        </Card>

    )
}
export default Address;