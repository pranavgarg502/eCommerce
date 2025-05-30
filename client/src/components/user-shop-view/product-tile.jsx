import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "@/config";


function ShoppingProductTile({product , handleGetProductDetails}){
    return (
            <Card className = "w-full max-w-sm mx-auto">
                <div onClick={()=>handleGetProductDetails(product?._id)}>
                    <div className="relative">
                        <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-cover rounded-t-lg" />
                    </div>
                </div>
                {
                    product?.salesPrice > 0? <Badge className= "absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        Sale
                    </Badge>: null
                }
                <CardContent className = "p-4">
                    <h2 className="text-md font-bold mb-2">
                        {product?.title}
                    </h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className='text-sm text-muted-foreground'>{categoryOptionsMap[product?.category]} </span>
                        <span className='text-sm text-muted-foreground'>{brandOptionsMap[product?.brand]} </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${
                            product?.salesPrice > 0 ? 'line-through ' : ''
                            }text-lg font-semibold text-primary`}
                        >
                            ₹{product?.price}
                        </span>

                        {product?.salesPrice > 0 ? (
                            <span className="text-lg font-bold">₹{product?.salesPrice} </span>
                        ) : null}
                    </div>

                </CardContent>
                <CardFooter className = "flex items-center justify-between">
                    <Button onClick = {()=>{

                    }}>Add to Cart</Button>
                </CardFooter>
            </Card>

    )
}
export default ShoppingProductTile;