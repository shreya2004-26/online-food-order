import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { CartContext } from '../context/CartContext'
import Link from 'next/link'

const Cart = ({ cart }) => {
    const { cartValue, setCartValue } = useContext(CartContext);

    // console.log("cart is ", cart)
    const CalculateCartAmount = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item?.price;
        })
        return total.toFixed(2);
    }

    const RemoveItemFromCart = (id) => {
        GlobalApi.DisconnectRestroFromUserCartItem(id).then(resp => {

            if (resp) {
                GlobalApi.DeleteItemFromCart(id).then(resp => {

                    toast("Item Removed!")
                    setCartValue(!cartValue)
                })
            }
        })
    }
    return (
        <div>
            <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>
            <div className=' flex flex-col gap-3 mt-5'>
                <h2 className='text-lg font-bold'>My Order</h2>
                {
                    cart?.length === 0 ? (
                        <h1 className='text-sm px-5 font-semibold text-muted-foreground'>No product is in your cart</h1>
                    ) : cart?.map((item, index) => {
                        return item?.productImage && (
                            <>
                                <div key={index} className='flex justify-between gap-9 items-center'>
                                    <div className='flex gap-3 items-center'>
                                        {
                                            item?.productImage === "undefined" ? (
                                                <Image src={"https://image.vietnam.travel/sites/default/files/styles/top_banner/public/2017-07/best-vietnamese-dishes.jpg?itok=Mg0Op0W6"} alt={item?.productName}
                                                    width={40} height={40} className='rounded-lg h-[40px] w-[40px] object-cover' />

                                            ) : (
                                                <Image src={item?.productImage} alt={item?.productName}
                                                    width={40} height={40} className='rounded-lg h-[40px] w-[40px] object-cover' />
                                            )
                                        }
                                        <h2 className='text-sm'>{item?.productName}</h2>
                                    </div>
                                    <h2 className=' flex gap-2 text-md font-bold '>${item?.price}
                                        <Trash2 className='text-primary cursor-pointer w-4 h-4 align-middle' onClick={() => RemoveItemFromCart(item?.id)} />
                                    </h2>
                                </div>

                            </>

                        )

                    })
                }
                {cart?.length > 0 && <Link href={'/checkout?restaurant=' + cart[0]?.restaurant?.name}><Button className='w-full'>Checkout ${CalculateCartAmount()}</Button></Link>}

            </div>
        </div>
    )
}

export default Cart