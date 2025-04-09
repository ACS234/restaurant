import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Header from './components//Header';
import MainSection from './components/MainSection';
import StarterSection from './components/StarterSection'
import MenuSection from './components/MenuSection';
import BookingSection from './components/BookingSection'
import ReviewSection from './components/ReviewSection'
import GallerySection from './components/GallerySection';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import MenuDetail from './components/MenuDetail';
import FoodDetail from './components/Fooddetail';


function App() {

  return (
    <>
    <Navbar/>
     <Header/>
     <MainSection/>
     <StarterSection/>
     <FoodDetail/>
     <MenuSection/>
     <MenuDetail/>
     <GallerySection/>
     <BookingSection/>
     <ReviewSection/>
     <Footer/>
    </>
  )
}

export default App
