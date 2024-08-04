"use client"
import { Textarea } from '@/components/ui/textarea'
import React, { useContext, useEffect, useState } from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import ReviewList from './ReviewList'
import { NewReviewContext } from '@/app/context/NewReviewContext'


function ReviewSection({ restaurant }) {
    const { user } = useUser();
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState()
    const [reviewList, setReviewList] = useState();
    const { newReview, setNewReview } = useContext(NewReviewContext);
    useEffect(() => {

        restaurant && getReviewList();
    }, [restaurant])
    useEffect(() => {

        getReviewList();
    }, [newReview])
    const handleSubmit = () => {
        const data = {
            email: user.primaryEmailAddress.emailAddress,
            profileImage: user?.imageUrl,
            userName: user?.fullName,
            star: rating,
            reviewText: reviewText,
            RestroSlug: restaurant?.slug

        };
        GlobalApi.AddNewReview(data).then((resp) => {

            toast("Review Added!")
            setNewReview(!newReview)
            setReviewText("")
            setRating(0);
        })
    }

    const getReviewList = () => {
        GlobalApi.getRestaurantReviews(restaurant?.slug).then((resp) => {

            setReviewList(resp?.reviews)
        })
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
            <div className='flex flex-col gap-2 p-5 border rounded-lg shadow-lg h-fit'>
                <h2 className='font-bold text-lg'>Add Your Review</h2>
                <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
                <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="resize-none" />
                <Button disabled={rating == 0 || !reviewText} onClick={() => handleSubmit()}>Submit</Button>
            </div>
            <div className='col-span-2'>
                <ReviewList reviewList={reviewList} />
            </div>
        </div>
    )
}

export default ReviewSection