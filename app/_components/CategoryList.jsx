"use client"
import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const CategoryList = () => {
    const listRef = useRef(null);
    const params = useSearchParams();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        setSelectedCategory(params.get('category'));
    }, [params])



    useEffect(() => {
        getCategoryList();
    }, []) //when page will render


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
    const ScrollLeftHandler = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: -200,
                behavior: 'smooth'
            })
        }
    }
    return (
        <div className='mt-6 relative w-full'>
            <ArrowLeftCircle className='absolute -left-10 top-9 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer'
                onClick={() => ScrollLeftHandler()} />
            {/* We do not use justify-center in scrollbar area */}
            <div className='flex flex-row  gap-5  overflow-x-auto items-center scrollbar-hide' ref={listRef}>
                {console.log(categoryList)}
                {categoryList && categoryList.map((category, index) =>
                (
                    <Link href={'?category=' + category.slug} key={index} className={`flex flex-col items-center gap-2 border-[1px] p-4 rounded-xl min-w-28 hover:border-primary hover:bg-orange-100 cursor-pointer group ${selectedCategory == category.slug && 'text-primary border-primary bg-orange-50'}`} >
                        <Image src={category?.icon?.url} alt={category.name} width={300} height={40} className='w-[50px] group-hover:scale-125 transition-all duration-200' />
                        <h2 className='text-sm font-medium group-hover:text-primary'>{category.name}</h2>
                    </Link>

                ))}
            </div>
            <ArrowRightCircle className='absolute -right-10 top-9 bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer'
                onClick={() => ScrollRightHandler()} />
        </div>
    )
}

export default CategoryList