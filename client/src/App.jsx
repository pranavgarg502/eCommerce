import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminFeatures from "./pages/admin-view/features"
import AdminOrders from "./pages/admin-view/orders"
import AdminProducts from "./pages/admin-view/products"
import NotFound from "./pages/not-found"
import UserShopLayout from "./components/user-shop-view/layout"
import UserShoppingHome from "./pages/user-shop-view/home"
import UserShoppingAccount from "./pages/user-shop-view/account"
import UserShoppingCheckout from "./pages/user-shop-view/checkout"
import UserShoppingListing from "./pages/user-shop-view/listing"
import CheckAuth from "./components/common/check-auth"
import UnAuth from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "./components/ui/skeleton"
import PaypalReturnsPage from "./pages/user-shop-view/paypal-return"
import PaymentSuccessPage from "./pages/user-shop-view/payment-success"
import PaymentCancelPage from "./pages/user-shop-view/payment-cancel"
import SearchProducts from "./pages/user-shop-view/search"

function App() {
  const {isAuthenticated , user , isLoading} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);
  if(isLoading){
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />
  }
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path = "/auth" element = {<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout/>
        </CheckAuth>}>
          <Route path = "login" element = {<AuthLogin/>}/>
          <Route path = "register" element = {<AuthRegister/>}/>
        </Route>
        <Route path = "/admin" element = {<CheckAuth isAuthenticated={isAuthenticated} user={user} children={<AdminLayout/>}/>}>
          <Route path = "dashboard" element = {<AdminDashboard/>}/>
          <Route path = "features" element = {<AdminFeatures/>}/>
          <Route path = "orders" element = {<AdminOrders/>}/>
          <Route path = "products" element = {<AdminProducts/>}/>
        </Route>
        <Route path = "/shop" element = {<CheckAuth isAuthenticated={isAuthenticated} user={user} children={<UserShopLayout/>}/>}>
          <Route path = "home" element = {<UserShoppingHome/>}/>
          <Route path = "account" element = {<UserShoppingAccount/>}/>
          <Route path = "checkout" element = {<UserShoppingCheckout/>}/>
          <Route path = "listing" element = {<UserShoppingListing/>}/>
          <Route path = "paypal-return" element = {<PaypalReturnsPage/>}/>
          <Route path = "payment-success" element = {<PaymentSuccessPage/>}/>
          <Route path = "paypal-cancel" element = {<PaymentCancelPage/>}/>
          <Route path = "search" element = {<SearchProducts/>}/>
        </Route>
        <Route path = "/unauth-page" element = {<UnAuth/>}/>
        <Route path = '*' element = {<NotFound/>}/>
      </Routes>
      

    </div>
  )
}

export default App
