import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders(){
    const [openDetailsDialog , setOpenDetailsDialog] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const {orderList} =  useSelector(state=>state.shopOrder);
    useEffect(()=>{
        dispatch(getAllOrdersByUser(user?.id))
    },dispatch)
    console.log(orderList);
    return(
        <Card>
            <CardHeader>
                <CardTitle>
                    Order History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead> Order ID </TableHead>
                            <TableHead> Order Data </TableHead>
                            <TableHead> Order Status </TableHead>
                            <TableHead> Order Price </TableHead>
                            <TableHead> 
                                <span className="sr-only">
                                    Details
                                </span> 
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ? orderList.map(orderItem=> 
                                <TableRow>
                                    <TableCell> {orderItem?._id} </TableCell>
                                    <TableCell>{orderItem?.orderDate.split('T')[0]} </TableCell>
                                    <TableCell>
                                        <Badge className={`py-1 px-3 ${orderItem?.orderStatus === 'confirmed' ? 'bg-green-400': 'bg-black'}`}>    
                                            {orderItem?.orderStatus} 
                                        </Badge>
                                        </TableCell>
                                    <TableCell>{orderItem?.totalAmount} </TableCell>
                                    <TableCell>
                                    <Dialog open = {openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                                            <ShoppingOrderDetailsView/>
                                                        </Dialog>
                                                    <Button 
                                                    onClick = {()=>setOpenDetailsDialog(true)}
                                                    className="bg-white text-gray-900 border border-gray-300 shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                                                    >
                                                    View Details
                                                    </Button>
                                    </TableCell>
            
                                </TableRow>
                            ): null
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
export default ShoppingOrders;