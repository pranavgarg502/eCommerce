import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "@/components/ui/separator"
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getAllReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({open , setOpen , productDetails}){
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const[reviewMsg , setReviewMsg] = useState("");
    const[rating,setRating] = useState(0);
    const {reviews} = useSelector(state=>state.shopReview);
    const {cartItems} = useSelector(state=>state.shopCart);
    console.log(user);
    function handleAddReview(){
        dispatch(addReview({

            reviewMessage : reviewMsg,
            reviewValue : rating,
            productId : productDetails?._id,
            userId : user?.id,
            userName : user?.userName

        })).then((data)=>{
            if(data?.payload?.success){
                setRating(0);
                setReviewMsg("");
                dispatch(getAllReviews(productDetails?._id));
                toast({
                    title : "Review Added"
                })
            }
            else{
            }
        })
    }
    function handleRatingChange(getRating){
        setRating(getRating);
    }
    function handleDialogClose(){
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg("");
    }
    function handleAddtoCart(getCurrentProductId , getTotalStock){
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                toast({
                    title: `Only ${getQuantity} quantity can be added for this item`,
                    variant: "destructive",
                });

                return;
                }
            }
        }
        dispatch(addToCart({
            userId : user?.id ,
            productId : getCurrentProductId,
            quantity : 1

        })).then((data) =>{
            if(data?.payload?.success){
                dispatch(fetchCartItems(user?.id));
                toast({
                    title : "Product Added to Cart"
                })
            }

        });
    }
    useEffect(()=>{
        if(productDetails!==null){
            dispatch(getAllReviews(productDetails?._id))
        }
    },[dispatch,productDetails])
    const avgReview = reviews && reviews.length >0 ? reviews.reduce((sum,reviewItem)=>sum + reviewItem.reviewValue,0) / reviews.length : 0;
    return (
        <Dialog open = {open} onOpenChange={handleDialogClose}>
            <DialogContent className= "grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                src={productDetails?.image}
                alt={productDetails?.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
            />
                </div>
            <div className="">
                <div>
                    <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                    <p className="text-muted-foreground text-2xl mb-5 mt-4">
                    {productDetails?.description}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p
                    className={`text-3xl font-bold text-primary ${
                        productDetails?.salesPrice > 0 ? "line-through" : ""
                    }`}
                    >
                    ${productDetails?.price}
                    </p>
                    {productDetails?.salesPrice > 0 ? (
                    <p className="text-2xl font-bold text-muted-foreground">
                        ${productDetails?.salesPrice}
                    </p>
                    ) : null}
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={avgReview.toFixed(2)}/>
                    </div>
                    <span className="text-muted-foreground">
                        ({avgReview})
                    </span>
                </div>
                <div className="mt-5 mb-5">
                   {productDetails?.totalStock === 0 ? (
                    <Button className="w-full opacity-60 cursor-not-allowed">
                        Out Of Stock
                    </Button>
                    ) : (
                    <Button
                        onClick={() => handleAddtoCart(productDetails?._id , productDetails?.totalStock)}
                        className="w-full"
                    >
                        Add to cart
                    </Button>
                    )}
                </div>
                <Separator/>
                <br />
                <div className="max-h-[300px] overflow-auto ">
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                    <div className="grid gap-6">
                        {
                            
                            reviews && reviews.length > 0 ? reviews.map(reviewItem=>
                            <div className="flex gap-4">
                            <Avatar>
                                <AvatarFallback className ="w-10 h-10 border">
                                    {reviewItem?.userName[0].toUpperCase()}
                                    
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid-gap-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">
                                        {reviewItem?.userName}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    <StarRatingComponent rating={reviewItem?.reviewValue}/>
                                    
                                    
                                </div>
                                <p className="text-muted-foreground">
                                    {reviewItem?.reviewMessage}
                                </p>
                            </div>
            
                        </div>) : <h1>
                                No Reviews
                        </h1>
                        }

                                                
            
                    
                    </div>
                    <div className="mt-10 flex flex-col gap-2">
                        <Label>Review : </Label>
                        <div className="flex">
                            <StarRatingComponent handleRatingChange = {handleRatingChange} rating={rating}/>
                        </div>
                        <Input name = "reviewMsg" value={reviewMsg} onChange = {(event)=>setReviewMsg(event.target.value)} placeholder = "Write a Review..."/>
                        <Button onClick={handleAddReview} disabled = {reviewMsg.trim() === ""}>Submit</Button>
                    </div>
                </div>

            </div>
            </DialogContent>
        </Dialog>
    )
}
export default ProductDetailsDialog;