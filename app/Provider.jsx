"use client"
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { Toaster } from '@/components/ui/sonner'
import { CartContext } from './context/CartContext'
import GlobalApi from './_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import { NewReviewContext } from './context/NewReviewContext'

const Provider = ({ children }) => {
    const [cartValue, setCartValue] = useState(false);
    const [newReview, setNewReview] = useState(false);
    // const { user } = useUser();
    // console.log("provider", user?.primaryEmailAddress?.emailAddress)
    // useEffect(() => {
    //     const apiCount = 11;
    //     setCartValue(apiCount)
    //     // getCart();
    // }, [])
    // const getCart = async () => {
    //     GlobalApi.getCart(user?.id).then((resp) => {
    //         console.log(resp);
    //     }), (error) => {
    //         console.log(error)
    //     }
    // }
    return (
        <div className='px-10 md:px-20 relative mb-20'>
            <CartContext.Provider value={{ cartValue, setCartValue }}>
                <NewReviewContext.Provider value={{ newReview, setNewReview }}>
                    <Header />
                    <Toaster />
                    {children}
                </NewReviewContext.Provider>
            </CartContext.Provider>
        </div>
    )
}

export default Provider