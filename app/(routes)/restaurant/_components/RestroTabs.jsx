import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuSection from './MenuSection'
import ReviewSection from './ReviewSection'


function RestroTabs({ restaurant }) {
    console.log(restaurant)
    return (
        // <div className='flex flex-row w-full items-center gap-10'>
        <Tabs defaultValue="category" className="w-full mt-10">
            <TabsList>
                <TabsTrigger value="category">
                    Category
                </TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="category">
                <MenuSection restaurant={restaurant} />
            </TabsContent>
            <TabsContent value="about">
                <p className='my-5 text-sm text-slate-500 px-5'>{restaurant?.aboutUs}</p>
            </TabsContent>
            <TabsContent value="reviews">
                <ReviewSection restaurant={restaurant} />
            </TabsContent>
        </Tabs>
        //     <div>Menu List</div>
        // </div>
    )
}

export default RestroTabs