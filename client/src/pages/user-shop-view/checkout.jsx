import Address from "@/components/user-shop-view/address";
import accImg from "../../assets/account.jpg"
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/user-shop-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "@/hooks/use-toast";

function UserShoppingCheckout(){
    const {cartItems} = useSelector(state=>state.shopCart);
    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const {approvalURL} = useSelector(state=>state.shopOrder);
    const [currentSelectedAddress , setCurrentSelectedAddress] = useState(null);
    const [isPaymentStart, setIsPaymentStart] = useState(false);
    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce((sum, item) => {
        const price = item?.salesPrice > 0 ? item.salesPrice : item.price;
        return sum + price * (item?.quantity || 0);
        }, 0)
    : 0;
    function handleInitiatePaypalPayment(){
        if(cartItems.length === 0){
            toast({
                title : "Cart is Empty. Please Add items to Proceed",
                variant : "destructive"
            })
            return ;
        }
        if(currentSelectedAddress === null){
            toast({
                title : "Please Select an Address to Proceed.",
                variant : "destructive"
            })
            return;
        }
        const orderData ={userId :user?.id, cartId :cartItems?._id ,
            cartItems : cartItems.items.map((singleCartItem)=>({
                productId : singleCartItem?.productId,
                title : singleCartItem?.title,
                image : singleCartItem?.image,
                price : singleCartItem?.salesPrice > 0 ? singleCartItem?.salesPrice : singleCartItem?.price,
                quantity :singleCartItem?.quantity
            })) , 
            addressInfo : {
                addressId : currentSelectedAddress?._id,
                address : currentSelectedAddress?.address,
                city :currentSelectedAddress?.city,
                pincode : currentSelectedAddress?.pincode,
                notes : currentSelectedAddress?.notes,
                phone: currentSelectedAddress?.phone
            }, 
            orderStatus : 'pending' ,
            paymentMethod : 'paypal',
            paymentStatus : 'pending',
            totalAmount : totalCartAmount,
            orderDate : new Date(),
            orderUpdateDate : new Date(),
            paymentId : '',
            payerId : '',
        }
        dispatch(createNewOrder(orderData)).then((data)=>{
            if(data?.payload?.success){
                setIsPaymentStart(true);
            }
            else{
                setIsPaymentStart(false);
            }
        })
    }
    if(approvalURL){
        window.location.href = approvalURL
    }
    return (
        <div className="flex flex-col">
            <div className="relative h-[350px] w-full overflow-hidden">
                <img src={accImg} 

                className="h-full w-full object-cover object-center"
                 />

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address setCurrentSelectedAddress = {setCurrentSelectedAddress}/>
                <div className="flex flex-col gap-4">
                    {cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items.map((cartItem)=><UserCartItemsContent cartItem={cartItem}/>):null}
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">${totalCartAmount}</span>
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        <Button onClick = {handleInitiatePaypalPayment}className = "w-full">
                            Checkout With Paypal
                        </Button>
                    </div>

                </div>
   

            </div>

        </div>
    )
}
export default UserShoppingCheckout;