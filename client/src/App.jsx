import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ACCESS_TOKEN } from './constants';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import OrderPage from './pages/OrderPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/ConfirmOrderPage';

// Lazy loaded components
const Header = lazy(() => import('./components/Header'));
const StarterSection = lazy(() => import('./components/StarterSection'));
const MenuSection = lazy(() => import('./components/MenuSection'));
const BookingSection = lazy(() => import('./components/BookingSection'));
const ReviewSection = lazy(() => import('./components/ReviewSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const MenuDetail = lazy(() => import('./components/MenuDetail'));
const FoodDetail = lazy(() => import('./components/Fooddetail'));
const Home = lazy(() => import('./components/Home'));
const FoodPage = lazy(() => import('./pages/FoodPage'));
const AddToCart = lazy(() => import('./pages/CartPage'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const loggedInUser = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    setIsAuthenticated(false);
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} loggedInUser={loggedInUser} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/foods" element={
            <ProtectedRoute><FoodPage /></ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/header" element={<Header />} />
          <Route path="/starter" element={<StarterSection />} />
          <Route path="/menu" element={
            <ProtectedRoute><MenuSection /></ProtectedRoute>
          } />
          <Route path="/menu-detail/:id" element={
            <ProtectedRoute><MenuDetail /></ProtectedRoute>
          } />
          <Route path="/food/:id" element={
            <ProtectedRoute><FoodDetail /></ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute><AddToCart /></ProtectedRoute>
          } />
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/booking" element={
            <ProtectedRoute><BookingSection /></ProtectedRoute>
          } />
          <Route path="/order" element={
            <ProtectedRoute>
              <OrderPage/>
            </ProtectedRoute>
          } />
          <Route path="/order-confirmation" element={
            <ProtectedRoute>
              <OrderConfirmationPage/>
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckoutPage/>
            </ProtectedRoute>
          } />
          <Route path="/reviews" element={<ReviewSection />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
