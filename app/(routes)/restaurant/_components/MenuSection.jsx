import GlobalApi from '@/app/_utils/GlobalApi';
import { CartContext } from '@/app/context/CartContext';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import { SquarePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

function MenuSection({ restaurant }) {
    // console.log("print this ", restaurant)
    const [menuItemList, setMenuItemList] = useState([]);
    const { cartValue, setCartValue } = useContext(CartContext);
    // console.log(cartValue)
    const { user } = useUser();
    useEffect(() => {
        restaurant?.menu && FilterMenu(restaurant?.menu[0]?.category);
    }, [restaurant])

    const FilterMenu = (category) => {
        const result = restaurant?.menu?.filter((item) => item.category == category);
        setMenuItemList(result[0]);
    }

    const AddToCartHandler = (item) => {
        toast.info("Adding to Cart!")
        const data = {
            email: user?.primaryEmailAddress?.emailAddress,
            productName: item?.name,
            productDescription: item?.description,
            productImage: item?.productImage?.url,
            price: item?.price,
            restaurantSlug: restaurant?.slug
        }
        console.log(data)
        // console.log(item?.productImage?.url)
        GlobalApi.AddToCart(data).then(resp => {
            console.log(resp);
            setCartValue(!cartValue);
            toast.success("Added to Cart!")
        }, (error) => {
            toast.error("Error while Adding into the Cart!")
        }
        )
    }
    return (
        <div className='grid grid-cols-4 mt-2'>
            <div className='hidden md:flex flex-col mr-10 gap-2'>
                {restaurant?.menu?.map((item, index) => {
                    return <Button variant='ghost' key={index} className='flex justify-start' onClick={() => FilterMenu(item?.category)}>{item?.category}</Button>
                })}
            </div>
            <div className='md:col-span-3 col-span-4'>
                <h2 className='font-extrabold text-lg'>{menuItemList?.category}</h2>
                <div className='grid grid-col-1 lg:grid-cols-2 gap-5 mt-5'>
                    {menuItemList?.menuItem && menuItemList?.menuItem.map((item, index) => {
                        return (<div className='p-2 flex gap-3 border rounded-xl hover:border-primary cursor-pointer' key={index}>
                            <Image src={item?.productImage?.url} alt='image1' width={120} height={120} className='object-cover w-[120px] h-[120px] rounded-lg' />
                            <div className='flex flex-col gap-1 '>
                                <h2 className='font-bold'>{item?.name}</h2>
                                <h2>{item?.price}</h2>
                                <h2 className='text-sm text-gray-400 line-clamp-2'>{item?.description}</h2>
                                <SquarePlus onClick={() => AddToCartHandler(item)} />
                            </div>
                        </div>)
                    }
                    )}
                </div>
            </div >
        </div>
    )
}

export default MenuSection