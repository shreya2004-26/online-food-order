import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BusinessItem({ business }) {
    // console.log("business", business)
    return (
        <Link
            href={'/restaurant/' + business?.slug}
            className='cursor-pointer group-hover:scale-115  hover:bg-orange-100 rounded-xl p-2 hover:border-primary'>
            <Image src={business?.banner?.url} alt={business?.name} width={500} height={130} className='h-[130px] rounded-xl object-cover ' />
            <div className='mt-2'>
                <h2 className='font-bold text-lg'>{business?.name}</h2>
                <div className='justify-between flex items-center'>
                    <div className='flex gap-2 items-center'>
                        <Image src='/star.png' alt='star' width={14} height={13}
                        />
                        <labe className='text-gray-400 text-sm'>4.5</labe>
                        <h2 className='text-sm'>{business?.restroType[0]}</h2>
                    </div>
                    <h2 className='text-sm text-primary'>{business?.category[0]?.name}</h2>
                </div>
            </div>
        </Link>
    )
}

export default BusinessItem