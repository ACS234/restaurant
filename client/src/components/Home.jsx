import React from 'react'
import Header from './Header'
import StarterSection from './StarterSection'
import MenuDetail from './MenuDetail'
import MainSection from './MainSection'
import MenuSection from './MenuSection'
import FoodDetail from './Fooddetail'
import GallerySection from './GallerySection'
import BookingSection from './BookingSection'
import ReviewSection from './ReviewSection'

export default function Home() {
    return (
        <>
            <Header />
            <MainSection />
            <StarterSection />
            <MenuSection />
            <GallerySection />
            <BookingSection />
            <ReviewSection />
        </>
    )
}
