import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import Profile from '../pages/Profile'
import OtpConfirm from "../pages/OtpConfirm";

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
];
export default RoutesData;
