"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Intro from '../_components/intro';

function RestaurantDetail() {

    const [restaurant, setRestaurant] = useState([]);
    const param = usePathname();

    useEffect(() => {
        GetRestaurantDetail(param.split("/")[2]);
    }, [])
    const GetRestaurantDetail = (restroSlug) => {
        GlobalApi.GetBusinessDetail(restroSlug).then(resp => {
            console.log("resp is ", resp)
            setRestaurant(resp?.restaurant);
        })
    }
    return (
        <div>
            <Intro restaurant={restaurant} />
        </div>
    )
}

export default RestaurantDetail