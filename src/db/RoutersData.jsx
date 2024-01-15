import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import Login from "../pages/auth/Login";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import NotFound from "../pages/NotFound";
import Profile from "../pages/auth/Profile";
import OtpConfirm from "../pages/auth/OtpConfirm";
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
