import homePage from "../pages/HomePage/HomePage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import CartPage from "../pages/CartPage/CartPage";
import TestPage from "../pages/TestPage/TestPage";
import AdminDashboard from "../components/AdminDashBoard/AdmindashBoard";
import AccountVerification from "../pages/AccountVerification/AccountVerification";
import ForgotPassword from "../pages/AccountVerification/ForgotPassword";
import ResetPassword from "../pages/AccountVerification/ResetPassword";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import OrderViewPage from "../pages/OrderViewPage/OrderViewPage";
import SelectOrder from "../pages/SelectOrder/SelectOrder";

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
    },
    {
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/login',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: '/register',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '/product-detail/:id',
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
        path: '/dashboard',
        page: AdminDashboard,
        isShowHeader: false,
        isProtected: true, // Đánh dấu route cần bảo vệ
        allowedRoles: ['admin'], // Chỉ admin được phép truy cập
    },
    {
        path: '/test',
        page: TestPage,
        isShowHeader: false,
    },
    {
        path: '/account/verification',
        page: AccountVerification,
        isShowHeader: false,
    },
    {
        path: '/forgot-password',
        page: ForgotPassword,
        isShowHeader: true,
    },
    {
        path: '/reset-password',
        page: ResetPassword,
        isShowHeader: false,
    },
    {
        path: '/checkout',
        page: CheckOutPage,
        isShowHeader: true,
    },
    {
        path: "/orders/order-view/:orderId",
        page: OrderViewPage,
        isShowHeader: true,
    },

    {
        path: "/order-select",
        page: SelectOrder,
        isShowHeader: true,
    },
    
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: true,
    },
];

export default routes;
