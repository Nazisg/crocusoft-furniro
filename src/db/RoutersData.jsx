import Blog from "../pages/Blog";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import Search from "../pages/Search";
import Shop from "../pages/Shop";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import OtpConfirm from "../pages/auth/OtpConfirm";
import Profile from "../pages/auth/Profile";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";

const RoutesData = [
  { path: "/", element: <Home /> },
  { path: "/shop", element: <Shop /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/cart", element: <Cart /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/search", element: <Search /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/otp-confirm", element: <OtpConfirm /> },
  { path: "/profile", element: <Profile /> },
  { path: "*", element: <NotFound /> },
  { path: "/reset-password", element: <ResetPassword /> },
];
export default RoutesData;
