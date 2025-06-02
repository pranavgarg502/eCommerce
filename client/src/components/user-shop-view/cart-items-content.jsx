import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/shop/cart-slice";

function UserCartItemsContent({cartItem}){
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    function handleCartItemDelete(getCartItem){
        dispatch(deleteCartItem({
            productId : getCartItem.productId,
            userId : user?.id
        }));
    }
    function handleCartItemUpdate(getCartItem , value){
        const newQuantity = value == 1 ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
        if(newQuantity == 0){
            handleCartItemDelete(getCartItem);
        }
        else{
            dispatch(updateCartItem({
                productId : getCartItem.productId,
                userId : user?.id,
                quantity : value == 1 ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
            }))
        }


    }
    return (
        <div className="flex items-center space-x-4">
            <img src = {cartItem?.image} alt = {cartItem?.title} className="w-20 h-20 rounded object-cover"></img>
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button  onClick = {()=>handleCartItemUpdate(cartItem , -1)} variant = "outline" size = "icon" className = "h-8 w-8 rounded-full">
                        <Minus className="w-4 h-4"/>
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">
                        {cartItem?.quantity}
                    </span>
                    <Button onClick = {()=>handleCartItemUpdate(cartItem , 1)} variant = "outline" size = "icon" className = "h-8 w-8 rounded-full">
                        <Plus className="w-4 h-4"/>
                        <span className="sr-only">Decrease</span>
                    </Button>

                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    $
          {(
            (cartItem?.salesPrice > 0 ? cartItem?.salesPrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
                </p>
                <Trash onClick = {()=>handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20}/>
            </div>
        </div>
    )
}
export default UserCartItemsContent;