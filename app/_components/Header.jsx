"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { SearchIcon, ShoppingBag, ShoppingBasket, UserIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    const { user, isSignedIn } = useUser();

    return (
        <div className='flex flex-row justify-between items-center border-white-[1px] shadow-sm py-6 md:px-20'>
            <Image src='/logo1.png' alt='logo' width={200} height={40} className='w-[250px]'></Image>
            <div className='hidden md:flex flex-row items-center bg-gray-100 px-2 border rounded-sm w-[400px] shadow-sm'>
                <Input type="text" placeholder="Search" className=' w-full bg-transparent outline-none border-none' />
                <SearchIcon className='text-primary' />
            </div>
            {isSignedIn ?
                <UserButton />
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