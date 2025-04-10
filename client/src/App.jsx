import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/foods" element={<FoodPage/>} />
        <Route path="/header" element={<Header />} />
        <Route path="/starter" element={<StarterSection />} />
        <Route path="/menu" element={<MenuSection />} />
        <Route path="/menudetail" element={<MenuDetail />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/gallery" element={<GallerySection />} />
        <Route path="/booking" element={<BookingSection />} />
        <Route path="/reviews" element={<ReviewSection />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
