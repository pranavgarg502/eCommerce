import { useState } from "react";
import CommonForm from "../common/form";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import { getAllOrdersByAllUsers, getOrderDetails, updateOrderDetails } from "@/store/admin/order-slice";
import { toast } from "@/hooks/use-toast";
const initialFormData = {
    status :'',

}
function AdminOrderDetailsView({orderDetails , setOpenDetailsDialog}){
    const [formData , setFormData] = useState(initialFormData);
    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    function handleUpdateStatus(event){
        event.preventDefault();
        console.log(formData);
        const {status} = formData;
        if(!status){
            toast({
                title : "Please Select an Order Status.",
                variant : "destructive"
            })
            return;
        }
        dispatch(updateOrderDetails({
            id : orderDetails?._id,
            orderStatus : status
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(getOrderDetails(orderDetails?._id));
                dispatch(getAllOrdersByAllUsers());
                setFormData(initialFormData);
                toast({
                    title : "Order Status Updated"
                })
                
            }
        })
         
    }
    return <DialogContent className = "sm:max-[600px]">
        <div className="grid gap-6 ">
            <div className="grid gap-2">
                <div className="flex items-center justify-between mt-6">
                    <p className="font-medium">
                        User ID
                    </p>
                    <Label>{user?.id}</Label>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="font-medium">
                        Order ID
                    </p>
                    <Label>{orderDetails?._id}</Label>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <p className="font-medium">
                        Order Date
                    </p>
                    <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                </div>
                    <div className="flex items-center justify-between mt-2">
                    <p className="font-medium">
                        Order Price
                    </p>
                    <Label>{orderDetails?.totalAmount}</Label>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <p className="font-medium">
                        Payment Method
                    </p>
                    <Label>{orderDetails?.paymentMethod}</Label>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <p className="font-medium">
                        Payment Status
                    </p>
                    <Label>{orderDetails?.paymentStatus}</Label>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <p className="font-medium">
                        Order Status
                    </p>
                    <Label><Badge className={`py-1 px-3 ${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-400': orderDetails?.orderStatus === 'rejected' ?'bg-red-600' :'bg-black'}`}>    
                            {orderDetails?.orderStatus}
                        </Badge>
                    </Label>
                </div>

                <Separator/>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">
                            Order Detais
                        </div>
                        <ul className="grid gap-3">
                            {
                                orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                                orderDetails?.cartItems.map((item)=>  <li className="flex items-center justify-between">
                                <span>
                                    Title : {item.title}
                                </span>
                                <span>
                                    Quantiy : {item.quantity}
                                </span>
                                <span>
                                    Price : {item.price}
                                </span>

                            </li>) : null
                            }
                           
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">
                            Shipping Info
                        </div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user?.userName}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                        
                    </div>
                </div>
                <div>
                <CommonForm
                    formControls={[
                    {
                        label: "Order Status",
                        name: "status",
                        componentType: "select",
                        options: [
                        { id: "pending", label: "Pending" },
                        { id: "inProcess", label: "In Process" },
                        { id: "inShipping", label: "In Shipping" },
                        { id: "delivered", label: "Delivered" },
                        { id: "rejected", label: "Rejected" },
                        ],
                    },
                    ]}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={"Update Order Status"}
                    onSubmit={handleUpdateStatus}
                />
                </div>

            </div>
        </div>

    </DialogContent>
}
export default AdminOrderDetailsView;