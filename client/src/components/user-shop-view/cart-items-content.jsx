import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";

function UserCartItemsContent({cartItem}){
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {cartItems} = useSelector(state=>state.shopCart);
    const { productList } = useSelector((state) => state.shopProducts);
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
            if(value ==1){
                let getCartItems = cartItems.items || [];

                if (getCartItems.length) {
                    const indexOfCurrentCartItem = getCartItems.findIndex(
                    (item) => item.productId === getCartItem?.productId
                    );
                

                    const getCurrentProductIndex = productList.findIndex(
                    (product) => product._id === getCartItem?.productId
                    );
                    const getTotalStock = productList[getCurrentProductIndex].totalStock;

                    console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

                    if (indexOfCurrentCartItem > -1) {
                        const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
                        if (getQuantity + 1 > getTotalStock) {
                            toast({
                                title: `Only ${getQuantity} quantity can be added for this item`,
                                variant: "destructive",
                            })
                            
                            return;
                        }

                    }
                }
                    
                
            }

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