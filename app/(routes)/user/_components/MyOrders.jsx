import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

function MyOrders() {
    const [orderList, setOrderList] = useState();

    const { user } = useUser();
    useEffect(() => {
        user && getUserOrders();
    }, [user])

    const getUserOrders = () => {
        GlobalApi.GetUserOrders(user?.primaryEmailAddress?.emailAddress).then((resp) => {
            setOrderList(resp?.orders);
        })
    }
    return (
        <div className='flex flex-col gap-2'>
            <h2 className=' grid grid-cols-1 md:grid-cols-2 font-bold text-lg'>My Orders</h2>
            <div className='p-3 border rounded-lg shadow-sm'>
                {orderList?.map((order, index) => {
                    return (
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-bold'>{moment(order?.createdAt).format('DD-MMM-YYYY')}</h2>
                            <h2 className=' text-sm flex justify-between'>Order Total Amount: <span>${(order?.orderAmount).toFixed(2)}</span></h2>
                            <h2 className='text-sm flex justify-between'>Address: <span>{order?.address}</span></h2>
                            <h2 className=' text-sm flex justify-between'>Zip: <span>{order?.zip}</span></h2>

                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger> <h2 className='text-sm text-primary underline'>View Order Detail: </h2></AccordionTrigger>
                                    <AccordionContent>
                                        <div className='flex flex-col gap-3'>
                                            {order?.orderDetail?.map((item, index) => (
                                                <div className=' flex justify-between'>
                                                    <h2>{item?.name}</h2>
                                                    <h2>${item?.price}</h2>
                                                </div>
                                            ))}
                                            <hr></hr>
                                            <h2 className='flex justify-between mt-2 font-bold'>Total Order Amount(Including Taxes): <span>${(order?.orderAmount).toFixed(2)}</span></h2>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders