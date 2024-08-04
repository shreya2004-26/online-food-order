"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import BusinessItem from './BusinessItem';
import { Skeleton } from '@/components/ui/skeleton';

function BusinessList() {

    const params = useSearchParams();
    const [category, setCategory] = useState('all');
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        params && setCategory(params.get('category'));
        params && getBusinessList(params.get('category'));
    }, [params]);

    const getBusinessList = (category_) => {
        setLoading(true);

        if (category_ === "all" || params.get("category") === null
        ) {
            setLoading(true)
            GlobalApi.GetAllBusiness().then(resp => {

                setBusinessList(resp?.restaurants);
                setLoading(false);
            })
        } else {
            setLoading(true)
            GlobalApi.GetBusiness(category_).then(resp => {
                // console.log("resp is ", resp?.restaurants);
                setBusinessList(resp?.restaurants);
                setLoading(false);
            })

        }

    }

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-2xl'>Popular {category} Restaurants</h2>
            <h2 className='font-bold text-primary'> {businessList?.length} Results</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 px-2 '>

                {!loading ? businessList?.map((restaurants, index) => {
                    return <BusinessItem key={index} business={restaurants} />
                }) : (
                    Array.from({ length: 8 }).map((curr, index) => {
                        return (
                            <Skeleton className="h-[180px] w-full rounded-xl bg-gray-300" key={index} />
                        )
                    })
                )}
            </div>
        </div>
    )
}


export default BusinessList