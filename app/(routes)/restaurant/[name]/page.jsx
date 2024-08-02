"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
// import Intro from '../_components/intro';
import RestroTabs from '../_components/RestroTabs';
import RestroIntro from '../_components/RestroIntro';

function RestaurantDetail() {

    const [restaurant, setRestaurant] = useState([]);
    const param = usePathname();

    useEffect(() => {
        GetRestaurantDetail(param.split("/")[2]);
    }, [])
    const GetRestaurantDetail = (restroSlug) => {
        GlobalApi.GetBusinessDetail(restroSlug).then(resp => {
            // console.log("resp is ", resp)
            setRestaurant(resp?.restaurant);
        })
    }
    return (

        <div>
            <RestroIntro restaurant={restaurant} />
            {/* <Intro restaurant={restaurant} /> */}
            <RestroTabs restaurant={restaurant} />
        </div>
    )
}

export default RestaurantDetail