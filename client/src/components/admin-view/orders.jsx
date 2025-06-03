import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByAllUsers, getOrderDetails, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
function AdminOrdersComponent(){
    const [openDetailsDialog , setOpenDetailsDialog] = useState(false);
    const {orderList , orderDetails}= useSelector(state=>state.adminOrder);
    const dispatch = useDispatch();
    function handleFetchOrderDetails(getId){
        dispatch(getOrderDetails(getId));
    }
    useEffect(()=>{
        dispatch(getAllOrdersByAllUsers());
    } , [dispatch])

    useEffect(()=>{
        if(orderDetails !== null){
            setOpenDetailsDialog(true);
        }
    } , [orderDetails])

    return(
        <Card>
            <CardHeader>
                <CardTitle>
                    All Orders
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
                                <Badge className={`py-1 px-3 ${orderItem?.orderStatus === 'confirmed' ? 'bg-green-400': orderItem?.orderStatus === 'rejected' ?'bg-red-600' :'bg-black'}`}>    
                                            {orderItem?.orderStatus}
                                        </Badge>
                                        </TableCell>
                                    <TableCell>{orderItem?.totalAmount} </TableCell>
                                    <TableCell>
                                    <Dialog open = {openDetailsDialog} 
                                        onOpenChange={()=>{
                                        setOpenDetailsDialog(false)
                                        dispatch(resetOrderDetails());
                                    }}
                                    >
                                                            <AdminOrderDetailsView setOpenDetailsDialog = {setOpenDetailsDialog} orderDetails = {orderDetails}/>
                                                        </Dialog>
                                                    <Button 
                                                    onClick = {()=>handleFetchOrderDetails(orderItem?._id)}
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
export default AdminOrdersComponent;