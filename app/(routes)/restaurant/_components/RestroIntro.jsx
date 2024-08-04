
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function RestroIntro({ restaurant }) {

    const getReviews = () => {
        const reviews = restaurant?.review;
        var sumReviews = 0;
        const totalReviews = reviews?.length;
        for (let i = 0; i < totalReviews; i++) {
            sumReviews += reviews[i].star
        }
        return { review: totalReviews <= 1 ? "5.0" : (sumReviews / totalReviews).toFixed(1), numberReview: totalReviews };
    }
    return (
        <div>
            {restaurant?.banner?.url ? <div>
                <Image src={restaurant?.banner?.url}
                    width={1000}
                    height={300}
                    alt='banner'
                    className='w-full h-[220px] object-cover rounded-xl bg-slate-200' />
            </div> :
                <div className='h-[220px] w-full bg-slate-200 rounded-xl animate-pulse'></div>
            }
            <h2 className='text-3xl mt-2 font-bold'>{restaurant?.name}</h2>
            <div className='flex items-center gap-2 mt-2'>
                <Image src={'/star.png'} alt='star' width={20} height={20} />
                <label className='text-sm text-gray-500'>{getReviews().review} ({getReviews().numberReview})</label>
            </div>
            <h2 className='text-gray-500 mt-2 flex gap-2 items-center'>
                <MapPin />
                {restaurant?.address}
            </h2>
        </div>
    )

}

export default RestroIntro