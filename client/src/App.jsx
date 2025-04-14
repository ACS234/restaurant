import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ACCESS_TOKEN } from './constants'
import Header from './components/Header';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import StarterSection from './components/StarterSection';
import MenuSection from './components/MenuSection';
import BookingSection from './components/BookingSection';
import ReviewSection from './components/ReviewSection';
import GallerySection from './components/GallerySection';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import MenuDetail from './components/MenuDetail';
import FoodDetail from './components/Fooddetail';
import Home from './components/Home';
import FoodPage from './pages/FoodPage';
import AddToCart from './pages/CartPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


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
      <Routes>
        <Route path="" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/foods" element={
          <ProtectedRoute><FoodPage /></ProtectedRoute>
        } />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/header" element={<Header />} />
        <Route path="/starter" element={<StarterSection />} />
        <Route path="/menu" element={<ProtectedRoute><MenuSection /></ProtectedRoute>} />
        <Route path="/menu-detail/:id" element={<ProtectedRoute><MenuDetail /></ProtectedRoute>} />
        <Route path="/food/:id" element={<ProtectedRoute><FoodDetail /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><AddToCart /></ProtectedRoute>} />
        <Route path="/gallery" element={<GallerySection />} />
        <Route path="/booking" element={<ProtectedRoute><BookingSection /></ProtectedRoute>} />
        <Route path="/order" element={<ProtectedRoute><BookingSection /></ProtectedRoute>} />
        <Route path="/reviews" element={<ReviewSection />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
