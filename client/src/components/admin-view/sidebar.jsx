import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
const adminSideBarMenuItems = [
    {
        id : 'dashboard',
        label : 'dashboard',
        path : '/admin/dashboard',
        icons : <LayoutDashboard/>
    },
    {
        id : 'products',
        label : 'products',
        path : '/admin/products',
        icons : <ShoppingBasket/>
    },
    {
        id : 'orders',
        label : 'orders',
        path : '/admin/orders',
        icons : <BadgeCheck/>
    }
]
function MenuItems({open ,setOpen}){
    const navigate = useNavigate();
    return <nav className="mt-8 flex-col flex gap-2">
        {
            adminSideBarMenuItems.map(menuItem => <div key = {menuItem.id} onClick = {()=>{
            navigate(menuItem.path)
            open ? setOpen(false) : null
            }

            } className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground ">
                {menuItem.icons}
                <span>
                    {menuItem.label}
                </span>
            </div>)
        }
    </nav>
}
function AdminSideBar({open ,setOpen }){
    const navigate = useNavigate();
    return (
        <Fragment>
            <Sheet open = {open} onOpenChange={setOpen}> 
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className= "border-b">
                            <SheetTitle className = "flex gap-2 mt-5 mb-5"> <ChartNoAxesCombined size={30}/>
                                <h1 className="text-2xl font-extrabold">
                                    Admin Panel
                                </h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems open = {open} setOpen={setOpen}/>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick = {()=> navigate('/admin/dashboard')}className="cursor-pointer flex items-center gap-2">
                    <ChartNoAxesCombined size={30}/>
                    <h1 className="text-2xl font-extrabold">
                        Admin Panel
                    </h1>
                </div>
                <MenuItems/>
            </aside>
        </Fragment>
    )
}
export default AdminSideBar;