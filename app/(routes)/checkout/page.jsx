"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { CartContext } from '@/app/context/CartContext';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

function Checkout() {
    const params = useSearchParams();
    const { user } = useUser();
    const [cart, setCart] = useState();
    const { cartValue, setCartValue } = useContext(CartContext);
    const [SubTotal, setSubTotal] = useState(0);
    const [userName, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [zip, setZip] = useState();
    const [address, setAddress] = useState();
    const [deliveryAmount, setDeliveryAmount] = useState(5);
    const [taxAmount, setTaxAmount] = useState(0);
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        user && getUserCart();
    }, [user || cartValue])

    const getUserCart = () => {
        GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(resp => {
            setCart(resp?.userCarts);
            calculateTotalAmount(resp?.userCarts);
        }
        )
    }

    const calculateTotalAmount = (cart_) => {
        let totalPrice = 0;
        cart_?.forEach((item) => {
            totalPrice = totalPrice + item?.price;
        })
        setSubTotal(totalPrice);
        setTaxAmount(totalPrice * 0.09)
        setTotal(totalPrice + totalPrice * 0.09 + deliveryAmount);
    }

    const addToOrder = () => {
        setLoading(true);
        const data = {
            email: user.primaryEmailAddress.emailAddress,
            orderAmount: total,
            restaurantName: params.get('restaurant'),
            userName: user.fullName,
            phone: phone,
            address: address,
            zip: zip

        }
        console.log(data)
        GlobalApi.CreateNewOrder(data).then((resp) => {
            // console.log(resp)
            const resultId = resp?.createOrder.id;
            if (resultId) {
                cart.forEach((item) => {
                    GlobalApi.UpdateOrderToAddOrderItems(item.productName, item.price, resultId, user?.primaryEmailAddress.emailAddress).then((result) => {
                        console.log(result);
                        setLoading(false);
                        toast("Order Created Successfully")
                    }, (error) => {
                        setLoading(false);
                    })

                })

            }
        }, (error) => {
            setLoading(false);
        })
    }
    return (
        <>
            <div className='flex flex-col gap-5'>
                <h1 className='mt-5 font-bold text-xl'>Checkout</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10 px-10 py-6'>
                    <div className='col-span-2 flex flex-col gap-5'>
                        <h1 className='font-bold text-2xl'>Billing Details</h1>
                        <div className='flex gap-4'>
                            <Input placeholder='Name' onChange={(e) => setUsername(e.target.value)} />
                            <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex gap-4'>
                            <Input placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                            <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)} />

                        </div>
                        <Input placeholder='Address' onChange={(e) => setAddress(e.target.value)} />

                    </div>
                    <div className='flex flex-col border shadow-sm gap-1'>

                        <h2 className=' text-center bg-slate-300 p-2 w-full'>Total Cart({cart?.length})</h2>
                        <div className='flex flex-col gap-3 p-5'>
                            <div className='flex justify-between'>
                                <h2 className='font-bold'>Subtotal:</h2>
                                <h2 className='font-bold'>${SubTotal.toFixed(2)}</h2>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex justify-between'>
                                    <h2>Delivery:</h2>
                                    <h2>$5</h2>
                                </div>
                                <div className='flex justify-between'>
                                    <h2>Tax(9%):</h2>
                                    <h2>${taxAmount.toFixed(2)}</h2>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='font-bold'>Total:</h2>
                                <h2 className='font-bold'>${total}</h2>
                            </div>
                            <Button onClick={() => addToOrder()}>
                                {loading ? <Loader className='animate-spin' /> : 'Make Payment'}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout