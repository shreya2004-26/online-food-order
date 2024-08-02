"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { SearchIcon, ShoppingBag, ShoppingBasket, ShoppingCart, UserIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import GlobalApi from '../_utils/GlobalApi'

const Header = () => {
    const { user, isSignedIn } = useUser();
    const [cart, setCart] = useState();
    // console.log("user", user?.primaryEmailAddress?.emailAddress)
    const { cartValue, setCartValue } = useContext(CartContext);

    useEffect(() => {
        console.log("Execute me")
        user && getUserCart();
    }, [cartValue && user])

    const getUserCart = () => {
        GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(resp => {
            console.log(resp)
            setCart(resp?.userCarts);
            console.log(cart?.length);
        }
        )
    }
    return (
        <div className='flex flex-row justify-between items-center border-white-[1px] shadow-sm py-6 md:px-20'>
            <Image src='/logo1.png' alt='logo' width={200} height={40} className='w-[250px]'></Image>
            <div className='hidden md:flex flex-row items-center bg-gray-100 px-2 border rounded-sm w-[400px] shadow-sm'>
                <Input type="text" placeholder="Search" className=' w-full bg-transparent outline-none border-none' />
                <SearchIcon className='text-primary' />
            </div>
            {isSignedIn ?
                <div className='flex gap-5 items-center'>
                    <div className='flex gap-2 items-center'>
                        <ShoppingCart />
                        <label className='p-1 px-2 rounded-full bg-slate-200'>{cart?.length}</label>
                    </div>
                    <UserButton />
                </div>
                :
                <div className='flex flex-row gap-5'>
                    <SignInButton mode='modal'>
                        <Button variant='outline'>Login</Button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                        <Button>Sign Up</Button>
                    </SignUpButton>


                </div>
            }
        </div>
    )
}

export default Header