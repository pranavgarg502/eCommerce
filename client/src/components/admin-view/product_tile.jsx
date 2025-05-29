import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"


function AdminProductTile({product , setFormData , setOpenCreateProductDialog ,setCurrentEditedID , handleDelete}){
    return (
            <Card className = "w-full max-w-sm mx-auto">
                <div>
                    <div className="relative">
                        <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-cover rounded-t-lg" />
                    </div>
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">
                        {product?.title}
                    </h2>
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
                        setOpenCreateProductDialog(true);
                        setFormData(product)
                        setCurrentEditedID(product?._id)
                    }}>Edit</Button>
                    <Button onClick = {()=>handleDelete(product?._id)}>Delete</Button>
                </CardFooter>
            </Card>

    )
}
export default AdminProductTile;