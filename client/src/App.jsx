import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from './constants'; 
import ProtectedRoute from './components/Auth/ProtectedRoute';  
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import PaymentPage from './pages/PaymentPage';
// import QRHandler from './components/QrHandler';

const Home = lazy(() => import('./components/Home'));
const FoodPage = lazy(() => import('./pages/FoodPage'));
const AddToCart = lazy(() => import('./pages/CartPage'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const OrderConfirmationPage = lazy(() => import('./pages/ConfirmOrderPage'));
const Reservations = lazy(() => import('./pages/Reservations'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const Header = lazy(() => import('./components/Header'));
const StarterSection = lazy(() => import('./components/StarterSection'));
const MenuSection = lazy(() => import('./components/MenuSection'));
const MenuDetail = lazy(() => import('./components/MenuDetail'));
const FoodDetail = lazy(() => import('./components/Fooddetail'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const BookingSection = lazy(() => import('./components/BookingSection'));
const ReviewSection = lazy(() => import('./components/ReviewSection'));


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logout logic
  const handleLogout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Handle login status change
  const loggedInUser = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} loggedInUser={loggedInUser} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/header" element={<Header />} />
          <Route path="/starter" element={<StarterSection />} />
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/reviews" element={<ReviewSection />} />

          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/foods" element={<FoodPage />} />
          <Route path="/menu" element={<MenuSection />} />
          <Route path="/menu-detail/:id" element={<MenuDetail />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/cart" element={<ProtectedRoute><AddToCart /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><BookingSection /></ProtectedRoute>} />
          <Route path="/order" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
          <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentPage/></ProtectedRoute>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/reservations" element={<ProtectedRoute><Reservations/></ProtectedRoute>} />
          {/* <Route path="/menus" element={<ProtectedRoute><QRHandler/></ProtectedRoute>} /> */}
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
