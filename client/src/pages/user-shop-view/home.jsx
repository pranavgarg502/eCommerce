import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  ShirtIcon,
  Venus,
  WatchIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProduct, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/user-shop-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { toast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/user-shop-view/product-details';
  const categoriesWithIcon = [
    { id: 'men', label: 'Men', icon: ShirtIcon },
    { id: 'women', label: 'Women', icon: Venus },
    { id: 'kids', label: 'Kids', icon: BabyIcon },
    { id: 'accessories', label: 'Accessories', icon: WatchIcon },
    { id: 'footwear', label: 'Footwear', icon: Footprints },
  ];
    const brandsWithIcon =  [
      { id: "nike", label: "Nike" , icon : ShirtIcon},
      { id: "adidas", label: "Adidas" , icon: Venus },
      { id: "puma", label: "Puma",icon: BabyIcon  },
      { id: "levi", label: "Levi's" ,icon: WatchIcon },
      { id: "zara", label: "Zara" , icon: Footprints},
      { id: "h&m", label: "H&M", icon: Footprints },
    ]
function UserShoppingHome() {
    const slides = [bannerOne, bannerTwo, bannerThree];
    const {user} = useSelector(state => state.auth)
    const [currentSlide, setCurrentSlide] = useState(0);
    const {productList,productDetails} = useSelector(state => state.shopProducts);
    const [openDetailsDiaglog , setOpenDetailsDialog] = useState(false);
    const timerRef = useRef(null); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    function handleNavigateToListingPage(getCurrentItem , section){
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }
        sessionStorage.setItem('filters' , JSON.stringify(currentFilter));

        navigate('/shop/listing');
    }
    useEffect(()=>{
        if(productDetails !== null){
            setOpenDetailsDialog(true);
        }
    } ,[productDetails])
    useEffect(()=>{
        dispatch(fetchAllFilteredProduct({
            filterParams : {},
            sortParams : 'price-lowtohigh'
        }))
    },[dispatch])

    useEffect(() => {
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timerRef.current);
    }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            alt={`Slide ${index + 1}`}
          />
        ))}

        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-8">
            SHOP BY CATEGORY
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick = {()=>handleNavigateToListingPage(categoryItem , 'Category')}
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span>{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center mb-8">
                SHOP BY BRAND
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {brandsWithIcon.map((brandItem) => (
                <Card
                     onClick = {()=>handleNavigateToListingPage(brandItem , 'Brand')}
                    key={brandItem.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                    <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span>{brandItem.label}</span>
                    </CardContent>
                </Card>
                ))}
            </div>
            </div>
        </section>
      <section className='py-12'>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-8">
            FEATURE PRODUCTS
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 : lg:grid-cols-4 gap-6'>
                {
                    productList && productList.length > 0 ? productList.map((productItem)=><ShoppingProductTile handleGetProductDetails = {handleGetProductDetails} handleAddtoCart = {handleAddtoCart} product={productItem}/>): null
                }
          </div>
        </div>
      </section>
      <ProductDetailsDialog open = {openDetailsDiaglog} setOpen={setOpenDetailsDialog} handleAddtoCart={handleAddtoCart} productDetails={productDetails}/>
    </div>
  );
}

export default UserShoppingHome;
