"use client"
import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';

const CategoryList = () => {
    const listRef = useRef(null);
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        getCategoryList();
    }, [])


    // Used to get Category List
    const getCategoryList = () => {
        GlobalApi.GetCategory().then(resp => {
            // console.log("response is:", resp);  //never use + here!!!!
            setCategoryList(resp?.categories);
        })
    }
    // console.log(getCategoryList);

    const ScrollRightHandler = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            })
        }
    }
    return (
        <div className='mt-10 relative'>
            <div className='flex flex-row gap-4 justify-center items-center overflow-auto scrollbar-hide ' ref={listRef}>
                {categoryList && categoryList.map((category, index) =>
                (
                    <div className='flex flex-col items-center gap-2 border-[1px] p-4 rounded-xl min-w-28 hover:border-primary hover:bg-orange-100 cursor-pointer group' key={index}>
                        <Image src={category?.icon?.url} alt={category.name} width={300} height={40} className='w-[50px] group-hover:scale-125 transition-all duration-200' />
                        <h2 className='text-sm font-medium group-hover:text-primary'>{category.name}</h2>
                    </div>

                ))}
            </div>
            <ArrowRightCircle className='absolute -right-10 top-9 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer'
                onClick={() => ScrollRightHandler()} />
        </div>
    )
}

export default CategoryList