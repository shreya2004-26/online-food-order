import { Rating } from '@smastrom/react-rating'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'



function ReviewList({ reviewList }) {

    return (
        <div className='flex flex-col gap-5'>
            {reviewList?.map((review, index) => {

                return (<div key={index} className='flex gap-5 items-center border rounded-md p-5'>
                    <Image src={review?.profileImage} width={50} height={50} alt={'profileImage'} className='rounded-full' />
                    <div>
                        <h2>{review?.reviewText}</h2>
                        <Rating value={review?.star} style={{ maxWidth: 100 }} readOnly />
                        <p className='text-base font-semibold'>{review?.userName} <span className='font-normal text-[15px]'>at {moment(review?.publishedAt).format("DD MMM YYYY")}</span> </p>
                    </div>
                </div>)
            }
            )}
        </div>
    )
}

export default ReviewList