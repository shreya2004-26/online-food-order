import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Cart = ({ cart }) => {
    console.log("cart is ", cart)
    const CalculateCartAmount = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item?.price;
        })
        return total.toFixed(2);
    }
    return (
        <div>
            <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>
            <div className=' flex flex-col gap-3 mt-5'>
                <h2 className='text-lg font-bold'>My Order</h2>
                {cart?.map((item, index) => {
                    return item?.productImage !== "undefined" && (
                        <div key={index} className='flex justify-between gap-9 items-center'>
                            <div className='flex gap-3 items-center'>
                                <Image src={item?.productImage} alt={item?.productName}
                                    width={40} height={40} className='rounded-lg h-[40px] w-[40px] object-cover' />
                                <h2 className='text-sm'>{item?.productName}</h2>
                            </div>
                            <h2 className=' flex gap-2 text-md font-bold'>${item?.price}
                                <X className='text-primary' />
                            </h2>
                        </div>
                    )
                })}
                <Button>Checkout ${CalculateCartAmount()}</Button>
            </div>
        </div>
    )
}

export default Cart