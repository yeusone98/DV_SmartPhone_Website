import homePage from "../pages/HomePage/HomePage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import CartPage from "../pages/CartPage/CartPage";


const routes = [
    {
        path: '/',
        page: homePage,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,

    },
    {
        path: '/oder123',
        page: OrderPage,
        isShowHeader: true,

    }
    ,
    {
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true,

    },
    {
        path: '/login',
        page: SignInPage,
        isShowHeader: true,

    },
    {
        path: '/register',
        page: SignUpPage,
        isShowHeader: true,

    },
    {
        path: '/product-detail',
        page: ProductDetailPage,
        isShowHeader: true,

    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true,

    },
    {
        path: '/search',
        page: CartPage,
        isShowHeader: true,

    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: true,
    },
    
   
]

export default routes