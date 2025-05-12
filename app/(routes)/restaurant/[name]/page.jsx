"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
// import Intro from '../_components/intro';
import RestroTabs from '../_components/RestroTabs';
import RestroIntro from '../_components/RestroIntro';
import { NewReviewContext } from '@/app/context/NewReviewContext';

function RestaurantDetail() {

    const [restaurant, setRestaurant] = useState([]);
    const param = usePathname();
    console.log(param.split("/")[2]) //Array(3) [ "", "restaurant", "subway" ]
    const { newReview } = useContext(NewReviewContext);
    useEffect(() => {
        GetRestaurantDetail(param.split("/")[2]);
    }, [newReview])
    const GetRestaurantDetail = (restroSlug) => {
        GlobalApi.GetBusinessDetail(restroSlug).then(resp => {
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