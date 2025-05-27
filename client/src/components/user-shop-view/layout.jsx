import { Outlet } from "react-router-dom";
import UserShopHeader from "./header";

function UserShopLayout(){
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            <UserShopHeader/>
            <main className="flex flex-col w-full">
                <Outlet/>
            </main>

        </div>
    )
}
export default UserShopLayout;