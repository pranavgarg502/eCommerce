import Address from "@/components/user-shop-view/address";
import accImg from "../../assets/account.jpg"
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/user-shop-view/cart-items-content";
import { Button } from "@/components/ui/button";
function UserShoppingCheckout(){
    const {cartItems} = useSelector(state=>state.shopCart);
    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce((sum, item) => {
        const price = item?.salesPrice > 0 ? item.salesPrice : item.price;
        return sum + price * (item?.quantity || 0);
        }, 0)
    : 0;
    console.log(cartItems);
    return (
        <div className="flex flex-col">
            <div className="relative h-[350px] w-full overflow-hidden">
                <img src={accImg} 

                className="h-full w-full object-cover object-center"
                 />

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address/>
                <div className="flex flex-col gap-4">
                    {cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items.map((cartItem)=><UserCartItemsContent cartItem={cartItem}/>):null}
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">₹{totalCartAmount}</span>
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        <Button className = "w-full">
                            Checkout With Paypal
                        </Button>
                    </div>

                </div>
   

            </div>

        </div>
    )
}
export default UserShoppingCheckout;