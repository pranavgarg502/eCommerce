import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ProductFilter from "@/components/user-shop-view/filter";
import ProductDetailsDialog from "@/components/user-shop-view/product-details";
import ShoppingProductTile from "@/components/user-shop-view/product-tile";
import { sortOptions } from "@/config";
import { toast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchAllFilteredProduct, fetchProductDetails } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function UserShoppingListing(){
    const dispatch = useDispatch();
    const {productList ,productDetails} = useSelector((state) => state.shopProducts)
    const {user} = useSelector(state => state.auth)
    const [filters , setFilters] = useState({});
    const [sort , setSort] = useState(null);
    const [searchParams , setSearchParams] = useSearchParams();
    const [openDetailsDiaglog , setOpenDetailsDialog] = useState(false);
    function handleAddtoCart(getCurrentProductId){
        console.log(getCurrentProductId);
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
    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId));
    }
    function createSearchParamsHelper(filterParams) {
        const queryParams = [];
        for (const [key, value] of Object.entries(filterParams)) {
            if (Array.isArray(value) && value.length > 0) {
                const paramValue = value.join(',');
                queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
            }
        }
        return queryParams.join('&');
    }

    function handleSort(value){
        setSort(value);
    }
    function handleFilter(getSectionId , getCurrentOption){
        let cpyFilters = {...filters};
        const indexofCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
        if(indexofCurrentSection === -1){
            cpyFilters = {
                ...cpyFilters,
                [getSectionId] : [getCurrentOption]
            }
        }
        else{
            const indexofCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
            if(indexofCurrentOption === -1){
                cpyFilters[getSectionId].push(getCurrentOption);
            }
            else{
                cpyFilters[getSectionId].splice(indexofCurrentOption , 1);
            }
        }
        setFilters(cpyFilters);
        sessionStorage.setItem('filters' , JSON.stringify(cpyFilters));
    }
    useEffect(()=>{
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    },[])
    useEffect(()=>{
        if(filters && Object.keys(filters).length > 0 ){
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    } , [filters])

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProduct({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);
    useEffect(()=>{
        if(productDetails !== null){
            setOpenDetailsDialog(true);
        }
    } ,[productDetails])

    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 ">
            <ProductFilter filters = {filters} handleFilter = {handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm">

                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold ">
                        All Products
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                            {productList.length} Products
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant = "outline" size="sm" className= "flex items-center gap-1">
                                    <ArrowUpDownIcon className="h-4 w-4"/>
                                    <span>Sort By</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align = "end">
                                <DropdownMenuRadioGroup value = {sort}  onValueChange={handleSort}>
                                    {
                                        sortOptions.map(sortItem=> <DropdownMenuRadioItem key = {sortItem.id} value = {sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>)
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {
                        productList && productList.length >0 ? productList.map((product) => <ShoppingProductTile key = {product._id} product={product} handleAddtoCart = {handleAddtoCart} handleGetProductDetails={handleGetProductDetails}/>) : null
                    }
                </div>
            </div>
            <ProductDetailsDialog open = {openDetailsDiaglog} setOpen={setOpenDetailsDialog} handleAddtoCart={handleAddtoCart} productDetails={productDetails}/>
        </div>

    )
}
export default UserShoppingListing;