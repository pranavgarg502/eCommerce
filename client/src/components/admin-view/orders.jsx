import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrderDetailsView from "./order-details";
function AdminOrdersComponent(){
    const [openDetailsDiaglog , setOpenDetailsDialog] = useState(false);
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
                        <TableRow>
                            <TableCell>123456</TableCell>
                            <TableCell>123456</TableCell>
                            <TableCell>123456</TableCell>
                            <TableCell>123456</TableCell>
                            <TableCell>
                                <Dialog open = {openDetailsDiaglog} onOpenChange={setOpenDetailsDialog}>
                                    <Button
                                    onClick = {()=>setOpenDetailsDialog(true)}
                                    className="bg-white text-gray-900 border border-gray-300 shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                                    >
                                    View Details
                                    </Button>
                                    <AdminOrderDetailsView/>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
export default AdminOrdersComponent;